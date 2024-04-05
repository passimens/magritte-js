
import { MAMagnitudeDescription } from './MAMagnitudeDescription.js';


export class MATimeDescription extends MAMagnitudeDescription
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
    aVisitor.visitTimeDescription(this);
  }
}
