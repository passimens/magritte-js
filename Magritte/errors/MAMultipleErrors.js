
import { MAValidationError } from './MAValidationError.js'


export class MAMultipleErrors extends MAValidationError
{
  constructor(aDescription, errors, message)
  {
    super(aDescription, message);
    this.collection = errors;
  }

  toString()
  {
    const strings = this.collection.map((element) => element.toString());
    return strings.join('\n');
  }
}
