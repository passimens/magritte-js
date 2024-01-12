class MADescription extends MAModel {
  magritteDescription() {
    return MADescription_selfdesc.magritteDescription(this)
  }
  static isAbstract() {
    return true
  }

  get type() {
    return this.constructor.name
  }

  constructor(kwargs) {
    super()
    this._accessor = this.defaultAccessor()

    for (let key in kwargs) {
      const value = kwargs[key]
      const attr = this.constructor[key]

      if (attr instanceof Property) {
        this[key] = value
      }
    }
  }

  __eq__(other) {
    return this.constructor === other.constructor && this.accessor === other.accessor
  }

  __hash__() {
    const h1 = this.constructor.hashCode()
    const h2 = this.accessor.hashCode()

    return h1 ^ h2
  }

  __lt__(other) {
    return this.priority < other.priority
  }

  __copy__() {
    const clone = new this.constructor()

    Object.assign(clone, this)
    clone.accessor = this.accessor.copy()

    return clone
  }

  get accessor() {
    return this._accessor
  }

  set accessor(anObject) {
    if (typeof anObject === 'string') {
      this._accessor = new MAAttrAccessor(anObject)
      return
    }

    this._accessor = anObject
  }

  static defaultAccessor() {
    return new MANullAccessor()
  }

  get kind() {
    try {
      return this._kind
    } catch (error) {
      return this.defaultKind()
    }
  }

  set kind(aClass) {
    this._kind = aClass
  }

  static defaultKind() {
    return Object
  }

  isKindDefined() {
    try {
      return this._kind !== undefined
    } catch (error) {
      return false
    }
  }

  get readOnly() {
    try {
      return this._readOnly
    } catch (error) {
      return this.defaultReadOnly()
    }
  }

  set readOnly(aBool) {
    this._readOnly = aBool
  }

  static defaultReadOnly() {
    return false
  }

  isReadOnly() {
    return this.readOnly
  }

  beReadOnly() {
    this.readOnly = true
  }

  beWriteable() {
    this.readOnly = false
  }

  get required() {
    try {
      return this._required
    } catch (error) {
      return this.defaultRequired()
    }
  }

  set required(aBool) {
    this._required = aBool
  }

  static defaultRequired() {
    return false
  }

  isRequired() {
    return this.required
  }

  beRequired() {
    this.required = true
  }

  beOptional() {
    this.required = false
  }

  get undefinedValue() {
    try {
      let result = this._undefinedValue
    } catch (error) {
      let result = this.defaultUndefinedValue()
    }
    return result === null ? this.defaultUndefinedValue() : result
  }

  set undefinedValue(anObject) {
    this._undefinedValue = anObject
  }

  static defaultUndefinedValue() {
    return null
  }

  get name() {
    try {
      return this._name
    } catch (error) {
      return this.accessor.name
    }
  }

  set name(aSymbol) {
    if (aSymbol === null) {
      this._name = null
      return
    }

    this._name = intern(aSymbol)
  }

  get comment() {
    try {
      return this._comment
    } catch (error) {
      return this.defaultComment()
    }
  }

  set comment(aStr) {
    this._comment = aStr
  }

  static defaultComment() {
    return null
  }

  hasComment() {
    return Boolean(this.comment)
  }

  get group() {
    try {
      return this._group
    } catch (error) {
      return this.defaultGroup()
    }
  }

  set group(aStr) {
    this._group = aStr
  }

  static defaultGroup() {
    return null
  }

  get label() {
    try {
      return this._label
    } catch (error) {
      return this.defaultLabel()
    }
  }

  set label(aStr) {
    this._label = aStr
  }

  static defaultLabel() {
    return intern('')
  }

  hasLabel() {
    return Boolean(this.label)
  }

  get priority() {
    try {
      return this._priority
    } catch (error) {
      return this.defaultPriority()
    }
  }

  set priority(aNumber) {
    this._priority = aNumber
  }

  static defaultPriority() {
    return 0
  }

  get visible() {
    try {
      return this._visible
    } catch (error) {
      return this.defaultVisible()
    }
  }

  set visible(aBool) {
    this._visible = aBool
  }

  static defaultVisible() {
    return true
  }

  isVisible() {
    return this.visible
  }

  beVisible() {
    this.visible = true
  }

  beHidden() {
    this.visible = false
  }

  get conditions() {
    try {
      return this._conditions
    } catch (error) {
      this._conditions = this.defaultConditions()
      return this._conditions
    }
  }

  set conditions(conditions) {
    if (conditions === null) {
      this._conditions = this.defaultConditions()
      return
    }

    this._conditions = []

    for (let item of conditions) {
      if (item instanceof Array) {
        this.addCondition(item[0], item[1])
        return
      }

      this.addCondition(item)
    }
  }

  static defaultConditions() {
    return []
  }

  addCondition(condition, label = null) {
    if (label === null) {
      label = getattr(condition, intern('label'), null)
    }

    this.conditions.push((condition, label))
  }

  get undefined() {
    let result = null

    try {
      result = this._undefined
    } catch (error) {
      result = this.defaultUndefined()
    }

    return result === null ? this.defaultUndefined() : result
  }

  set undefined(aStr) {
    this._undefined_set(aStr)
  }

  _undefined_set(aStr) {
    this._undefined = aStr
  }

  static defaultUndefined() {
    return intern('')
  }

  isContainer() {
    return false
  }

  isSortable() {
    return false
  }

  acceptMagritte(aVisitor) {
    aVisitor.visitDescription(this)
  }
}