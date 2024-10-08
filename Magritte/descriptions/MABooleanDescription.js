
import { MAElementDescription } from './MAElementDescription.js';


export class MABooleanDescription extends MAElementDescription
{
  constructor(init_props)
  {
    super(init_props);
    this.initializeProperties(init_props);
  }

  static isAbstract()
  {
    return false;
  }

  _trueString = undefined;
  _falseString = undefined;

  get trueString()
  {
      if (this._trueString === undefined)
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
       return this.defaultTrueStrings()[0];
  }

  static defaultTrueStrings()
  {
       return ['true', 't', 'yes', 'y', '1', 'on'];
  }

  get falseString()
  {
      if (this._falseString === undefined)
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
       return this.defaultFalseStrings()[0];
  }

  static defaultFalseStrings()
  {
       return ['false', 'f', 'no', 'n', '0', 'off'];
  }

  acceptMagritte(aVisitor)
  {
    return aVisitor.visitBooleanDescription(this);
  }
}
