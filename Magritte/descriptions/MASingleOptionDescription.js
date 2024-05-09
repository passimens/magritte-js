
import { MAOptionDescription } from './MAOptionDescription.js';


export class MASingleOptionDescription extends MAOptionDescription
{
  static isAbstract() {
    return false;
  }

  acceptMagritte(aVisitor)
  {
    return aVisitor.visitSingleOptionDescription(this);
  }
}