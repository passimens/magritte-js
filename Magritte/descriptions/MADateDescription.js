
import { MAMagnitudeDescription } from './MAMagnitudeDescription.js';


export class MADateDescription extends MAMagnitudeDescription
{
  static isAbstract()
  {
    return false;
  }

  acceptMagritte(aVisitor)
  {
    return aVisitor.visitDateDescription(this);
  }
}
