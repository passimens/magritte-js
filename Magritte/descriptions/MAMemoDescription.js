
import { MAStringDescription } from './MAStringDescription.js';


export class MAMemoDescription extends MAStringDescription
{
  _lineCount = undefined;

  get lineCount()
  {
    if (typeof(this._lineCount) === 'undefined')
    {
      return this.constructor.defaultLineCount();
    }
    return this._lineCount;
  }

  set lineCount(val)
  {
    this._lineCount = val;
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
