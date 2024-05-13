﻿
import { MAContainer } from '../descriptions/MAContainer.js';
import { MAToOneRelationDescription } from '../descriptions/MAToOneRelationDescription.js';
import { MAVisitor } from './MAVisitor.js';
import { MAValueJsonReader } from './MAJsonWriter_visitors.js';


class MADescriptorWalkerVisitorContext
{
  parent_context = undefined;
  context_index = undefined;
  source = undefined;
  description = undefined;
  subcontexts = undefined;
  ref_count = 1;
}

class MADescriptorWalkerVisitor extends MAVisitor
{
  _context = undefined;
  _contexts = undefined;
  _contexts_by_source_index = undefined;
  _sources = undefined;
  _sources_by_source_index = undefined;
  _source_indices_by_identifier = undefined;
  _source_indices_by_context_index = undefined;
  _descriptions_attachments = undefined;

  constructor()
  {
    super();
    this._clear();
  }

  _clear()
  {
    this._context = undefined;
    this._contexts = new Array();
    this._contexts_by_source_index = new Map();
    this._sources = new Array();
    this._sources_by_source_index = new Map();
    this._source_indices_by_identifier = new Map();
    this._source_indices_by_context_index = new Map();
    this._descriptions_attachments = new Map();
  }

  #createEmptyContext()
  {
    const context_index = this._contexts.length;
    this._context = new MADescriptorWalkerVisitorContext();
    this._contexts.push(this._context);
    this._context.context_index = context_index;
    return this._context;
  }

  #addSource(source)
  {
    const source_index = this._sources.length;
    this._sources.push(source);
    this._sources_by_source_index.set(source_index, source);
    return source_index;
  }

  #addSourceOnce(source)
  {
    let was_added;
    let source_index;
    if (this._source_indices_by_identifier.has(source))
    {
      was_added = false;
      source_index = this._source_indices_by_identifier.get(source);
    }
    else
    {
      was_added = true;
      source_index = this._sources.length;
      this._sources.push(source);
      this._source_indices_by_identifier.set(source, source_index);
      this._sources_by_source_index.set(source_index, source);
    }
    return [source_index, was_added,];
  }

  #descriptionClone(description)
  {
    const clone = Object.assign(Object.create(Object.getPrototypeOf(description)), description);
    return clone;
  }

  #shouldProcessDescription(description)
  {
    return description.isVisible() && !description.isReadOnly();
  }

  #shouldSkipDescription(description)
  {
    return !this.#shouldProcessDescription(description);
  }

