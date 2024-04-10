
import { MAReferenceDescription } from './MAReferenceDescription.js';
import { MAPriorityContainer } from './MAPriorityContainer.js';


export class MARelationDescription extends MAReferenceDescription
{
  _classes = undefined;

  get classes() {
    if (typeof(this._classes) === 'undefined') {
      this._classes = this.constructor.defaultClasses();
    }
    return this._classes;
  }

  set classes(aCollection) {
    this._classes = aCollection;
  }

  static defaultClasses() {
    return new Set();
  }

  commonClass()
  {
    if (typeof(this._classes) === 'undefined') {
        return undefined;
    }
    let mostBaseClass = undefined;
    for (const c of this._classes)
    {
      let currentClass = c;
      while (currentClass.__proto__)
      {
        currentClass = currentClass.__proto__;
      }
      if (!mostBaseClass || currentClass === Object.prototype)
      {
        mostBaseClass = cls;
      }
    }
    return mostBaseClass;
  }

  get reference() {
    let result = super.reference;
    if (typeof(result) === 'undefined')
    {
      const commonClass = this.commonClass();
      if (typeof(commonClass) === 'undefined')
      {
        descriptionContainer = this.defaultReference();
        descriptionContainer.label = this.label;
        return descriptionContainer;
      }
      else
      {
        return commonClass.magritteTemplate.magritteDescription;
      }
    }
    else
    {
      return result;
    }
  }

  set reference(aDescription) {
    super.reference = aDescription;
  }

  static defaultReference() {
    return new MAPriorityContainer();
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitRelationDescription(this);
  }

}
