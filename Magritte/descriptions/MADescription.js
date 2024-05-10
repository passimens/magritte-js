
import { MAValidatorVisitor } from '../visitors/MAValidatorVisitor.js'
import { MAConditionError } from '../errors/MAConditionError.js';
import { MARequiredError } from '../errors/MARequiredError.js';


export class MADescription
{
  constructor(init_props)
  {
    this.initializeProperties(init_props);
  }

  static isAbstract() {
    return true;
  }

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
  #multipleErrorsMessage = undefined;
  #conflictErrorMessage = undefined;

  initializeProperties(init_props)
  {
    /*
      Обращение к приватному полю (#field) в JS возможно только в контексте того класса, где оно объявлено.
      Кроме того, сеттеры и геттеры дочерних классов не работают в процессе выполнения конструктора базового объекта.
      Поэтому помимо инициализации полей в конструкторе базового MADescription требуется вызвать initializeProperties
      в конструкторе каждого дочернего класса.
    */
    if (init_props)
    {
      for (const [key, value] of Object.entries(init_props))
      {
        try
        {
          this[key] = value;
        }
        catch { }
      }
    }
  }

  getInitialPropertyValue(name)
  {
    const initializer = (init_props) =>
    {
      let value;
      try
      {
        value = init_props[name];
      }
      catch (e)
      {
        value = undefined;
      }
      this[`#${name}`] = value;
    }
    this._initializers.push(initializer);
    return undefined;
  }

  get type() {
    return this.constructor.name;
  }

  get readOnly() {
    if (this.#readOnly === undefined) {
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
    let result;
    if (this.#undefinedValue === undefined) {
      result = this.constructor.defaultUndefinedValue();
    } else {
      result = this.#undefinedValue;
    }

    return (result === undefined) ? this.constructor.defaultUndefinedValue() : result;
  }

  set undefinedValue(anObject) {
    this.#undefinedValue = anObject;
  }

  static defaultUndefinedValue() {
    return undefined;
  }

  get name() {
    if (this.#name === undefined) {
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
    if (this.#comment === undefined) {
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
    if (this.#group === undefined) {
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
    if (this.#label === undefined) {
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
    if (this.#priority === undefined) {
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
    if (this.#visible === undefined) {
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
    if (this.#conditions === undefined) {
      this.#conditions = this.constructor.defaultConditions();
    }

    return this.#conditions;
  }

  set conditions(conditions)
  {
    if (this.#conditions === undefined) {
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
    if (label === undefined)
    {
      label = condition.label;
    }
    this.conditions.push([condition, label]);
  }

  get undefined() {
    let result;
    if (this.#undefined === undefined) {
      result = this.constructor.defaultUndefined();
    } else {
      result = this.#undefined;
    }

    return (result === undefined) ? this.constructor.defaultUndefined() : result;
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
    return aVisitor.visitDescription(this);
  }

  get requiredErrorMessage()
  {
    if (this.#requiredErrorMessage === undefined)
    {
      return this.constructor.defaultRequiredErrorMessage();
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

  get multipleErrorsMessage()
  {
    if (this.#multipleErrorsMessage === undefined)
    {
      return this.constructor.defaultMultipleErrorsMessage();
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
    if (this.#conflictErrorMessage === undefined)
    {
      return this.constructor.defaultConflictErrorMessage();
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

  validateRequired(model)
  {
    if (this.isRequired() && model === undefined)
    {
      return [new MARequiredError(this, this.requiredErrorMessage)];
    }
    else
    {
      return [];
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
    if (this.#validator === undefined) {
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

  _dbg_print(indent)
  {
    const hardcodedPropertyNames = [
     'undefined',
     'children',
     'group',
     'extensible',
     'lineCount',
     'undefinedValue',
     'validator',
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

    if (indent === undefined) indent = 0;
    const indent_str = ''.padStart(indent, ' ');
    console.log(`${indent_str}==== ${this.constructor.name} (${this.name}) ====`);
    for (const propertyName of hardcodedPropertyNames)
    {
      try
      {
        const value = this[propertyName];
        if (value !== undefined)
        {
          if (Array.isArray(value))
          {
            if (value.length)
            {
              console.log(`${indent_str}  ${propertyName}: Array items below`);
              for (const child of value)
              {
                child._dbg_print(indent + 4);
              }
            }
            else
            {
              console.log(`${indent_str}  ${propertyName}: Empty array`);
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
