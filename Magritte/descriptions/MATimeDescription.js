
import { MAMagnitudeDescription } from './MAMagnitudeDescription.js';


export class MATimeDescription extends MAMagnitudeDescription
{
  static isAbstract()
  {
    return false;
  }

  acceptMagritte(aVisitor)
  {
    aVisitor.visitTimeDescription(this);
  }
}
