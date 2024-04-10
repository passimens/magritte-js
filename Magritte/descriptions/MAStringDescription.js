
import { MAElementDescription } from './MAElementDescription.js';


export class MAStringDescription extends MAElementDescription
{
  static isAbstract()
  {
    return false;
  }

  isSortable()
  {
    return true;
  }

  acceptMagritte(aVisitor)
  {
    aVisitor.visitStringDescription(this);
  }
}
