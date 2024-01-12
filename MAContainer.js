class MAContainer extends MADescription {
  magritteDescription() {
    const MAContainer_selfdesc = require('Magritte.descriptions.MAContainer_selfdesc')
    return MAContainer_selfdesc.magritteDescription(this, super.magritteDescription())
  }

  static isAbstract() {
    return false
  }

  constructor(kwargs) {
    this._children = this.defaultCollection()
    super(kwargs)
  }

  __eq__(other) {
    return super.__eq__(other) && this._children == other.children
  }

  __iadd__(anItem) {
    this.append(anItem)
    return this
  }

  __contains__(item) {
    return this._children.includes(item)
  }

  __len__() {
    return this._children.length
  }

  __getitem__(item) {
    return this._children[item]
  }

  __copy__() {
    const clone = new this.constructor()

    Object.assign(clone, this)
    clone.setChildren(this.children.slice())

    return clone
  }

  static defaultAccessor() {
    return new MAIdentityAccessor()
  }

  get children() {
    return this._children
  }

  setChildren(aCollection) {
    this._children = aCollection
  }

  isContainer() {
    return true
  }

  notEmpty() {
    return this.children.length > 0
  }

  isEmpty() {
    return this.children.length === 0
  }

  hasChildren() {
    return this.notEmpty()
  }

  append(aDescription) {
    this.children.push(aDescription)
  }

  extend(aCollection) {
    this.children.push(...aCollection)
  }

  static withDescription(aDescription) {
    const result = new this()
    result.append(aDescription)

    return result
  }

  static withAllDescriptions(aCollection) {
    const result = new this()
    result.extend(aCollection)

    return result
  }

  static defaultCollection() {
    return []
  }

  asContainer() {
    return this
  }

  allSatisty(aBlock) {
    return this.children.every((item) => aBlock(item))
  }

  anySatisty(aBlock) {
    return this.children.some((item) => aBlock(item))
  }

  collect(aBlock) {
    const result = this.__copy__()
    const items = this.children.map((item) => aBlock(item))

    result.setChildren(items)

    return result
  }

  select(aBlock) {
    const result = this.__copy__()
    const items = this.children.filter((item) => aBlock(item))

    result.setChildren(items)

    return result
  }
  reject(aBlock) {
    const result = this.__copy__()
    const items = this.children.filter((item) => !aBlock(item))

    result.setChildren(items)

    return result
  }
  copyEmpty() {
    const result = this.__copy__()

    result.setChildren(this.defaultCollection())

    return result
  }
  copyRange(aStartIndex, anEndIndex) {
    const result = this.__copy__()
    const items = this.children.slice(aStartIndex, anEndIndex + 1)

    result.setChildren(items)

    return result
  }
  copyWithout(anObject) {
    return this.reject((item) => item === anObject)
  }
  copyWithoutAll(aCollection) {
    return this.reject((item) => aCollection.includes(item))
  }
  detect(aBlock) {
    return this.children.find((item) => aBlock(item))
  }
  detectIfNone(aBlock, anExceptionBlock) {
    return this.children.find((item) => aBlock(item)) || anExceptionBlock()
  }
  do(aBlock) {
    this.children.forEach((item) => aBlock(item))
  }
  keysAndValuesDo(aBlock) {
    this.children.forEach((item, idx) => aBlock(idx, item))
  }
  acceptMagritte(aVisitor) {
    aVisitor.visitContainer(this)
  }
}