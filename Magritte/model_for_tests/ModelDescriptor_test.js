
import { MAContainer } from '../descriptions/MAContainer.js';
import { MAToOneRelationDescription } from '../descriptions/MAToOneRelationDescription.js';
import { MAToManyRelationDescription } from '../descriptions/MAToManyRelationDescription.js';
import { MASingleOptionDescription } from '../descriptions/MASingleOptionDescription.js'
import { MADateAndTimeDescription } from '../descriptions/MADateAndTimeDescription.js'
import { MAStringDescription } from '../descriptions/MAStringDescription.js';
import { MADateDescription } from '../descriptions/MADateDescription.js';
import { MAIntDescription } from '../descriptions/MAIntDescription.js'
import { MABooleanDescription } from '../descriptions/MABooleanDescription.js'


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
    const userDesc = new MAContainer();
    const accountDesc = new MAContainer();

    this.#factList = [
      actorDesc,
      domainDesc,
      hostDesc,
      linkDesc,
      portDesc,
      subnetDesc,
      weaknessDesc,
      userDesc,
      accountDesc,
    ];

    // Descriptors for glossaries
    const protocolDesc = new MAContainer();
    const serviceDesc = new MAContainer();
    const organizationDesc = new MAContainer();
    const subscriptionPlanDesc = new MAContainer();

    this.#glossaryList = [
      protocolDesc,
      serviceDesc,
      organizationDesc,
      subscriptionPlanDesc,
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
          // required: true,
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

    userDesc.name = 'User';
    userDesc.label = 'User model';
    userDesc.setChildren(
      [
        new MAStringDescription({
            name: 'regnum',
            label: 'RegNum',
            required: true,
            isPrimaryKey: true,
        }),
        new MAStringDescription({
            name: 'fio',
            label: 'FIO',
            required: true,
        }),
        new MADateDescription({
            name: 'dateofbirth',
            label: 'DateOfBirth',
            required: true,
        }),
        new MAStringDescription({
            name: 'gender',
            label: 'Gender',
            required: true,
        }),
        new MAToOneRelationDescription({
            name: 'organization',
            label: 'Organization',
            required: true,
            reference: organizationDesc,
        }),
        new MADateDescription({
            name: 'dateofadmission',
            label: 'DateOfAdmission',
            required: true,
        }),
        new MADateDescription({
            name: 'dateofdeparture',
            label: 'DateOfDeparture',
            required: false,
        }),
        new MAToManyRelationDescription({
            name: 'setofaccounts',
            label: 'SetOfAccounts',
            required: true,
            reference: accountDesc,
        }),
        new MASingleOptionDescription({
            name: 'plan',
            label: 'Subscription Plan',
            required: false,
            //options: SubscriptionPlan.entries,
            reference: subscriptionPlanDesc,
        })
      ]
    );

    accountDesc.name = 'Account';
    accountDesc.label = 'Account model';
    accountDesc.setChildren(
      [
        new MAStringDescription({
            name: 'login',
            label: 'Login',
            required: true,
            isPrimaryKey: true,
        }),
        //#!TODO Change to MAPasswordDescription when it is implemented
        new MAStringDescription({
            name: 'password',
            label: 'Password',
            required: true,
        }),
        //# !TODO Change to MAPasswordDescription when it is implemented
        new MAStringDescription({
            name: 'ntlm',
            label: 'NTLM',
        }),
        new MADateAndTimeDescription({
            name: 'reg_timestamp',
            label: 'Timestamp Of Registration',
            required: true,
        }),
        new MAIntDescription({
            name: 'days',
            label: 'Days valid',
            required: true,
        }),
        new MAToOneRelationDescription({
            name: 'port',
            label: 'Port',
            required: true,
            reference: portDesc,
        }),
      ]
    );

    organizationDesc.name = 'Organization';
    organizationDesc.label = 'Organization model';
    organizationDesc.setChildren(
      [
        new MAStringDescription({
            name: 'name',
            label: 'Name',
            required: true,
            isPrimaryKey: true,
        }),
        new MAStringDescription({
            name: 'address',
            label: 'Address',
            required: true,
        }),
        new MABooleanDescription({
            name: 'active',
            label: 'Active',
            required: true,
        }),
        new MAToManyRelationDescription({
            name: 'listusers',
            label: 'List of Users',
            required: true,
            reference: userDesc,
        }),
        new MAToManyRelationDescription({
            name: 'listcomp',
            label: 'List of Computers',
            required: true,
            reference: hostDesc,
        }),
      ]
    );

    subscriptionPlanDesc.name = 'SubscriptionPlan';
    subscriptionPlanDesc.label = 'Subscription Plan model';
    subscriptionPlanDesc.setChildren(
      [
        new MAStringDescription({
            name: 'name',
            label: 'Name',
            required: true,
            isPrimaryKey: true,
        }),
        new MAIntDescription({
            name: 'price',
            label: 'Price (per month)',
            required: true,
        }),
        new MAStringDescription({
            name: 'description',
            label: 'Description of the plan features',
            required: false,
        }),
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
