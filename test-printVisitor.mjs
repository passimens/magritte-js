
/*  Всё, что до PrintVisitor, заимствовано из nutcracker-backend\front-end\src\common\net-models-descriptors.mjs   */


import { MAContainer } from './Magritte/descriptions/MAContainer.js';
import { MAToOneRelationDescription } from './Magritte/descriptions/MAToOneRelationDescription.js';
import { MAToManyRelationDescription } from './Magritte/descriptions/MAToManyRelationDescription.js';
import { MAStringDescription } from './Magritte/descriptions/MAStringDescription.js';
import { MADateDescription } from './Magritte/descriptions/MADateDescription.js';
import { MAIntDescription } from './Magritte/descriptions/MAIntDescription.js'

class NetModelDescriptors {
  #factList = [];
  #glossaryList = [];

  constructor () {
    // Descriptors for facts
    const actorDesc = new MAContainer();
    const domainDesc = new MAContainer();
    const hostDesc = new MAContainer();
    const linkDesc = new MAContainer();
    const portDesc = new MAContainer();
    const subnetDesc = new MAContainer();
    const weaknessDesc = new MAContainer();

    this.#factList = [
      actorDesc,
      domainDesc,
      hostDesc,
      linkDesc,
      portDesc,
      subnetDesc,
      weaknessDesc
    ];

    // Descriptors for glossaries
    const protocolDesc = new MAContainer();
    const serviceDesc = new MAContainer();

