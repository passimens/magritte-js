
import { MAMagnitudeDescription } from './MAMagnitudeDescription.js';


export class MADateAndTimeDescription extends MAMagnitudeDescription
{
  static isAbstract()
  {
    return false;
  }

  acceptMagritte(aVisitor)
  {
    aVisitor.visitDateAndTimeDescription(this);
  }
}
