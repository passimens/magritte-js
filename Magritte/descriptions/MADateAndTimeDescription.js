
import { MAMagnitudeDescription } from './MAMagnitudeDescription.js';


export class MADateAndTimeDescription extends MAMagnitudeDescription
{
  static isAbstract()
  {
    return false;
  }

  static defaultKind()
  {
    return Date;
  }

  acceptMagritte(aVisitor)
  {
    aVisitor.visitDateAndTimeDescription(this);
  }
}
