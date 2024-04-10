
import { MANumberDescription } from './MANumberDescription.js';


export class MAFloatDescription extends MANumberDescription
{
  static isAbstract()
  {
    return false;
  }

  acceptMagritte(aVisitor)
  {
    aVisitor.visitFloatDescription(this);
  }
}
