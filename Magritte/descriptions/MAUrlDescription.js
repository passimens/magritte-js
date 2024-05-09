
import { MAElementDescription } from './MAElementDescription.js';


export class MAUrlDescription extends MAElementDescription
{
  acceptMagritte(aVisitor)
  {
    return aVisitor.visitUrlDescription(this);
  }
}
