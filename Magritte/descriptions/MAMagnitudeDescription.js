
import { MAElementDescription } from './MAElementDescription.js';
import { MARangeError } from '../errors/MARangeError.js';


export class MAMagnitudeDescription extends MAElementDescription
{
  isSortable() {
    return true
  }

  #min = this.getInitialPropertyValue('min');
  #max = this.getInitialPropertyValue('max');
  #rangeErrorMessage = this.getInitialPropertyValue('rangeErrorMessage');

  isWithinRange(val)
  {
    const minVal = this.#min;
    const maxVal = this.#max;
    return
        (minVal === undefined || minVal <= val) &&
        (maxVal === undefined || maxVal >= val);
  }

  get max()
  {
    if (this.#max === undefined)
    {
      return this.constructor.defaultMax();
    }
    return this.#max;
  }

  set max(val)
  {
    this.#max = val;
  }

  static defaultMax()
  {
    return undefined;
  }

  get min()
  {
    if (this.#min === undefined)
    {
      return this.constructor.defaultMin();
    }
    return this.#min;
  }

  set min(val)
  {
    this.#min = val;
  }

  static defaultMin()
  {
    return undefined;
  }

  setMinMax(minVal, maxVal)
  {
    this.#min = minVal;
    this.#max = maxVal;
  }

  get rangeErrorMessage()
  {
    if (this.#rangeErrorMessage !== undefined)
    {
      return this.#rangeErrorMessage;
    }

    const minVal = this.#min;
    const maxVal = this.#max;

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
    this.#rangeErrorMessage = message;
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
