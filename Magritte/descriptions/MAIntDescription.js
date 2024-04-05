
import { MANumberDescription } from './MANumberDescription.js';


export class MAIntDescription extends MANumberDescription
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
    aVisitor.visitIntDescription(this);
  }
}
