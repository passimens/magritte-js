

import { MAReferencedDataHumanReadableSerializer, MAReferencedDataHumanReadableDeserializer } from './Magritte/visitors/MAReferencedDataWriterReader_visitors.js';
import { NetModelDescriptors } from './Magritte/model_for_tests/ModelDescriptor_test.js';
import { TestEnvironmentProvider } from './Magritte/model_for_tests/EnvironmentProvider_test.js';
import { PrintVisitor, printModel } from './test-printVisitor.mjs';


  const descriptionProvider = new NetModelDescriptors();
  const environmentProvider = new TestEnvironmentProvider();
  const hostDescriptor = descriptionProvider.factByName('Host');
  const portDescriptor = descriptionProvider.factByName('Port');

  const host = environmentProvider.hosts()[0];

  const port = environmentProvider.ports()[0];

  const ipDescriptor = hostDescriptor.children.find((element) => element.name == 'address');
  const portsDescriptor = hostDescriptor.children.find((element) => element.name == 'ports');

  const deserializer = new MAReferencedDataHumanReadableDeserializer();
  const serializer = new MAReferencedDataHumanReadableSerializer();

  //host.ports = [host.ports[0]]

  //dumpVisitor = MADescriptorWalker.MADumpModelWalkerVisitor()
  //dumpVisitor.dumpModel(host, hostDescriptor)
  //dumpVisitor._dbg_print()

  const serialized_str_h = serializer.serializeHumanReadable(host, hostDescriptor);
  console.log(serialized_str_h);

  const serialized_str_p = serializer.serializeHumanReadable(port, portDescriptor);
  console.log(serialized_str_p);

  const serialized_str_ip = serializer.serializeHumanReadable(host.address, ipDescriptor);
  console.log(serialized_str_ip);

  const serialized_str_ports = serializer.serializeHumanReadable(host.ports, portsDescriptor);
  console.log(serialized_str_ports);

  const dto_h = deserializer.deserializeHumanReadable(serialized_str_h, hostDescriptor);
  console.log(dto_h);
  printModel(hostDescriptor, dto_h);
  for (const port of dto_h.ports)
  {
    printModel(portDescriptor, port);
  }

  const dto_p = deserializer.deserializeHumanReadable(serialized_str_p, portDescriptor);
  console.log(dto_p);
  printModel(portDescriptor, dto_p);

  const dto_ip = deserializer.deserializeHumanReadable(serialized_str_ip, ipDescriptor);
  console.log(dto_ip);

  const dto_ports = deserializer.deserializeHumanReadable(serialized_str_ports, portsDescriptor);
  console.log(dto_ports);
  console.log(host.ports.length, dto_ports.length);
