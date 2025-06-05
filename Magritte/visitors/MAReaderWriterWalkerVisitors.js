import { MAContainer } from '../descriptions/MAContainer.js';                 
import { MAModel } from '../MAModel.js';
import { MAVisitor } from './MAVisitor.js';
import { MAValueJsonReader, MAValueJsonWriter } from './MAJson_visitors.js';
import { MAIntDescription } from '../descriptions/MAIntDescription.js';
import { MAElementDescription } from '../descriptions/MAElementDescription.js';

class CyclicReferenceError extends Error {
    constructor(ctx, message) {
        super(message);
        this.ctx = ctx;
    }
}

class DuplicateExtModelError extends Error {
    constructor(ctx, message) {
        super(message);
        this.ctx = ctx;
    }
}

const modelIds = new WeakMap();
let nextModelId = 1;

function getModelId(model) {
    if (typeof model === 'object' && model !== undefined && model !== null) {
        if (!modelIds.has(model)) {
            modelIds.set(model, nextModelId++);
        }
        return modelIds.get(model);
    }
    return `${typeof model}:${String(model)}`;
}

export class MADescriptionWalkerVisitor extends MAVisitor {
    constructor() {
        super();
        this._visitedContexts = new Map();
        this._contextStack = [];
        this._modelKey = 0;
        this._currentContext = undefined;
    }

    reset() {
        this._visitedContexts.clear();
        this._contextStack.length = 0;
        this._modelKey = 0;
        this._currentContext = undefined;
    }

    _shouldProcessDescription(description) {
        return true;
    }

    _transformContainer(source, description) {
        return source;
    }

    _transformElement(source, description) {
        return source;
    }

    walkDescription(model, description) {
        throw new Error("Not implemented");
    }

    visit(description) {
        if (this._shouldProcessDescription(description)) {
            super.visit(description);
        }
    }
}

export class ModelReaderWalkerVisitor extends MADescriptionWalkerVisitor {
    getModelKey() {
        return this._modelKey++;
    }

    _processCyclicReference(ctx) {
        throw new CyclicReferenceError(ctx, `Cyclic reference detected: ${JSON.stringify(ctx)}`);
    }

    _processDuplicateModel(ctx) {
        return ctx.ext_model;
    }

    walkDescription(model, description) {
        if (!description) throw new Error("Description cannot be null or undefined");
        if (model === description.undefinedValue) return undefined;

        let modelId = getModelId(model);
        if (this._visitedContexts.has(modelId)) {
            if (this._visitedContexts.length != 1) {  // Otherwise, it's the root model via a to-one or single-option relation
                let ctx = this._visitedContexts.get(modelId);
                return ctx.processed ? this._processDuplicateModel(ctx) : this._processCyclicReference(ctx);
            }
        }

        let context = { model, description, modelKey: this.getModelKey(), elements: [], processed: false, ext_model: undefined };
        this._visitedContexts.set(modelId, context);
        this._contextStack.push(context);
        this._currentContext = context;

        this.visit(description);

        let updatedContext = this._contextStack.pop();
        updatedContext.processed = true;
        this._currentContext = this._contextStack.length ? this._contextStack[this._contextStack.length - 1] : undefined;
        return updatedContext.extModel;
    }

    visitContainer(description) {
        this._currentContext.elements = [];
        this.visitAll(description.children);
        this._currentContext.extModel = this._transformContainer(this._currentContext.elements, description);
    }

    visitToOneRelationDescription(description) {
        let relatedObj = MAModel.readUsingWrapper(this._currentContext.model, description);
        if (relatedObj === description.undefinedValue) {
            return;
        }
        if (relatedObj !== undefined) {
            let relatedExtModel = this.walkDescription(relatedObj, description.reference);
            this._currentContext.elements.push([description, relatedExtModel]);
            this._currentContext.extModel = relatedExtModel;
        } else {
            this._currentContext.elements.push([description, undefined]);
            this._currentContext.extModel = undefined;
        }
    }

