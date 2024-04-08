
import { MAElementDescription } from './MAElementDescription.js';
import { MAStringDescription } from './MAStringDescription.js';


export class MAReferenceDescription extends MAElementDescription
{
  #reference = undefined;

  get reference() {
    if (typeof(this.#reference) === 'undefined') {
      return this.constructor.defaultReference();
    }
    return this.#reference;
  }

  set reference(aDescription) {
    this.#reference = aDescription;
  }

  static defaultReference() {
    return new MAStringDescription();
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitReferenceDescription(this);
  }

}
