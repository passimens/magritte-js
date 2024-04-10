
import { MAElementDescription } from './MAElementDescription.js';


export class MABooleanDescription extends MAElementDescription
{
  _trueString = undefined;
  _falseString = undefined;

  static isAbstract()
  {
    return false;
  }

  get trueString()
  {
      if (typeof(this._trueString) === 'undefined')
      {
          return this.constructor.defaultTrueString();
      }
      return this._trueString
  }

  set trueString(trueString)
  {
      this._trueString = trueString;
  }

  static defaultTrueString()
  {
       return defaultTrueStrings()[0];
  }

  static defaultTrueStrings()
  {
       return ['true', 't', 'yes', 'y', '1', 'on'];
  }

  get falseString()
  {
      if (typeof(this._falseString) === 'undefined')
      {
          return this.constructor.defaultFalseString();
      }
      return this._falseString
  }

  set falseString(falseString)
  {
      this._falseString = falseString;
  }

  static defaultFalseString()
  {
       return defaultFalseStrings()[0];
  }

  static defaultFalseStrings()
  {
       return ['false', 'f', 'no', 'n', '0', 'off'];
  }

  acceptMagritte(aVisitor)
  {
    aVisitor.visitBooleanDescription(this);
  }
}