    visitToManyRelationDescription(description) {
        let relatedObjs = MAModel.readUsingWrapper(this._currentContext.model, description);
        if (relatedObjs === description.undefinedValue) {
            return;
        }
        if (relatedObjs !== undefined) {
            let relatedExtModels = relatedObjs.map(obj => this.walkDescription(obj, description.reference));
            this._currentContext.elements.push([description, relatedExtModels]);
            this._currentContext.extModel = relatedExtModels;
        }
    }

    visitSingleOptionDescription(description) {
        let reference = description.reference;
        if (reference instanceof MAContainer) {
            this.visitToOneRelationDescription(description);
        } else if (reference instanceof MAElementDescription) {
            this.visitElementDescription(description);
        } else {
            throw new TypeError(`Unsupported reference type: ${reference.constructor.name}`);
        }
    }

    visitElementDescription(description) {
        let value = MAModel.readUsingWrapper(this._currentContext.model, description);
        if (value === description.undefinedValue) {
            return
        }
        let elementExtModel = this._transformElement(value, description);
        this._currentContext.elements.push([description, elementExtModel]);
        this._currentContext.extModel = elementExtModel;
    }
}

export class MAReferencedDataHumanReadableSerializer extends ModelReaderWalkerVisitor {
    constructor() {
        super();
        this._jsonWriter = new MAValueJsonWriter();
    }

    _processCyclicReference(ctx) {
        return ctx.modelKey;
    }

    _processDuplicateModel(ctx) {
        return ctx.modelKey;
    }

    _shouldProcessDescription(description) {
        return description.isVisible();
    }

    _transformContainer(source, description) {
        let obj = {
            "-x-magritte-class": this._currentContext.model.constructor.name,
            "-x-magritte-key": this._currentContext.modelKey
        };
        source.forEach(([desc, value]) => obj[desc.name] = value);
        return obj;
    }

    _transformElement(source, description) {
        return this._jsonWriter.write_json(this._currentContext.model, description);
    }

    dumpHumanReadable(model, description) {
        this.reset();
        return this.walkDescription(model, description);
    }

    serializeHumanReadable(model, description, indent = null) {
        return JSON.stringify(this.dumpHumanReadable(model, description), null, indent);
    }
}


export class ModelWriterWalkerVisitor extends MADescriptionWalkerVisitor {
    constructor() {
        super();
        this._dtoFactory = undefined;
    }

    reset() {
        super.reset();
        this._dtoFactory = undefined;
    }

    _processDuplicateExtModel(ctxNew, ctxOld) {
        throw new Error(`Duplicate extModel detected: ${JSON.stringify(ctxNew)} has same model key as ${JSON.stringify(ctxOld)}`);
    }

    walkDescription(extModel, description) {
        if (!description) throw new Error("Description cannot be null");

        let context = { extModel, description, elements: [], processed: false, model: undefined };
        this._contextStack.push(context);
        this._currentContext = context;

        this.visit(description);

        let updatedContext = this._contextStack.pop();
        updatedContext.processed = true;
        this._currentContext = this._contextStack.length ? this._contextStack[this._contextStack.length - 1] : undefined;

        let modelKey = updatedContext.modelKey;

        if (modelKey !== undefined) {
            if (this._visitedContexts.has(modelKey)) {
                let ctxOld = this._visitedContexts.get(modelKey);
                return this._processDuplicateExtModel(updatedContext, ctxOld);
            }
            this._visitedContexts.set(modelKey, updatedContext);
        }

        return updatedContext.model;
    }

    static defaultDtoFactory(description)
    {
      return {};
    }

    _getModelByKey(modelKey) {
        if (this._visitedContexts.has(modelKey)) {
            return this._visitedContexts.get(modelKey).model;
        }
        for (let ctx of this._contextStack) {
            if (ctx.modelKey == modelKey) {
                return ctx.model;
            }
        }
        return undefined;
    }

    _getElementExtModel(description) {
        let elementExtModel = this._currentContext.elements.find(([desc, _]) => desc === description);
        if (elementExtModel) {
            return elementExtModel[1];
        }
        return description.undefinedValue;
    }