    this.#glossaryList = [
      protocolDesc,
      serviceDesc
    ];

    // serviceDesc.kind = Service;
    serviceDesc.name = 'Service';
    serviceDesc.label = 'Service model';
    serviceDesc.setChildren(
      [
        new MAStringDescription({
          name: 'name', label: 'Name', required: true
        }),
        new MAStringDescription({
          name: 'standard_port', label: 'Standard Port', required: true
        }),
        new MAToManyRelationDescription({
          name: 'applicable_weaknesses',
          label: 'Applicable Weaknesses',
          required: true,
          // classes=[Weakness],
          reference: weaknessDesc
        })
      ]
    );

    // weaknessDesc.kind = Weakness
    weaknessDesc.name = 'Applicable_weakness';
    weaknessDesc.label = 'Applicable_weakness';
    weaknessDesc.setChildren(
      [
        new MAIntDescription({
          name: 'uid', label: 'UID', required: true
        }),
        new MAStringDescription({
          name: 'name', label: 'Name', required: true
        }),
        new MAStringDescription({
          name: 'weakness_type', label: 'Weakness Type', required: true
        }),
        new MAStringDescription({
          name: 'details', label: 'Details', required: true
        }),
        new MAStringDescription({
          name: 'cve_id', label: 'CVE Id', required: true
        }),
        new MAStringDescription({
          name: 'vendor_id', label: 'Vendor Id', required: true
        }),
        new MAStringDescription({
          name: 'more_info', label: 'More Info', required: true
        })
      ]
    );

    // protocolDesc.kind = Protocol;
    protocolDesc.name = 'Protocol';
    protocolDesc.label = 'Protocol model';
    protocolDesc.setChildren(
      [
        new MAStringDescription({
          name: 'name', label: 'Name', required: true
        }),
        new MAStringDescription({
          name: 'standard_port', label: 'Standard Port', required: true
        })
      ]
    );

    // hostDesc.kind = Host;
    hostDesc.name = 'Host';
    hostDesc.label = 'Host model';
    hostDesc.setChildren(
      [
        new MAStringDescription({
          name: 'address', label: 'Ip Address', required: true

        }),
        new MAStringDescription({
          name: 'last_updated', label: 'Last Updated', required: true
        }),
        new MAToManyRelationDescription({
          name: 'ports',
          label: 'Ports',
          required: true,
          // classes=[Port],
          reference: portDesc
        })
      ]
    );

    // hostDesc.kind = Port;
    portDesc.name = 'Port';
    portDesc.label = 'Port model';
    portDesc.setChildren(
      [
        new MAIntDescription({
          name: 'uid', label: 'UID', required: true
        }),
        new MAStringDescription({
          name: 'last_updated', label: 'Last Updated', required: true
        }),
        new MAToOneRelationDescription({
          name: 'ip4_addr',
          label: 'Host',
          required: true,
          // classes=[Host],
          reference: hostDesc,
          fieldName: 'ip4_addr'
        }),
        new MAStringDescription({
          name: 'port_num', label: 'Port number', required: true

        }),
        new MAToOneRelationDescription({
          name: 'service',
          label: 'Service',
          required: true,
          // classes=[Service],
          reference: serviceDesc
        }),
        new MAToManyRelationDescription({
          name: 'weaknesses',
          label: 'Weaknesses',
          // classes=[Weakness],
          reference: weaknessDesc
        }),
        new MAStringDescription({
          name: 'descriptive_label', label: 'Descriptive Label', readOnly: true
        })
      ]
    );

    // subnetDesc.kind = Subnet;
    subnetDesc.name = 'Subnet';
    subnetDesc.label = 'Subnet model';
    subnetDesc.setChildren(
      [
        new MAStringDescription({
          name: 'last_updated', label: 'Last Updated', required: true
        }),
        new MAStringDescription({
          name: 'address', label: 'Ip Address', required: true

        }),
        new MAStringDescription({
          name: 'mask', label: 'Mask', required: true
        }),
        new MAStringDescription({
          name: 'descriptive_label', label: 'Descriptive Label', readOnly: true
        })
      ]
    );

    // linkDesc.kind = Link;
    linkDesc.name = 'BrokenLink';
    linkDesc.label = 'BrokenLink Link model';
    linkDesc.setChildren(
      [
        new MAIntDescription({
          name: 'uid', label: 'UID', required: true
        }),
        new MAStringDescription({
          name: 'last_updated', label: 'Last Updated', required: true

        }),
        new MAToOneRelationDescription({
          name: 'protocol',
          label: 'Protocol',
          required: true,
          // classes=[Protocol],
          reference: protocolDesc
        }),
        new MAStringDescription({
          name: 'hostname', label: 'Host name', required: true

        }),
        new MAStringDescription({
          name: 'port', label: 'Port', required: true
        }),
        new MAStringDescription({
          name: 'path', label: 'Path', required: true
        }),
        new MAStringDescription({
          name: 'descriptive_label', label: 'Descriptive Label', readOnly: true
        })
      ]
    );

    // actorDesc.kind = Actor;
    actorDesc.name = 'Actor';
    actorDesc.label = 'Actor model';
    actorDesc.setChildren(
      [
        new MAIntDescription({
          name: 'uid', label: 'UID', required: true
        }),
        new MAStringDescription({
          name: 'last_updated', label: 'Last Updated', required: true

        }),
        new MAStringDescription({
          name: 'interface', label: 'Interface', required: true

        }),
        new MAToOneRelationDescription({
          name: 'ip4_addr',
          label: 'IP4 Address',
          required: true,
          // classes=[Host],
          reference: hostDesc
        }),
        new MAToOneRelationDescription({
          name: 'net',
          label: 'Network',
          required: true,
          // classes=[Subnet],
          reference: subnetDesc
        }),
        new MAToOneRelationDescription({
          name: 'gateway',
          label: 'Gateway',
          required: true,
          // classes=[Host],
          reference: hostDesc
        }),
        new MAToOneRelationDescription({
          name: 'DNS',
          label: 'DNS',
          required: true,
          // classes=[Host],
          reference: hostDesc
        }),
        new MAStringDescription({
          name: 'descriptive_label', label: 'Descriptive Label', readOnly: true
        })
      ]
    );

    // domainDesc.kind = Domain;
    domainDesc.name = 'Domain';
    domainDesc.label = 'Domain model';
    domainDesc.setChildren(
      [
        new MAIntDescription({
          name: 'uid', label: 'UID', required: true
        }),
        new MAStringDescription({
          name: 'last_updated', label: 'Last Updated', required: true
        }),
        new MAStringDescription({
          name: 'cname', label: 'CNAME', required: true
        }),
        new MAStringDescription({
          name: 'netbios_name', label: 'NetBIOS Name', required: true
        }),
        new MAToManyRelationDescription({
          name: 'domain_controllers',
          label: 'Domain Controllers',
          required: true,
          // classes=[Host],
          reference: hostDesc
        }),
        new MAToManyRelationDescription({
          name: 'domain_computers',
          label: 'Domain Computers',
          required: true,
          // classes=[Host],
          reference: hostDesc
        }),
        new MAToManyRelationDescription({
          name: 'domain_weaknesses',
          label: 'Domain Weaknesses',
          required: true,
          // classes=[Weakness],
          reference: weaknessDesc
        }),
        new MAStringDescription({
          name: 'descriptive_label', label: 'Descriptive Label', readOnly: true
        })
      ]
    );
  }

  get facts () {
    return this.#factList;
  }

  factByName (descName) {
    return this.#descByName(descName, this.#factList);
  }

  get glossaries () {
    return this.#glossaryList;
  }

  glossaryByName (descName) {
    return this.#descByName(descName, this.#glossaryList);
  }

  #descByName (descName, descList) {
    const res = descList.find(desc => { return desc.name === descName; });
    if (res === undefined) { throw new RangeError(`Unknown descriptor name: ${descName}`); }
    return res;
  }
}





