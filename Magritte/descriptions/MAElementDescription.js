
import { MADescription } from './MADescription.js';
import { MAStringReaderVisitor } from '../visitors/MAStringReaderVisitor.js';
import { MAStringWriterVisitor } from '../visitors/MAStringWriterVisitor.js';


export class MAElementDescription extends MADescription
{
  #default = undefined;
  #stringReader = undefined;
  #stringWriter = undefined;

  get default() {
    if (typeof(this.#default) === 'undefined') {
      return this.constructor.defaultDefault();
    }
    return this.#default;
  }

  set default(data) {
    this.#default = data;
  }

  static defaultDefault() {
    return undefined;
  }

  get stringReader() {
    if (typeof(this.#stringReader) === 'undefined') {
      return this.constructor.defaultStringReader();
    }
    return this.#stringReader;
  }

  set stringReader(data) {
    this.#stringReader = data;
  }

  static defaultStringReader() {
    return new MAStringReaderVisitor();
  }

  get stringWriter() {
    if (typeof(this.#stringWriter) === 'undefined') {
      return this.constructor.defaultStringWriter();
    }
    return this.#stringWriter;
  }

  set stringWriter(data) {
    this.#stringWriter = data;
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
