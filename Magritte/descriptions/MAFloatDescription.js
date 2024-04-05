
import { MANumberDescription } from './MANumberDescription.js';


export class MAFloatDescription extends MANumberDescription
{
  static isAbstract()
  {
    return false;
  }

  static defaultKind()
  {
    return Number;
  }

  acceptMagritte(aVisitor)
  {
    aVisitor.visitFloatDescription(this);
  }
}
