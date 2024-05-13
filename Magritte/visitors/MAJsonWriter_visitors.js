
import { MAVisitor } from './MAVisitor.js';


export class MAValueJsonReader extends MAVisitor
{
  #json_value = undefined;
  #decoded_value = undefined;

  read_json(json_value, description)
  {
    this.#json_value = json_value;
    this.#decoded_value = undefined;
    this.visit(description);
    return this.#decoded_value;
  }

  visit(description)
  {
    if (this.#json_value !== description.undefinedValue)
    {
      super.visit(description);
    }
  }

  visitElementDescription(description)
  {
    this.#decoded_value = this.#json_value;
  }

  visitDateAndTimeDescription(description)
  {
    if (this.#json_value === undefined)
    {
      this.#decoded_value = description.undefinedValue;
    }
    else
    {
      this.#decoded_value = new Date(this.#json_value);
    }
  }

  visitDateDescription(description)
  {
    if (this.#json_value === undefined)
    {
      this.#decoded_value = description.undefinedValue;
    }
    else
    {
      this.#decoded_value = new Date(this.#json_value);
    }
  }

  visitTimeDescription(description)
  {
    throw new TypeError(`MATimeDescription not implemented in MAValueJsonReader`);
  }

  visitReferenceDescription(description)
  {
    throw new TypeError(
      `MAValueJsonReader cannot encode using reference description.
      Only scalar values are allowed.`
    );
  }

  visitContainer(description)
  {
    throw new TypeError(
      `MAValueJsonReader cannot encode using container description.
      Only scalar values are allowed.`
    );
  }

}

export class MAValueJsonWriter extends MAVisitor
{
  // todo


}
