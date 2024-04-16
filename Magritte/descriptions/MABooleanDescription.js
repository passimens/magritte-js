
import { MAElementDescription } from './MAElementDescription.js';


export class MABooleanDescription extends MAElementDescription
{
  #trueString = undefined;
  #falseString = undefined;

  static isAbstract()
  {
    return false;
  }

  get trueString()
  {
      if (this.#trueString === undefined)
      {
          return this.constructor.defaultTrueString();
      }
      return this.#trueString
  }

  set trueString(trueString)
  {
      this.#trueString = trueString;
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
      if (this.#falseString === undefined)
      {
          return this.constructor.defaultFalseString();
      }
      return this.#falseString
  }

  set falseString(falseString)
  {
      this.#falseString = falseString;
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
