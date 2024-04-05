
import { MAMagnitudeDescription } from './MAMagnitudeDescription.js';


export class MADateDescription extends MAMagnitudeDescription
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
    aVisitor.visitDateDescription(this);
  }
}
