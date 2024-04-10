
import { MAValidatorVisitor } from '../visitors/MAValidatorVisitor.js'
import { MAConditionError } from '../errors/MAConditionError.js';
import { MAKindError } from '../errors/MAKindError.js';
import { MARequiredError } from '../errors/MARequiredError.js';


export class MADescription
{
  static isAbstract() {
    return true;
  }

  _kind = undefined;
  _readOnly = undefined;
  _required = undefined;
  _undefinedValue = undefined;
  _name = undefined;
  _comment = undefined;
  _group = undefined;
  _label = undefined;
  _priority = undefined;
  _visible = undefined;
  _conditions = undefined;
  _undefined = undefined;
  _validator = undefined;
  _requiredErrorMessage = undefined;
  _kindErrorMessage = undefined;
  _multipleErrorsMessage = undefined;
  _conflictErrorMessage = undefined;


  constructor(args) {
    if (args) for (const [key, value] of Object.entries(args)) {
      this[key] = value;
    }
  }

  get type() {
    return this.constructor.name;
  }

  get kind() {
    if (typeof(this._kind) === 'undefined') {
      return this.constructor.defaultKind();
    }

    return this._kind;
  }

  set kind(aClass) {
    this._kind = aClass;
  }

  static defaultKind() {
    return Object;
  }

  isKindDefined() {
    return typeof(this._kind) !== 'undefined';
  }

  get readOnly() {
    if (typeof(this._readOnly) === 'undefined') {
      return this.constructor.defaultReadOnly();
    }
    return this._readOnly;
  }

  set readOnly(val) {
    this._readOnly = val;
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
    if (typeof(this._required) === 'undefined') {
      return this.constructor.defaultRequired();
    }
    return this._required;
  }

  set required(aBool) {
    this._required = aBool;
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
    let result;
    if (typeof(this._undefinedValue) === 'undefined') {
      result = this.constructor.defaultUndefinedValue();
    } else {
      result = this._undefinedValue;
    }

    return (typeof(result) === 'undefined') ? this.constructor.defaultUndefinedValue() : result;
  }

  set undefinedValue(anObject) {
    this._undefinedValue = anObject;
  }

  static defaultUndefinedValue() {
    return undefined;
  }

  get name() {
    if (typeof(this._name) === 'undefined') {
      return this.constructor.defaultName();
    }

    return this._name;
  }

  set name(val) {
    this._name = val;
  }

  static defaultName() {
    return undefined;
  }

  get comment() {
    if (typeof(this._comment) === 'undefined') {
      return this.constructor.defaultComment();
    }

    return this._comment;
  }

  set comment(str) {
    this._comment = str;
  }

  static defaultComment() {
    return undefined;
  }

  hasComment() {
    return Boolean(this.comment);
  }

  get group() {
    if (typeof(this._group) === 'undefined') {
      return this.constructor.defaultGroup();
    }

    return this._group;
  }

  set group(str) {
    this._group = str;
  }

  static defaultGroup() {
    return undefined;
  }

  get label() {
    if (typeof(this._label) === 'undefined') {
      return this.constructor.defaultLabel();
    }

    return this._label;
  }

  set label(str) {
    this._label = str;
  }

  static defaultLabel() {
    return '';
  }

  hasLabel() {
    return Boolean(this.label);
  }

  get priority() {
    if (typeof(this._priority) === 'undefined') {
      return this.constructor.defaultPriority();
    }

    return this._priority;
  }

  set priority(val) {
    this._priority = val;
  }

  static defaultPriority() {
    return 0;
  }

  get visible() {
    if (typeof(this._visible) === 'undefined') {
      return this.constructor.defaultVisible();
    }

    return this._visible;
  }

  set visible(val) {
    this._visible = val;
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
    if (typeof(this._conditions) === 'undefined') {
      this._conditions = this.constructor.defaultConditions();
    }

    return this._conditions;
  }

  set conditions(conditions)
  {
    if (typeof(this._conditions) === 'undefined') {
      this._conditions = this.constructor.defaultConditions();
      return;
    }
    else
    {
      this._conditions = [];

      for (const item of conditions)
      {
        if (item instanceof Array)
        {
          this.addCondition(item[0], item[1]);
        }
        else
        {
          this.addCondition(item);
        }
      }
    }
  }

  static defaultConditions() {
    return [];
  }

  addCondition(condition, label=undefined)
  {
    if (typeof(label) === 'undefined')
    {
      label = condition.label;
    }
    this.conditions.push([condition, label]);
  }

  get undefined() {
    let result;
    if (typeof(this._undefined) === 'undefined') {
      result = this.constructor.defaultUndefined();
    } else {
      result = this._undefined;
    }

    return (typeof(result) === 'undefined') ? this.constructor.defaultUndefined() : result;
  }

