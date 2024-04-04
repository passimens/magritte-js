
import { MAValidatorVisitor } from '../visitors/MAValidatorVisitor.js'
import { MAConditionError } from '../errors/MAConditionError.js';
import { MAKindError } from '../errors/MAKindError.js';
import { MARequiredError } from '../errors/MARequiredError.js';


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
  #validator = undefined;
  #requiredErrorMessage = undefined;
  #kindErrorMessage = undefined;
  #multipleErrorsMessage = undefined;
  #conflictErrorMessage = undefined;


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
    if (typeof(this.#readOnly) === 'undefined') {
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
    if (typeof(this.#required) === 'undefined') {
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
    let result;
    if (typeof(this.#undefinedValue) === 'undefined') {
      result = this.constructor.defaultUndefinedValue();
    } else {
      result = this.#undefinedValue;
    }

    return (typeof(result) === 'undefined') ? this.constructor.defaultUndefinedValue() : result;
  }

  set undefinedValue(anObject) {
    this.#undefinedValue = anObject;
  }

  static defaultUndefinedValue() {
    return undefined;
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
    return undefined;
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
    return undefined;
  }

  hasComment() {
    return Boolean(this.comment);
  }

  get group() {
    if (typeof(this.#group) === 'undefined') {
      return this.constructor.defaultGroup();
    }

    return this.#group;
  }

  set group(str) {
    this.#group = str;
  }

  static defaultGroup() {
    return undefined;
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
    }

    return this.#conditions;
  }

  set conditions(conditions) {
    if (typeof(this.#conditions) === 'undefined') {
      this.#conditions = this.constructor.defaultConditions();
      return;
    }
    else
    {
      this.#conditions = [];

      for (const item of conditions)
      {
        if (item instanceof Array)
        {
          this.constructor.addCondition(item[0], item[1]);
        }
        else
        {
          this.constructor.addCondition(item);
        }
      }
    }
  }

  static defaultConditions() {
    return [];
  }

  addCondition(condition, label=undefined) {
    if (typeof(label) === 'undefined')
    {
      label = condition.label;
    }
    this.conditions.push([condition, label]);
  }

  get undefined() {
    let result;
    if (typeof(this.#undefined) === 'undefined') {
      result = this.constructor.defaultUndefined();
    } else {
      result = this.#undefined;
    }

    return (typeof(result) === 'undefined') ? this.defaultUndefined() : result;
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

  acceptMagritte(aVisitor)
  {
    aVisitor.visitDescription(this);
  }

  get requiredErrorMessage()
  {
    if (typeof(this.#requiredErrorMessage) === 'undefined')
    {
      return this.defaultRequiredErrorMessage();
    }
    return this.#requiredErrorMessage;
  }

  set requiredErrorMessage(message)
  {
    this.#requiredErrorMessage = message;
  }

  static defaultRequiredErrorMessage(cls)
  {
    return 'Input is required but no input given';
  }

  get kindErrorMessage()
  {
    if (typeof(this.#kindErrorMessage) === 'undefined')
    {
      return this.defaultKindErrorMessage();
    }
    return this.#kindErrorMessage;
  }

  set kindErrorMessage(message)
  {
    this.#kindErrorMessage = message;
  }

  static defaultKindErrorMessage()
  {
    return 'Invalid input given - wrong type';
  }

  get multipleErrorsMessage()
  {
    if (typeof(this.#multipleErrorsMessage) === 'undefined')
    {
      return this.defaultMultipleErrorsMessage();
    }
    return this.#multipleErrorsMessage;
  }

  set multipleErrorsMessage(message)
  {
    this.#multipleErrorsMessage = message;
  }

  static defaultMultipleErrorsMessage()
  {
    return 'Multiple errors';
  }

  get conflictErrorMessage()
  {
    if (typeof(this.#conflictErrorMessage) === 'undefined')
    {
      return this.defaultConflictErrorMessage();
    }
    return this.#conflictErrorMessage;
  }

  set conflictErrorMessage(message)
  {
    this.#conflictErrorMessage = message;
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

  #validateRequired(model)
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

  #validateKind(model)
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

  #validateSpecific(model)
  {
    // validates descriptions-specific conditions. Subclasses may override this method - see MAMAgnitudeDescription for example.
    return [];
  }

  #validateConditions(model)
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
    if (typeof(this.#validator) === 'undefined') {
      this.#validator = this.constructor.defaultValidator();
    }
    return this.#validator;
  }

  set validator(validator) {
    this.#validator = validator;
  }

  static defaultValidator()
  {
    return MAValidatorVisitor;
  }
}
