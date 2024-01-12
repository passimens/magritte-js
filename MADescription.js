export class MADescription {
  static isAbstract() {
    return true
  }

  get type() {
    return this.constructor.name
  }

  constructor(args) {
    for (let key in args) {
      const value = args[key]
      const attr = this.constructor[key]

      if (attr instanceof Property) {
        this[key] = value
      }
    }
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
      return this.defaultName()
    }
  }

  set name(val) {
    this._name = val
  }

  static defaultName() {
    return null
  }

  get comment() {
    try {
      return this._comment
    } catch (error) {
      return this.defaultComment()
    }
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
    try {
      return this._group
    } catch (error) {
      return this.defaultGroup()
    }
  }

  set group(str) {
    this._group = str
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
    try {
      return this._priority
    } catch (error) {
      return this.defaultPriority()
    }
  }

  set priority(val) {
    this._priority = val
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
    console.log('addCondition this', this)
    this.conditions.push({ condition, label })
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

function init() {
  const description = new MADescription()

  description.kind = { a: 1 }

  console.log('===MADescription===')
  console.log('type:', description.type)
  console.log('kind:', description.kind)
  console.log('isKindDefined:', description.isKindDefined())

  console.log('\nisReadOnly:', description.isReadOnly())
  description.beReadOnly()
  console.log('set beReadOnly')
  console.log('isReadOnly:', description.isReadOnly())
  description.beWriteable()
  console.log('set beWriteable')
  console.log('isReadOnly:', description.isReadOnly())
  description.readOnly = true
  console.log('set readOnly to true')
  console.log('get readOnly:', description.readOnly)

  console.log('\nisRequired:', description.isRequired())
  description.beRequired()
  console.log('set beRequired')
  console.log('isRequired:', description.isRequired())
  description.beOptional()
  console.log('set beOptional')
  console.log('isRequired:', description.isRequired())
  description.required = true
  console.log('set required to true')
  console.log('get required:', description.required)

  console.log('\nisVisible:', description.isVisible())
  description.beVisible()
  console.log('set beVisible')
  console.log('isVisible:', description.isVisible())
  description.beHidden()
  console.log('set beHidden')
  console.log('isVisible:', description.isVisible())
  description.visible = true
  console.log('set visible to true')
  console.log('get visible:', description.visible)

  console.log('\nname:', description.name)
  description.name = 'some name'
  console.log('name:', description.name)

  console.log('\ncomment:', description.comment)
  console.log('hasComment:', description.hasComment())

  description.comment = 'some comment'
  console.log('comment:', description.comment)
  console.log('hasComment:', description.hasComment())

  console.log('\ngroup:', description.group)
  description.group = 'some group'
  console.log('group:', description.group)

  console.log('\nhasLabel:', description.hasLabel())
  console.log('label:', description.label)
  description.label = 'some label'
  console.log('label:', description.label)
  console.log('hasLabel:', description.hasLabel())

  console.log('\npriority:', description.priority)
  description.priority = 999
  console.log('priority:', description.priority)

  console.log('\nconditions:', description.conditions)
  description.conditions = [
    ['some condition', 123]
  ]
  console.log('conditions:', description.conditions)

  console.log('\nundefined:', description.undefined)
  description.undefined = 'some undefined value'
  console.log('undefined:', description.undefined)

  console.log('\nisContainer:', description.isContainer())
  console.log('isSortable:', description.isSortable())

  console.log('===MADescription end===\n')
}

// init()