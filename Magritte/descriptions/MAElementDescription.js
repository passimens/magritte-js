
import { MADescription } from './MADescription.js';
import { MAStringReaderVisitor } from '../visitors/MAStringReaderVisitor.js';
import { MAStringWriterVisitor } from '../visitors/MAStringWriterVisitor.js';


export class MAElementDescription extends MADescription
{
  _default = undefined;
  _stringReader = undefined;
  _stringWriter = undefined;

  get default() {
    if (typeof(this._default) === 'undefined') {
      return this.constructor.defaultDefault();
    }
    return this._default;
  }

  set default(data) {
    this._default = data;
  }

  static defaultDefault() {
    return undefined;
  }

  get stringReader() {
    if (typeof(this._stringReader) === 'undefined') {
      return this.constructor.defaultStringReader();
    }
    return this._stringReader;
  }

  set stringReader(data) {
    this._stringReader = data;
  }

  static defaultStringReader() {
    return new MAStringReaderVisitor();
  }

  get stringWriter() {
    if (typeof(this._stringWriter) === 'undefined') {
      return this.constructor.defaultStringWriter();
    }
    return this._stringWriter;
  }

  set stringWriter(data) {
    this._stringWriter = data;
  }

  static defaultStringWriter() {
    return new MAStringWriterVisitor();
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitElementDescription(this);
  }

  writeString(aModel) {
    this.stringWriter.write_str(aModel, this);
  }

  readString(aModel) {
    return this.stringReader.read_str(aModel, this);
  }

}