/* Визитор для распечатки */


import { MAVisitor } from './Magritte/visitors/MAVisitor.js';


class PrintVisitor extends MAVisitor
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


/* Тестовые модели, импортированные из net-small.json */

const portModel93 = {};
const portModel100 = {};
const hostModel89 = {};
const serviceModel4 = {};
const serviceModel22 = {};
const weaknessModel26 = {};
const weaknessModel15 = {};
const weaknessModel8 = {};

Object.assign(portModel93,
        {
          "_key": 93,
          "last_updated": "2024-03-04T15:09:57.582266",
          "ip4_addr": hostModel89,
          "port_num": 80,
          "service": serviceModel22,
          "weaknesses": [
            weaknessModel26
          ],
          "descriptive_label": "192.168.0.1:80"
        }
);

Object.assign(portModel100,
        {
          "_key": 100,
          "last_updated": "2024-03-04T15:09:57.582288",
          "ip4_addr": hostModel89,
          "port_num": 22,
          "service": serviceModel4,
          "weaknesses": [
            weaknessModel15
          ],
          "descriptive_label": "192.168.0.1:22"
        }
);

Object.assign(hostModel89,
    {
      "_key": 89,
      "last_updated": "2024-03-04T15:09:57.582255",
      "address": "192.168.0.1",
      "ports": [ portModel93, portModel100 ],
      "descriptive_label": "192.168.0.1"
    }
);

Object.assign(serviceModel4,
      {
        "_key": 4,
        "name": "ssh",
        "standard_port": null,
        "applicable_weaknesses": [
          weaknessModel8,
          weaknessModel15
        ]
      }
);

Object.assign(serviceModel22,
      {
        "_key": 22,
        "name": "https",
        "standard_port": null,
        "applicable_weaknesses": [
          weaknessModel26
        ]
      }
);

Object.assign(weaknessModel26,
          {
            "_key": 26,
            "name": "acac",
            "weakness_type": "Misconfiguration",
            "details": "Access-Control-Allow-Credentials set to true",
            "cve_id": null,
            "vendor_id": null,
            "more_info": null
          }
);

Object.assign(weaknessModel15,
          {
            "_key": 15,
            "name": "root",
            "weakness_type": "Misconfiguration",
            "details": "login as root possible",
            "cve_id": null,
            "vendor_id": null,
            "more_info": null
          }
);

Object.assign(weaknessModel8,
          {
            "_key": 8,
            "name": "notimeout",
            "weakness_type": "Misconfiguration",
            "details": "immediate password re-request",
            "cve_id": null,
            "vendor_id": null,
            "more_info": null
          },
);



function printModel(aDescription, aModel)
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
  const provider = new NetModelDescriptors();
  const hostDescription = provider.factByName('Host');
  printModel(hostDescription, hostModel89);
}

function printPort()
{
  const provider = new NetModelDescriptors();
  const portDescription = provider.factByName('Port');
  printModel(portDescription, portModel100);
}

printHost();
printPort();


