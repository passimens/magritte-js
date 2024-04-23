
import { MAStringDescription } from './MAStringDescription.js';


export class MAMemoDescription extends MAStringDescription
{
  #lineCount = this.getInitialPropertyValue('lineCount');

  get lineCount()
  {
    if (this.#lineCount === undefined)
    {
      return this.constructor.defaultLineCount();
    }
    return this.#lineCount;
  }

  set lineCount(val)
  {
    this.#lineCount = val;
  }

  static defaultLineCount()
  {
    return 3;
  }

  acceptMagritte(aVisitor)
  {
    aVisitor.visitMemoDescription(this);
  }
}
