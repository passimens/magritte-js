
import { MARelationDescription } from './MARelationDescription.js';


export class MAToOneRelationDescription extends MARelationDescription
{
  static isAbstract() {
    return false;
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitToOneRelationDescription(this);
  }

  validateKind(model)
  {
    const errors = super.validateKind(model);
    if (errors.length > 0)
    {
      return errors;
    }
    const classes = this.classes;
    if (typeof(classes) !== 'undefined' && !classes.some((c) => model instanceof c))
    {
      return [new MAKindError(this, this.kindErrorMessage)];
    }
    return [];
  }
}