  set undefined(str) {
    this._undefined = str;
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

  acceptMagritte(aVisitor)
  {
    aVisitor.visitDescription(this);
  }

  get requiredErrorMessage()
  {
    if (typeof(this._requiredErrorMessage) === 'undefined')
    {
      return this.constructor.defaultRequiredErrorMessage();
    }
    return this._requiredErrorMessage;
  }

  set requiredErrorMessage(message)
  {
    this._requiredErrorMessage = message;
  }

  static defaultRequiredErrorMessage(cls)
  {
    return 'Input is required but no input given';
  }

  get kindErrorMessage()
  {
    if (typeof(this._kindErrorMessage) === 'undefined')
    {
      return this.constructor.defaultKindErrorMessage();
    }
    return this._kindErrorMessage;
  }

  set kindErrorMessage(message)
  {
    this._kindErrorMessage = message;
  }

  static defaultKindErrorMessage()
  {
    return 'Invalid input given - wrong type';
  }

  get multipleErrorsMessage()
  {
    if (typeof(this._multipleErrorsMessage) === 'undefined')
    {
      return this.constructor.defaultMultipleErrorsMessage();
    }
    return this._multipleErrorsMessage;
  }

  set multipleErrorsMessage(message)
  {
    this._multipleErrorsMessage = message;
  }

  static defaultMultipleErrorsMessage()
  {
    return 'Multiple errors';
  }

  get conflictErrorMessage()
  {
    if (typeof(this._conflictErrorMessage) === 'undefined')
    {
      return this.constructor.defaultConflictErrorMessage();
    }
    return this._conflictErrorMessage;
  }

  set conflictErrorMessage(message)
  {
    this._conflictErrorMessage = message;
  }

  static defaultConflictErrorMessage()
  {
    return 'Input is conflicting with concurrent modification';
  }

  validate(model)
  {
    visitor = this.validator;
    errors = visitor.validateModelDescription(model, this);
    return errors;
  }

  validateRequired(model)
  {
    if (this.isRequired() && typeof(model) === 'undefined')
    {
      return [new MARequiredError(this, this.requiredErrorMessage)];
    }
    else
    {
      return [];
    }
  }

  validateKind(model)
  {
    if (model instanceof this.kind)
    {
      return [];
    }
    else
    {
      return [new MAKindError(this, this.kindErrorMessage)];
    }
  }

  validateSpecific(model)
  {
    // validates descriptions-specific conditions. Subclasses may override this method - see MAMAgnitudeDescription for example.
    return [];
  }

  validateConditions(model)
  {
    const errors = [];
    for (const conditionTuple of this.conditions)
    {
      const condition = conditionTuple[0];
      const label = conditionTuple[1];

      try
      {
        if (!condition(model))
        {
          errors.push(new MAConditionError(this, label));
        }
      }
      catch (e)
      {
        if (e instanceof MAValidationError)
        {
          errors.push(e);
        }
        else
        {
          throw e;
        }
      }
    }
    return errors;
  }

  get validator() {
    if (typeof(this._validator) === 'undefined') {
      this._validator = this.constructor.defaultValidator();
    }
    return this._validator;
  }

  set validator(validator) {
    this._validator = validator;
  }

  static defaultValidator()
  {
    return MAValidatorVisitor;
  }

  _dbg_print(indent)
  {
    const hardcodedPropertyNames = [
     'undefined',
     'children',
     'group',
     'classes',
     'extensible',
     'lineCount',
     'undefinedValue',
     'validator',
     'kindErrorMessage',
     'kind',
     'comment',
     'trueString',
     'min',
     'required',
     'stringWriter',
     'readOnly',
     'name',
     'conditions',
     'label',
     'multipleErrorsMessage',
     'conflictErrorMessage',
     'options',
     'requiredErrorMessage',
     'max',
     'visible',
     'stringReader',
     'rangeErrorMessage',
     'falseString',
     'priority',
     'sorted',
     'reference',
     'default',
    ];

    if (typeof(indent) === 'undefined') indent = 0;
    const indent_str = ''.padStart(indent, ' ');
    console.log(`${indent_str}==== ${this.constructor.name} (${this.name}) ====`);
    for (const propertyName of hardcodedPropertyNames)
    {
      try
      {
        const value = this[propertyName];
        if (typeof(value) !== 'undefined')
        {
          if (Array.isArray(value))
          {
            console.log(`${indent_str}  ${propertyName}: Array:`);
            for (const child of value)
            {
              child._dbg_print(indent + 4);
            }
          }
          else
          {
            console.log(`${indent_str}  ${propertyName}: ${value}`);
          }
        }
      }
      catch (e)
      {
      }
    }
    console.log(`${indent_str}==== /${this.constructor.name} (${this.name}) ====`);
  }
}
