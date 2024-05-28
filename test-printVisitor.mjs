

/* Визитор для распечатки */


import { MAVisitor } from './Magritte/visitors/MAVisitor.js';
import { NetModelDescriptors } from './Magritte/model_for_tests/ModelDescriptor_test.js';
import { TestEnvironmentProvider } from './Magritte/model_for_tests/EnvironmentProvider_test.js';


export class PrintVisitor extends MAVisitor
{
  #model = undefined;
  #lines = undefined;
  #indent = undefined;

  print(aDescription, aModel)
  {
    this.#model = aModel;
    this.#lines = [];
    this.#indent = 0;
    this.visit(aDescription);
    return this.#lines.join('\n');
  }

  #printLine(line)
  {
    this.#lines.push(`${' '.repeat(this.#indent)}${line}`);
  }

  #printValue(type, name, value)
  {
    this.#printLine(`"${name}" ${type} description with value of: ${value}`);
  }

  visitContainer(anObject)
  {
    this.#printLine(`<MAContainer "${anObject.name}">`);
    const indent = this.#indent;
    this.#indent += 2;
    for (const childDescription of anObject.children)
    {
      this.visit(childDescription);
    }
    this.#indent = indent;
    this.#printLine(`</MAContainer>`);
  }

  visitDescription(anObject)
  {
    this.#printValue('Some', anObject.name, this.#model[anObject.name]);
  }

  visitElementDescription(anObject)
  {
    this.#printValue('Element', anObject.name, this.#model[anObject.name]);
  }

  visitBooleanDescription(anObject)
  {
    const value = this.#model[anObject.name] ? anObject.constructor.defaultTrueString() : anObject.constructor.defaultFalseString();
    this.#printValue('Boolean', anObject.name, value);
  }

  visitNumberDescription(anObject)
  {
    this.#printValue('Number', anObject.name, this.#model[anObject.name]);
  }

  visitStringDescription(anObject)
  {
    this.#printValue('String', anObject.name, this.#model[anObject.name]);
  }

  visitDateAndTimeDescription(anObject)
  {
    const locale = 'ru-RU';
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    const d = this.#model[anObject.name];
    const value = formatter.format(d);
    this.#printValue('DateTime', anObject.name, value);
  }

  visitDateDescription(anObject)
  {
    const locale = 'ru-RU';
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    const d = this.#model[anObject.name];
    const value = formatter.format(d);
    this.#printValue('Date', anObject.name, value);
  }

  visitTimeDescription(anObject)
  {
    const locale = 'ru-RU';
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    const d = this.#model[anObject.name];
    const value = formatter.format(d);
    this.#printValue('Time', anObject.name, value);
  }

  visitToManyRelationDescription(anObject)
  {
    const arr = this.#model[anObject.name];
    let value = `${anObject.reference.name}, `;
    if (Array.isArray(arr))
    {
      value += `[array with length of ${arr.length}]`;
    }
    else
    {
      value += '[not set]';
    }
    this.#printValue('ToManyRelation', anObject.name, value);
  }

  visitToOneRelationDescription(anObject)
  {
    const m = this.#model[anObject.name];
    let value = `${anObject.reference.name} `;
    if (m === undefined)
    {
      value += '[not set]';
    }
    else
    {
      value += '[instance]';
    }
    this.#printValue('ToOneRelation', anObject.name, value);
  }

/*
  visitMultipleOptionDescription(anObject)
  {

  }

  visitSingleOptionDescription(anObject)
  {

  }

*/
}




export function printModel(aDescription, aModel)
{
  const visitor = new PrintVisitor();
  try
  {
    const printed = visitor.print(aDescription, aModel);
    console.log(printed);
  }
  catch (e)
  {
    console.log(e);
  }
}

function printHost()
{
  const descriptionProvider = new NetModelDescriptors();
  const modelProvider = new TestEnvironmentProvider();
  const hostDescription = descriptionProvider.factByName('Host');
  printModel(hostDescription, modelProvider.hosts()[0]);
}

function printPort()
{
  const descriptionProvider = new NetModelDescriptors();
  const modelProvider = new TestEnvironmentProvider();
  const portDescription = descriptionProvider.factByName('Port');
  printModel(portDescription, modelProvider.ports()[0]);
}

printHost();
printPort();


