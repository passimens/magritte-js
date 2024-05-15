
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
  static _test_jsonable(src)
  {
    try
    {
      json.dumps(src);
    }
    catch (err)
    {
      throw new Error(err);
    }
    return src;
  }

  #model = undefined;
  #json = undefined;

  constructor()
  {
    this.#model = undefined;
    this.#json = undefined;
  }

  write_json(model, description)
  {
    this.#model = model;
    this.#json = this.constructor._test_jsonable(description.undefinedValue);
    this.visit(description);
    return this.#json;
  }

  write_json_string(model, description)
  {
    return JSON.stringify(this.write_json(model, description));
  }

  visit(description)
  {
    if (this.#model !== description.undefinedValue)
    {
      super.visit(description);
    }
  }

  visitElementDescription(description)
  {
    const value_jsonable = this.#model[description.name];
    this.#json = this.constructor._test_jsonable(value_jsonable);
  }

  visitDateAndTimeDescription(description)
  {
    const value = this.#model[description.name];
    const value_jsonable = (value) ? value.toISOString() : undefined;
    this.#json = this.constructor._test_jsonable(value_jsonable);
  }

  visitDateDescription(description)
  {
    const value = this.#model[description.name];
    const value_jsonable = (value) ? value.toISOString().split('T')[0] : undefined;
    this.#json = this.constructor._test_jsonable(value_jsonable);
  }

  visitTimeDescription(description)
  {
    throw new TypeError(`MATimeDescription not implemented in MAValueJsonWriter`);
  }

  visitReferenceDescription(description)
  {
    throw new TypeError(
      `MAValueJsonWriter cannot encode using reference description.
      Only scalar values are allowed.`
    );
  }

  visitContainer(description)
  {
    throw new TypeError(
      `MAValueJsonWriter cannot encode using container description.
      Only scalar values are allowed.`
    );
  }
}
