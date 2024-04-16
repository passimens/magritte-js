
import { MAReferenceDescription } from './MAReferenceDescription.js';


export class MAOptionDescription extends MAReferenceDescription
{
  #options = undefined;
  #extensible = undefined;
  #sorted = undefined;

  get options() {
    if (typeof(this.#options) === 'undefined') {
      this.#options = this.constructor.defaultOptions();
    }
    return this.#options;
  }

  set options(anArray) {
    this.#options = anArray;
  }

  static defaultOptions() {
    return [];
  }

  get extensible() {
    if (typeof(this.#extensible) === 'undefined') {
      return this.constructor.defaultExtensible();
    }
    return this.#extensible;
  }

  set extensible(aBoolean) {
    this.#extensible = aBoolean;
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
    if (typeof(this.#sorted) === 'undefined') {
      return this.constructor.defaultSorted();
    }
    return this.#sorted;
  }

  set sorted(aBoolean) {
    this.#sorted = aBoolean;
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
    if (typeof(this.reference) !== 'undefined')
    {
      this.reference.undefined = aStr;
    }
  }
}