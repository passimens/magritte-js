
import { MAElementDescription } from './MAElementDescription.js';
import { MAStringDescription } from './MAStringDescription.js';


export class MAReferenceDescription extends MAElementDescription
{
  _reference = undefined;

  get reference() {
    if (typeof(this._reference) === 'undefined') {
      return this.constructor.defaultReference();
    }
    return this._reference;
  }

  set reference(aDescription) {
    this._reference = aDescription;
  }

  static defaultReference() {
    return new MAStringDescription();
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitReferenceDescription(this);
  }

}
