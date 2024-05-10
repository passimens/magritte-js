
import { MANumberDescription } from './MANumberDescription.js';


export class MAIntDescription extends MANumberDescription
{
  static isAbstract()
  {
    return false;
  }

  acceptMagritte(aVisitor)
  {
    return aVisitor.visitIntDescription(this);
  }
}
