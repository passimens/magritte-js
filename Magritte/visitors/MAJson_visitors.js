
import { MAVisitor } from './MAVisitor.js';
import { MAModel } from '../MAModel.js';
import { MAIntDescription } from '../descriptions/MAIntDescription.js';

export class MAValueJsonWriter extends MAVisitor {
  constructor() {
      super();
      this._model = undefined;
      this._json = undefined;
  }

  static _test_jsonable(src) {
      try {
          JSON.stringify(src);
      } catch (e) {
          throw new Error(e);
      }
      return src;
  }

  write_json(model, description) {
      this._model = model;
      this._json = MAValueJsonWriter._test_jsonable(description.undefinedValue);
      this.visit(description);
      return this._json;
  }
  
  write_json_string(model, description)
  {
    return JSON.stringify(this.write_json(model, description));
  }

  visit(description) {
      if (this._model !== description.undefinedValue) {
        super.visit(description)
      }
  }

  visitElementDescription(description) {
      const value = MAModel.readUsingWrapper(this._model, description);
      this._json = MAValueJsonWriter._test_jsonable(value);
  }

  visitDateAndTimeDescription(description) {
      const value = MAModel.readUsingWrapper(this._model, description);
      this._json = value ? (value).toISOString() : undefined;
  }

  visitDateDescription(description) {
      const value = MAModel.readUsingWrapper(this._model, description);
      this._json = value ? (value).toISOString().split('T')[0] : undefined;
  }

  visitTimeDescription(description) {
      const value = MAModel.readUsingWrapper(this._model, description);
      this._json = value ? (value).toISOString().split('T')[1].split('.')[0] : undefined;
  }

  visitSingleOptionDescription(description) {
      if (description.reference instanceof MAContainer) {
          this.visitToOneRelationDescription(description);
      } else {
          this.visitElementDescription(description);
      }
  }

  visitReferenceDescription(description) {
      throw new Error("MAValueJsonWriter cannot encode using reference description. Only scalar values are allowed.");
  }

  visitContainer(description) {
      throw new Error("MAValueJsonWriter cannot encode using container description. Only scalar values are allowed.");
  }
}

export class MAValueJsonReader extends MAVisitor {
  constructor() {
      super();
      this._model = undefined;
      this._json_value = undefined;
      this._decoded_value = undefined;
  }

  read_json(model, json_value, description) {
      this._model = model;
      this._json_value = json_value;
      this._decoded_value = description.undefinedValue;
      this.visit(description);
      return this._decoded_value;
  }

  _write_to_model(description) {
    if (this._model !== undefined && this._decoded_value !== description.undefinedValue) {
      MAModel.writeUsingWrapper(this._model, description, this._decoded_value);
    }
  }

  visit(description) {
    if (this._json_value === undefined) {
      this._decoded_value = description.undefinedValue;
    } else {
      super.visit(description);
    }
  }

  visitElementDescription(description) {
      this._decoded_value = this._json_value;
      this._write_to_model(description)
  }

  visitDateAndTimeDescription(description) {
      this._decoded_value = this._json_value ? new Date(this._json_value) : description.undefinedValue;
      this._write_to_model(description)
  }

  visitDateDescription(description) {
      this.visitDateAndTimeDescription(description);
  }

  visitTimeDescription(description) {
      this.visitDateAndTimeDescription(description)
  }

  visitSingleOptionDescription(description) {
      if (description.reference instanceof MAContainer) {
          this.visitToOneRelationDescription(description);
      } else {
          this.visitElementDescription(description);
      }
  }

  visitReferenceDescription(description) {
      throw new Error("MAValueJsonReader cannot decode using reference description. Only scalar values are allowed.");
  }

  visitContainer(description) {
      throw new Error("MAValueJsonReader cannot decode using container description. Only scalar values are allowed.");
  }
}