  #walkFromCurrent()
  {
    const description = this._context.description;
    if (this.#shouldSkipDescription(description))
    {
      return;
    }
    description.acceptMagritte(this);
  }

  visitElementDescription(description)
  {
    const context = this._context;
    const source = this.processElementDescriptionContext(context);
    const source_index = this.#addSource(source);
    this._source_indices_by_context_index.set(context.context_index, source_index);
  }

  visitContainer(description)
  {
    const context = this._context;
    const subsource = this.processContainerContext(context);
    const [subsource_index, was_added,] = this.#addSourceOnce(subsource);
    this._contexts_by_source_index.set(subsource_index, context);
    context.subcontexts = [];
    const children = description.children;
    for (const subdescription of children)
    {
      const subcontext = this.#createEmptyContext();
      subcontext.parent_context = context;
      context.subcontexts.push(subcontext);
      subcontext.source = subsource;
      subcontext.description = subdescription;
      this.#walkFromCurrent();
    }
  }

  visitToOneRelationDescription(description)
  {
    const context = this._context;
    const subsource = this.processToOneRelationContext(context);
    const [subsource_index, was_added,] = this.#addSourceOnce(subsource);
    let subcontext;
    if (was_added)
    {
      subcontext = this.#createEmptyContext();
      subcontext.parent_context = context;
      subcontext.source = subsource;
      subcontext.description = description.reference;
      this._contexts_by_source_index.set(subsource_index, subcontext);
      this.#walkFromCurrent();
    }
    else
    {
      subcontext = this._contexts_by_source_index.get(subsource_index);
      subcontext.ref_count += 1;
    }
    context.subcontexts = [subcontext];
  }

  visitToManyRelationDescription(description)
  {
    const context = this._context;
    const subsources = this.processToManyRelationContext(context);
    context.subcontexts = [];
    let subcontext;
    for (const subsource of subsources)
    {
        const [subsource_index, was_added,] = this.#addSourceOnce(subsource);
        if (was_added)
        {
          subcontext = this.#createEmptyContext();
          subcontext.parent_context = context;
          subcontext.source = subsource;
          subcontext.description = description.reference;
          this._contexts_by_source_index.set(subsource_index, subcontext);
          this.#walkFromCurrent();
        }
        else
        {
          subcontext = this._contexts_by_source_index.get(subsource_index);
          subcontext.ref_count += 1;
        }
        context.subcontexts.push(subcontext);
    }
  }

  visitSingleOptionDescription(_description)
  {
    const context = this._context;
    const description = context.description;
    const isContainer = description.reference instanceof MAContainer;

    let subcontext_description;
    if (isContainer)
    {
      subcontext_description = MAToOneRelationDescription();
      subcontext_description.reference = description.reference;
    }
    else
    {
      subcontext_description = this.#descriptionClone(description.reference);
    }
    subcontext_description.name = description.name;
    subcontext_description.accessor = description.accessor;

    context.description = subcontext_description;

    this.#walkFromCurrent();
  }

  processContainerContext(context)
  {
    return undefined;
  }

  processElementDescriptionContext(context)
  {
    return undefined;
  }

  processToOneRelationContext(context)
  {
    return undefined;
  }

  processToManyRelationContext(context)
  {
    return [];
  }

  walkDescription(aSource, aDescription)
  {
    this._clear();
    this.#createEmptyContext();
    this._context.source = aSource;
    this._context.description = this.#descriptionClone(aDescription);
    this._descriptions_attachments.set(this._context.description, { accessor: 'MAIdentityAccessor' });
    this.#walkFromCurrent();
  }

  rewalkDescription()
  {
    if (this._contexts.length > 0)
    {
      this._context = this._contexts[0];
    }
    else
    {
      this._context = undefined;
    }
    this.#walkFromCurrent();
  }

  writeUsingWrapper(model, description, value)
  {
    model[description.name] = value;
  }

  readUsingWrapper(model, description)
  {
    if (this._descriptions_attachments.has(description))
    {
      const attachment = this._descriptions_attachments.get(model);
      if (Object.hasOwn('attachment') && accessor['attachment'] == 'MAIdentityAccessor')
      {
        return model;
      }
    }
    const value = model[description.name];
    if (value === undefined)
    {
      return description.undefinedValue;
    }
    return value;
  }
}


class MAHumanReadableInstantiateModelWalkerVisitor extends MADescriptorWalkerVisitor
{
  #json_reader = undefined;
  #dto_factory = undefined;
  _fulfilled_all_references = undefined;
  _dtos_by_key = undefined;
  _values_by_dump_id = undefined;
  _dumps_by_key = undefined;

  constructor()
  {
    super();
    this.#json_reader = new MAValueJsonReader();
    this.#dto_factory = undefined;
    this._fulfilled_all_references = false;
  }

  _clear()
  {
    super._clear();
    this._dtos_by_key = new Map();
    this._values_by_dump_id = new Map();
    this._dumps_by_key = new Map();
    this._fulfilled_all_references = true;
  }

  #getOrCreateDTO(dump, dto_description)
  {
    const key = dump['_key'];
    if (!this._dtos_by_key.has(key))
    {
      const dto = this.#dto_factory(dto_description);
      dto['_key'] = key;
      this._dtos_by_key.set(key, dto);
      this._dumps_by_key.set(key, dump);
      this.#addValueForDump(dump, dto);
    }
    return this._dtos_by_key.get(key);
  }

  #getOrCreateModel(dump, model_description)
  {
    if (dump instanceof Object && Object.hasOwn(dump, '_key'))
    {
      return this.#getOrCreateDTO(dump, model_description);
    }
    return this.#json_reader.read_json(dump, model_description);
  }

  #getParentModel(context)
  {
    if (context.parent_context === undefined)
    {
      return undefined;
    }
    else
    {
      return this.#getOrCreateDTO(context.parent_context.source, context.parent_context.description);
    }
  }

  #getDTOdumpByKey(dump)
  {
      if (Number.isInteger(dump))
      {
        if (this._dumps_by_key.has(dump))
        {
          return [true, this._dumps_by_key.get(dump),];
        }
        else
        {
          return [false, undefined,];
        }
      }
      return [true, dump,];
  }

  #addValueForDump(dump, value)
  {
    this._values_by_dump_id.set(dump, value);
  }

  #findMatchingSubcontextDump(context)
  {
    const description = context.description;
    const name = description.name;
    const dump = context.source;
    if (dump instanceof Object && Object.hasOwn(dump, name))
    {
      return [true, dump[name],];
    }
    return [false, undefined,];
  }

