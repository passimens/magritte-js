
import { MAOptionDescription } from './MAOptionDescription.js';


export class MASingleOptionDescription extends MAOptionDescription
{
  static isAbstract() {
    return false;
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitSingleOptionDescription(this);
  }

  validateKind(model)
  {
    let errors = super.validateKind(model);
    if (errors.length > 0)
    {
      return errors;
    }
    errors = this.validateOptionKind(model);
    return errors;
  }
}