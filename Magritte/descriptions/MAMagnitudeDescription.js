
import { MAElementDescription } from './MAElementDescription.js';
import { MARangeError } from '../errors/MARangeError.js';


export class MAMagnitudeDescription extends MAElementDescription
{
  isSortable() {
    return true
  }

  _min = undefined;
  _max = undefined;
  _rangeErrorMessage = undefined;

  isWithinRange(val)
  {
    return
        (typeof(this._min) === 'undefined' || this._min <= val) &&
        (typeof(this._max) === 'undefined' || this._max >= val);
  }

  get max()
  {
    if (typeof(this._max) === 'undefined')
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
    if (typeof(this._min) === 'undefined')
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
    if (typeof(this._rangeErrorMessage) !== 'undefined')
    {
      return this._rangeErrorMessage;
    }

    const minVal = this._min;
    const maxVal = this._max;

    if (typeof(minVal) !== 'undefined')
    {
      if (typeof(maxVal) !== 'undefined')
      {
        return `Input must be between ${minVal} and ${maxVal}`;
      }
      return `Input must be above or equal to ${minVal}`;
    }
    else
    {
      if (typeof(maxVal) !== 'undefined')
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
    aVisitor.visitMagnitudeDescription(this);
  }
}
