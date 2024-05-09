
import { MAMagnitudeDescription } from './MAMagnitudeDescription.js';


export class MANumberDescription extends MAMagnitudeDescription
{
  bePositive()
  {
    this.addCondition((val) => val > 0, 'Positive number is required');
  }

  acceptMagritte(aVisitor)
  {
    return aVisitor.visitNumberDescription(this);
  }
}
