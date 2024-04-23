
import { MAElementDescription } from './MAElementDescription.js';


export class MAUrlDescription extends MAElementDescription
{
  acceptMagritte(aVisitor)
  {
    aVisitor.visitUrlDescription(this);
  }
}
