
import { MAMagnitudeDescription } from './MAMagnitudeDescription.js';


export class MANumberDescription extends MAMagnitudeDescription
{
  bePositive()
  {
    this.addCondition('MACondition.model > 0', 'Positive number is required');
  }
}
