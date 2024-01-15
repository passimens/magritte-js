class MADescription {
  static isAbstract() {
    return true
  }

  get type() {
    return this.constructor.name
  }

  constructor(args = {}) {
    for (const [key, value] of Object.entries(args)) {
      this[key] = value
    }
  }

  get kind() {
    if (this._kind === undefined) {
      return this.constructor.defaultKind()
    }

    return this._kind
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
    if (this._readOnly === undefined) {
      return this.constructor.defaultReadOnly()
    }

    return this._readOnly
  }

  set readOnly(val) {
    this._readOnly = val
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
    if (this._required === undefined) {
      return this.constructor.defaultRequired()
    }
    return this._required
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
    let result = null
    if (this._undefinedValue === undefined) {
      result = this.constructor.defaultUndefinedValue()
    } else {
      result = this._undefinedValue
    }

    return result === null ? this.constructor.defaultUndefinedValue() : result
  }

  set undefinedValue(anObject) {
    this._undefinedValue = anObject
  }

  static defaultUndefinedValue() {
    return null
  }

  get name() {
    if (this._name === undefined) {
      return this.constructor.defaultName()
    }

    return this._name
  }

  set name(val) {
    this._name = val
  }

  static defaultName() {
    return null
  }

  get comment() {
    if (this._comment === undefined) {
      return this.constructor.defaultComment()
    }

    return this._comment
  }

  set comment(str) {
    this._comment = str
  }

  static defaultComment() {
    return null
  }

  hasComment() {
    return Boolean(this.comment)
  }

  get group() {
    if (this._group === undefined) {
      return this.constructor.defaultGroup()
    }

    return this._group
  }

  set group(str) {
    this._group = str
  }

  static defaultGroup() {
    return null
  }

  get label() {
    if (this._label === undefined) {
      return this.constructor.defaultLabel()
    }

    return this._label
  }

  set label(str) {
    this._label = str
  }

  static defaultLabel() {
    return ''
  }

  hasLabel() {
    return Boolean(this.label)
  }

  get priority() {
    if (this._priority === undefined) {
      return this.constructor.defaultPriority()
    }

    return this._priority
  }

  set priority(val) {
    this._priority = val
  }

  static defaultPriority() {
    return 0
  }

  get visible() {
    if (this._visible === undefined) {
      return this.constructor.defaultVisible()
    }

    return this._visible
  }

  set visible(val) {
    this._visible = val
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
    if (this._conditions === undefined) {
      this._conditions = this.constructor.defaultConditions()
      return this._conditions
    }

    return this._conditions
  }

  set conditions(conditions) {
    if (conditions === null) {
      this._conditions = this.constructor.defaultConditions()
      return
    }

    this._conditions = []

    for (let item of conditions) {
      if (item instanceof Array) {
        this.constructor.addCondition(item[0], item[1])
        return
      }

      this.constructor.addCondition(item)
    }
  }

  static defaultConditions() {
    return []
  }

  addCondition(condition, label = null) {
    this.conditions.push({ condition, label })
  }

  get undefined() {
    let result = null

    if (this._undefined === undefined) {
      result = this.constructor.defaultUndefined()
    } else {
      result = this._undefined
    }

    return result === null ? this.defaultUndefined() : result
  }

  set undefined(str) {
    this._undefined_set(str)
  }

  _undefined_set(str) {
    this._undefined = str
  }

  static defaultUndefined() {
    return ''
  }

  isContainer() {
    return false
  }

  isSortable() {
    return false
  }
}