    visitContainer(description) {
        let dtoFactory = this._dtoFactory || ModelWriterWalkerVisitor.defaultDtoFactory;
        this._currentContext.model = dtoFactory(description);
        this._currentContext.elements = this._transformContainer(this._currentContext.extModel, description);
        this.visitAll(description.children);
    }

    visitToOneRelationDescription(description) {
        let relatedExtModel, relatedObj;
        if (this._currentContext.model !== undefined) {
            relatedExtModel = this._getElementExtModel(description);
        } else {
            relatedExtModel = this._currentContext.extModel;
        }
        if (relatedExtModel === description.undefinedValue) {
            relatedObj = description.undefinedValue;
        } else {
            relatedObj = this.walkDescription(relatedExtModel, description.reference);
        }
        if (this._currentContext.model !== undefined) {
            MAModel.writeUsingWrapper(this._currentContext.model, description, relatedObj);
        } else {
            this._currentContext.model = relatedObj;
        }
    }

    visitToManyRelationDescription(description) {
        let relatedExtModels, relatedObjs;
        if (this._currentContext.model !== undefined) {
            relatedExtModels = this._getElementExtModel(description);
        } else {
            relatedExtModels = this._currentContext.extModel;
        }
        if (relatedExtModels === description.undefinedValue) {
            relatedObjs = description.undefinedValue;
        } else if (relatedExtModels === undefined) {
            relatedObjs = undefined;
        } else {
            relatedObjs = relatedExtModels.map(extModel => this.walkDescription(extModel, description.reference));
        }
        if (this._currentContext.model !== undefined) {
            MAModel.writeUsingWrapper(this._currentContext.model, description, relatedObjs);
        } else {
            this._currentContext.model = relatedObjs;
        }
    }

    visitSingleOptionDescription(description) {
        let reference = description.reference;
        if (reference instanceof MAContainer) {
            this.visitToOneRelationDescription(description);
        } else if (reference instanceof MAElementDescription) {
            this.visitElementDescription(description);
        } else {
            throw new TypeError(`Unsupported reference type: ${reference.constructor.name}`);
        }
    }

    visitElementDescription(description) {
        let elementExtModel, elementValue;
        if (this._currentContext.model !== undefined) {
            elementExtModel = this._getElementExtModel(description);
            elementValue = this._transformElement(elementExtModel, description);
            MAModel.writeUsingWrapper(this._currentContext.model, description, elementValue);
        } else {
            elementValue = this._transformElement(this._currentContext.extModel, description);
            this._currentContext.model = elementValue;
        }
    }
}

export class MAReferencedDataHumanReadableDeserializer extends ModelWriterWalkerVisitor {
    constructor() {
        super();
        this._jsonReader = new MAValueJsonReader();
    }

    _transformContainer(source, description) {
        let elements = [];
        description.children.forEach(elemDesc => {
            let elemName = elemDesc.name;
            let elemValue = source[elemName] !== undefined ? source[elemName] : elemDesc.undefinedValue;
            elements.push([elemDesc, elemValue]);
        });
        return elements;
    }

    _transformElement(source, description) {
        return this._jsonReader.read_json(undefined, source, description);
    }

    visitContainer(description) {
        if (! (this._currentContext.extModel instanceof Object)) {
            this._currentContext.model = this._getModelByKey(this._currentContext.extModel);
            return;
        }
        if (! ("-x-magritte-key" in this._currentContext.extModel)) {
            throw new Error("Missing '-x-magritte-class' key in container extModel");
        }
        this._currentContext.modelKey = this._currentContext.extModel["-x-magritte-key"];
        super.visitContainer(description);
    }

    instantiateHumanReadable(dump, description, dtoFactory = null) {
        this.reset();
        this._dtoFactory = dtoFactory || ModelWriterWalkerVisitor.defaultDtoFactory;
        return this.walkDescription(dump, description);
    }

    deserializeHumanReadable(serializedStr, description, dtoFactory = null) {
        let dump = JSON.parse(serializedStr);
        return this.instantiateHumanReadable(dump, description, dtoFactory);
    }
}
