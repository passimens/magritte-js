
import { MAContainer } from '../descriptions/MAContainer.js';
import { MAToOneRelationDescription } from '../descriptions/MAToOneRelationDescription.js';
import { MAToManyRelationDescription } from '../descriptions/MAToManyRelationDescription.js';
import { MAStringDescription } from '../descriptions/MAStringDescription.js';
import { MADateDescription } from '../descriptions/MADateDescription.js';
import { MAIntDescription } from '../descriptions/MAIntDescription.js'


export class NetModelDescriptors {
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
