
import { MAError } from './MAError.js'


export class MAValidationError extends MAError
{
  constructor(aDescription, message)
  {
    super(message);
    this.description = aDescription;
  }

  static isResumable()
  {
    return true;
  }
}
