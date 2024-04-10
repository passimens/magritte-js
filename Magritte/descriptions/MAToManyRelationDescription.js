
import { MARelationDescription } from './MARelationDescription.js';


export class MAToManyRelationDescription extends MARelationDescription
{
  static isAbstract() {
    return false;
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitToManyRelationDescription(this);
  }

  validateRequired(model)
  {
    const errors = super.validateRequired(model);
    if (errors.length > 0)
    {
      return errors;
    }

    if (this.isRequired() && Array.isArray(model) && model.length == 0)
    {
      return [new MARequiredError(this, this.requiredErrorMessage)];
    }
    else
    {
      return [];
    }
  }
}
