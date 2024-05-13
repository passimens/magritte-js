
import { MAElementDescription } from './MAElementDescription.js';
import { MARangeError } from '../errors/MARangeError.js';


export class MAMagnitudeDescription extends MAElementDescription
{
  constructor(init_props)
  {
    super(init_props);
    this.initializeProperties(init_props);
  }

  isSortable() {
    return true
  }

  _min = undefined;
  _max = undefined;
  _rangeErrorMessage = undefined;

  isWithinRange(val)
  {
    const minVal = this._min;
    const maxVal = this._max;
    return
        (minVal === undefined || minVal <= val) &&
        (maxVal === undefined || maxVal >= val);
  }

  get max()
  {
    if (this._max === undefined)
    {
      return this.constructor.defaultMax();
    }
    return this._max;
  }

  set max(val)
  {
    this._max = val;
  }

  static defaultMax()
  {
    return undefined;
  }

  get min()
  {
    if (this._min === undefined)
    {
      return this.constructor.defaultMin();
    }
    return this._min;
  }

  set min(val)
  {
    this._min = val;
  }

  static defaultMin()
  {
    return undefined;
  }

  setMinMax(minVal, maxVal)
  {
    this._min = minVal;
    this._max = maxVal;
  }

  get rangeErrorMessage()
  {
    if (this._rangeErrorMessage !== undefined)
    {
      return this._rangeErrorMessage;
    }

    const minVal = this._min;
    const maxVal = this._max;

    if (minVal !== undefined)
    {
      if (maxVal !== undefined)
      {
        return `Input must be between ${minVal} and ${maxVal}`;
      }
      return `Input must be above or equal to ${minVal}`;
    }
    else
    {
      if (maxVal !== undefined)
      {
        return `Input must be below or equal to ${maxVal}`;
      }
      return undefined;
    }
  }

  set rangeErrorMessage(message)
  {
    this._rangeErrorMessage = message;
  }

  validateSpecific(model)
  {
    if (this.isWithinRange(model))
    {
      return super.validateSpecific(model);
    }
    else
    {
      return [...super.validateSpecific(model), new MARangeError(this, this.rangeErrorMessage)];
    }
  }

  acceptMagritte(aVisitor)
  {
    return aVisitor.visitMagnitudeDescription(this);
  }
}
