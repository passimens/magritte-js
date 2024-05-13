
import { MAReferenceDescription } from './MAReferenceDescription.js';


export class MAOptionDescription extends MAReferenceDescription
{
  constructor(init_props)
  {
    super(init_props);
    this.initializeProperties(init_props);
  }

  _options = undefined;
  _extensible = undefined;
  _sorted = undefined;

  get options() {
    if (this._options === undefined) {
      this._options = this.constructor.defaultOptions();
    }
    return this._options;
  }

  set options(anArray) {
    this._options = anArray;
  }

  static defaultOptions() {
    return [];
  }

  get extensible() {
    if (this._extensible === undefined) {
      return this.constructor.defaultExtensible();
    }
    return this._extensible;
  }

  set extensible(aBoolean) {
    this._extensible = aBoolean;
  }

  static defaultExtensible() {
    return false;
  }

  beExtensible()
  {
    this.extensible = true;
  }

  beLimited()
  {
    this.extensible = false;
  }

  isExtensible()
  {
    return this.extensible;
  }

  get sorted() {
    if (this._sorted === undefined) {
      return this.constructor.defaultSorted();
    }
    return this._sorted;
  }

  set sorted(aBoolean) {
    this._sorted = aBoolean;
  }

  static defaultSorted() {
    return false;
  }

  beSorted()
  {
    this.sorted = true;
  }

  beUnsorted()
  {
    this.sorted = false;
  }

  isSorted()
  {
    return this.sorted;
  }

  get undefined() {
    return super.undefined;
  }

  set undefined(str) {
    super.undefined = str;
    if (this.reference !== undefined)
    {
      this.reference.undefined = aStr;
    }
  }
}