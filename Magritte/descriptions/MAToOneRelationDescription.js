
import { MARelationDescription } from './MARelationDescription.js';


export class MAToOneRelationDescription extends MARelationDescription
{
  static isAbstract() {
    return false;
  }

  acceptMagritte(aVisitor)
  {
    return aVisitor.visitToOneRelationDescription(this);
  }
}