  processElementDescriptionContext(context)
  {
    const model = this.#getParentModel(context);
    const description = context.description;
    if (model === undefined)  // The MAElementDescription serialized data is the root model without enclosing DTO - special handling
    {
      const dump = context.source;
      const value = this.#getOrCreateModel(dump, description);
      this.#addValueForDump(dump, value);
    }
    else
    {
      const [found, subcontext_dump,] = this.#findMatchingSubcontextDump(context);
      let value;
      if (found)
      {
        value = this.#json_reader.read_json(subcontext_dump, description);
      }
      else
      {
        value = description.undefinedValue;
      }
      this.writeUsingWrapper(model, description, value);
    }
    return undefined;
  }

  processContainerContext(context)
  {
    const subcontext_dump = context.source;
    return subcontext_dump;
  }

  processToOneRelationContext(context)
  {
    const model = this.#getParentModel(context);
    const description = context.description;
    const [found, subcontext_dump_or_key,] = this.#findMatchingSubcontextDump(context);
    let submodel;
    let subcontext_dump;
    if (found)
    {
      let inner_found;
      [inner_found, subcontext_dump,] = this.#getDTOdumpByKey(subcontext_dump_or_key);
      if (!inner_found)
      {
        this._fulfilled_all_references = false;
        return undefined;
      }
      submodel = this.#getOrCreateDTO(subcontext_dump, description.reference);
    }
    else
    {
      subcontext_dump = undefined;
      submodel = description.undefinedValue;
    }
    this.#addValueForDump(subcontext_dump, submodel);
    this.writeUsingWrapper(model, description, submodel);
    return subcontext_dump;
  }

  processToManyRelationContext(context)
  {
    const model = this.#getParentModel(context);
    const description = context.description;
    let relations_list;
    let found;
    let subcontext_dump;
    let subcontext_dumps;
    if (model === undefined)  // The MAToManyRelationDescription serialized data is the root model without enclosing DTO - special handling
    {
      const dump = context.source;
      relations_list = [];
      this.#addValueForDump(dump, relations_list);
      found = true;
      subcontext_dump = dump;
    }
    else
    {
      relations_list = this.readUsingWrapper(model, description);
      [found, subcontext_dump,] = this.#findMatchingSubcontextDump(context);
      // special handling for JS model: there will be no default empty array
      if (relations_list === undefined)
      {
        relations_list = [];
        this.writeUsingWrapper(model, description, relations_list);
      }
    }
    if (found)
    {
      subcontext_dumps = [];
      relations_list.length = 0;
      for (const relation_dump_or_key of subcontext_dump)
      {
        const [inner_found, relation_dump] = this.#getDTOdumpByKey(relation_dump_or_key);
        if (!inner_found)
        {
          this._fulfilled_all_references = false;
          continue;
        }
        const submodel = this.#getOrCreateDTO(relation_dump, description.reference);
        subcontext_dumps.push(relation_dump);
        this.#addValueForDump(relation_dump, submodel);
        relations_list.push(submodel);
      }
    }
    else
    {
      subcontext_dumps = [];
      relations_list.length = 0;
      if (description.undefinedValue !== undefined)
      {
        relations_list.push(...description.undefinedValue);
      }
    }
    return subcontext_dumps;
  }

  processSingleOptionContext(context, isContainer)
  {
    const [found, subcontext_dump,] = this.#findMatchingSubcontextDump(context);
    if (found && isContainer)
    {
      const submodel = this.#getOrCreateDTO(subcontext_dump, context.description.reference);
      this.#addValueForDump(subcontext_dump, submodel);
      const model = this.#getParentModel(context);
      if (model !== undefined)
      {
        this.writeUsingWrapper(model, context.description, submodel);
      }
    }
    return subcontext_dump;
  }

  instantiateModelHumanReadable(dump, description, dto_factory)
  {
    if (dump == undefined)
    {
      return undefined;
    }
    this.#dto_factory = dto_factory;

    this.walkDescription(dump, description);
    if (!this._fulfilled_all_references)
    {
      this.rewalkDescription();
    }

    if (this._values_by_dump_id.has(dump))
    {
      return this._values_by_dump_id.get(dump);
    }
    return undefined;
  }
}

export class MAReferencedDataHumanReadableDeserializer
{
  static default_dto_factory(description)
  {
    return { _name: description.name };
  }

  instantiateHumanReadable(dump, description, dto_factory=undefined)
  {
    if (dto_factory === undefined)
    {
      dto_factory = this.constructor.default_dto_factory;
    }
    const descriptorWalker = new MAHumanReadableInstantiateModelWalkerVisitor();
    const model = descriptorWalker.instantiateModelHumanReadable(dump, description, dto_factory);
    return model;
  }

  deserializeHumanReadable(serialized_str, description, dto_factory=undefined)
  {
    const dump = JSON.parse(serialized_str);
    return this.instantiateHumanReadable(dump, description, dto_factory);
  }
}
