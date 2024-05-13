
import { MAStringDescription } from './MAStringDescription.js';


export class MAMemoDescription extends MAStringDescription
{
  constructor(init_props)
  {
    super(init_props);
    this.initializeProperties(init_props);
  }

  _lineCount = undefined;

  get lineCount()
  {
    if (this._lineCount === undefined)
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
    return aVisitor.visitMemoDescription(this);
  }
}
