
export class MADescription
{
  static isAbstract() {
    return true;
  }

  #kind = undefined;
  #readOnly = undefined;
  #required = undefined;
  #undefinedValue = undefined;
  #name = undefined;
  #comment = undefined;
  #group = undefined;
  #label = undefined;
  #priority = undefined;
  #visible = undefined;
  #conditions = undefined;
  #undefined = undefined;

  constructor(args = {}) {
    for (const [key, value] of Object.entries(args)) {
      this[key] = value;
    }
  }

  get type() {
    return this.constructor.name;
  }

  get kind() {
    if (typeof(this.#kind) === 'undefined') {
      return this.constructor.defaultKind();
    }

    return this.#kind;
  }

  set kind(aClass) {
    this.#kind = aClass;
  }

  static defaultKind() {
    return Object;
  }

  isKindDefined() {
    return typeof(this.#kind) !== 'undefined';
  }

  get readOnly() {
    if (typeof(this.#readOnly) === undefined) {
      return this.constructor.defaultReadOnly();
    }
    return this.#readOnly;
  }

  set readOnly(val) {
    this.#readOnly = val;
  }

  static defaultReadOnly() {
    return false;
  }

  isReadOnly() {
    return this.readOnly;
  }

  beReadOnly() {
    this.readOnly = true;
  }

  beWriteable() {
    this.readOnly = false;
  }

  get required() {
    if (this.#required === undefined) {
      return this.constructor.defaultRequired();
    }
    return this.#required;
  }

  set required(aBool) {
    this.#required = aBool;
  }

  static defaultRequired() {
    return false;
  }

  isRequired() {
    return this.required;
  }

  beRequired() {
    this.required = true;
  }

  beOptional() {
    this.required = false;
  }

  get undefinedValue() {
    let result = null;
    if (typeof(this.#undefinedValue) === 'undefined') {
      result = this.constructor.defaultUndefinedValue();
    } else {
      result = this.#undefinedValue;
    }

    return result === null ? this.constructor.defaultUndefinedValue() : result;
  }

  set undefinedValue(anObject) {
    this.#undefinedValue = anObject;
  }

  static defaultUndefinedValue() {
    return null;
  }

  get name() {
    if (typeof(this.#name) === 'undefined') {
      return this.constructor.defaultName();
    }

    return this.#name;
  }

  set name(val) {
    this.#name = val;
  }

  static defaultName() {
    return null;
  }

  get comment() {
    if (typeof(this.#comment) === 'undefined') {
      return this.constructor.defaultComment();
    }

    return this.#comment;
  }

  set comment(str) {
    this.#comment = str;
  }

  static defaultComment() {
    return null;
  }

  hasComment() {
    return Boolean(this.comment);
  }

  get group() {
    if (this.#group === undefined) {
      return this.constructor.defaultGroup();
    }

    return this.#group;
  }

  set group(str) {
    this.#group = str;
  }

  static defaultGroup() {
    return null;
  }

  get label() {
    if (typeof(this.#label) === 'undefined') {
      return this.constructor.defaultLabel();
    }

    return this.#label;
  }

  set label(str) {
    this.#label = str;
  }

  static defaultLabel() {
    return '';
  }

  hasLabel() {
    return Boolean(this.label);
  }

  get priority() {
    if (typeof(this.#priority) === 'undefined') {
      return this.constructor.defaultPriority();
    }

    return this.#priority;
  }

  set priority(val) {
    this.#priority = val;
  }

  static defaultPriority() {
    return 0;
  }

  get visible() {
    if (typeof(this.#visible) === 'undefined') {
      return this.constructor.defaultVisible();
    }

    return this.#visible;
  }

  set visible(val) {
    this.#visible = val;
  }

  static defaultVisible() {
    return true;
  }

  isVisible() {
    return this.visible;
  }

  beVisible() {
    this.visible = true;
  }

  beHidden() {
    this.visible = false;
  }

  get conditions() {
    if (typeof(this.#conditions) === 'undefined') {
      this.#conditions = this.constructor.defaultConditions();
      return this.#conditions;
    }

    return this.#conditions;
  }

  set conditions(conditions) {
    if (conditions === null) {
      this.#conditions = this.constructor.defaultConditions();
      return;
    }

    this.#conditions = [];

    for (let item of conditions) {
      if (item instanceof Array) {
        this.constructor.addCondition(item[0], item[1]);
        return;
      }

      this.constructor.addCondition(item);
    }
  }

  static defaultConditions() {
    return [];
  }

  addCondition(condition, label = null) {
    this.conditions.push({ condition, label });
  }

  get undefined() {
    let result = null;

    if (typeof(this.#undefined) === 'undefined') {
      result = this.constructor.defaultUndefined();
    } else {
      result = this.#undefined;
    }

    return result === null ? this.defaultUndefined() : result;
  }

  set undefined(str) {
    this.#undefined = str;
  }

  static defaultUndefined() {
    return '';
  }

  isContainer() {
    return false;
  }

  isSortable() {
    return false;
  }
}
