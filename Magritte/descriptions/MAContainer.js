
import { MADescription } from './MADescription.js';


export class MAContainer extends MADescription
{
  constructor(init_props)
  {
    super(init_props);
    this.#children = this.constructor.defaultCollection();
    this.initializeProperties(init_props);
  }

  static isAbstract() {
    return false;
  }

  #children = undefined;

  clone()
  {
    const result = new this.constructor();

    Object.assign(result, this);
    result.setChildren(this.children.slice());

    return result;
  }

  get children()
  {
    return this.#children;
  }

  setChildren(aCollection)
  {
    this.#children = aCollection;
  }

  isContainer()
  {
    return true;
  }

  notEmpty()
  {
    return this.children.length > 0;
  }

  isEmpty()
  {
    return this.children.length === 0;
  }

  hasChildren()
  {
    return this.notEmpty()
  }

  append(aDescription)
  {
    this.children.push(aDescription);
  }

  extend(aCollection)
  {
    this.children.push(...aCollection);
  }

  static withDescription(aDescription)
  {
    const result = new this.constructor();
    result.append(aDescription);

    return result;
  }

  static withAllDescriptions(aCollection)
  {
    const result = new this.constructor();
    result.extend(aCollection);

    return result;
  }

  static defaultCollection()
  {
    return [];
  }

  asContainer()
  {
    return this;
  }

  allSatisfy(aBlock)
  {
    return this.children.every((item) => aBlock(item));
  }

  anySatisfy(aBlock)
  {
    return this.children.some((item) => aBlock(item));
  }

  collect(aBlock)
  {
    const result = this.clone();
    const items = this.children.map((item) => aBlock(item));

    result.setChildren(items);

    return result;
  }

  select(aBlock)
  {
    const result = this.clone();
    const items = this.children.filter((item) => aBlock(item));

    result.setChildren(items);

    return result;
  }

  reject(aBlock)
  {
    const result = this.clone();
    const items = this.children.filter((item) => !aBlock(item));

    result.setChildren(items);

    return result;
  }

  copyEmpty()
  {
    const result = this.clone();

    result.setChildren(this.constructor.defaultCollection());

    return result;
  }

  copyRange(aStartIndex, anEndIndex)
  {
    const result = this.clone();
    const items = this.children.slice(aStartIndex, anEndIndex + 1);

    result.setChildren(items);

    return result;
  }

  copyWithout(anObject)
  {
    return this.reject((item) => item === anObject);
  }

  copyWithoutAll(aCollection)
  {
    return this.reject((item) => aCollection.includes(item));
  }

  detect(aBlock)
  {
    return this.children.find((item) => aBlock(item));
  }

  detectIfNone(aBlock, anExceptionBlock)
  {
    return this.children.find((item) => aBlock(item)) || anExceptionBlock();
  }

  do(aBlock)
  {
    this.children.forEach((item) => aBlock(item));
  }

  keysAndValuesDo(aBlock)
  {
    this.children.forEach((item, idx) => aBlock(idx, item));
  }

  acceptMagritte(aVisitor)
  {
    aVisitor.visitContainer(this);
  }
}
