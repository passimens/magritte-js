

import { MAReferencedDataHumanReadableSerializer, MAReferencedDataHumanReadableDeserializer } from './Magritte/visitors/MAReferencedDataWriterReader_visitors.js';
import { NetModelDescriptors } from './Magritte/model_for_tests/ModelDescriptor_test.js';
import { TestEnvironmentProvider } from './Magritte/model_for_tests/EnvironmentProvider_test.js';
import { MADateAndTimeDescription } from './Magritte/descriptions/MADateAndTimeDescription.js';
import { MADateDescription } from './Magritte/descriptions/MADateDescription.js';
import { PrintVisitor, printModel } from './test-printVisitor.mjs';


  const descriptionProvider = new NetModelDescriptors();
  const environmentProvider = new TestEnvironmentProvider();
  const hostDescriptor = descriptionProvider.factByName('Host');
  const portDescriptor = descriptionProvider.factByName('Port');
  const accountDescriptor = descriptionProvider.factByName('Account');
  const userDescriptor = descriptionProvider.factByName('User');

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



  // Tests of MADateAndTimeDescription and MADateDescription

  const test_user_dump = {"-x-magritte-key":0,"-x-magritte-class":"User","regnum":"user14","fio":"Ivanov, Vladimir, Ivanovich","dateofbirth":"2003-06-01","gender":"man","organization":{"-x-magritte-key":6,"-x-magritte-class":"Organization","name":"organization5889","address":"address1050","active":true,"listusers":[{"-x-magritte-key":11,"-x-magritte-class":"User","regnum":"user76","fio":"Ivanov, Danila, Smirnovich","dateofbirth":"1975-02-09","gender":"woman","organization":6,"dateofadmission":"2021-08-25","dateofdeparture":"2025-09-13","setofaccounts":[{"-x-magritte-key":20,"-x-magritte-class":"Account","login":"user56","password":"877080","ntlm":"8dafac42e5db1ece7db3bbeba4c6554e","reg_timestamp":"2012-11-16T17:05:35+00:00","days":26,"port":{"-x-magritte-key":27,"-x-magritte-class":"Port","numofport":993,"host":{"-x-magritte-key":30,"-x-magritte-class":"Host","ip":"33.233.111.193","ports":[27,{"-x-magritte-key":33,"-x-magritte-class":"Port","numofport":80,"host":30,"status":"open"},{"-x-magritte-key":38,"-x-magritte-class":"Port","numofport":443,"host":30,"status":"filtered"},{"-x-magritte-key":43,"-x-magritte-class":"Port","numofport":47127,"host":30,"status":"closed"},{"-x-magritte-key":48,"-x-magritte-class":"Port","numofport":25,"host":30,"status":"filtered"},{"-x-magritte-key":53,"-x-magritte-class":"Port","numofport":36577,"host":30,"status":"filtered"},{"-x-magritte-key":58,"-x-magritte-class":"Port","numofport":40804,"host":30,"status":"closed"},{"-x-magritte-key":63,"-x-magritte-class":"Port","numofport":30688,"host":30,"status":"filtered"},{"-x-magritte-key":68,"-x-magritte-class":"Port","numofport":20,"host":30,"status":"open"},{"-x-magritte-key":73,"-x-magritte-class":"Port","numofport":995,"host":30,"status":"filtered"},{"-x-magritte-key":78,"-x-magritte-class":"Port","numofport":50533,"host":30,"status":"open"},{"-x-magritte-key":83,"-x-magritte-class":"Port","numofport":110,"host":30,"status":"open"}]},"status":"filtered"}},{"-x-magritte-key":90,"-x-magritte-class":"Account","login":"user84","password":"526942","ntlm":"b917411ef96a0fe7e923d1b81c2c28c1","reg_timestamp":"2013-12-09T12:03:22+00:00","days":391,"port":33},{"-x-magritte-key":97,"-x-magritte-class":"Account","login":"user59","password":"650178","ntlm":"40d34c59eafc750699614e93d5095335","reg_timestamp":"2015-02-23T19:34:40+00:00","days":638,"port":38}],"plan":{"-x-magritte-key":105,"-x-magritte-class":"SubscriptionPlan","name":"Community","price":0,"description":"Free plan for non-commercial use"}},0,{"-x-magritte-key":109,"-x-magritte-class":"User","regnum":"user94","fio":"Petrov, Vladimir, Smirnovich","dateofbirth":"2001-07-11","gender":"woman","organization":6,"dateofadmission":"2019-07-21","dateofdeparture":"2025-01-15","setofaccounts":[20,90,97],"plan":105}],"listcomp":[30,{"-x-magritte-key":120,"-x-magritte-class":"Host","ip":"106.40.155.95","ports":[{"-x-magritte-key":123,"-x-magritte-class":"Port","numofport":22,"host":120,"status":"open"},{"-x-magritte-key":128,"-x-magritte-class":"Port","numofport":80,"host":120,"status":"open"},{"-x-magritte-key":133,"-x-magritte-class":"Port","numofport":7862,"host":120,"status":"closed"},{"-x-magritte-key":138,"-x-magritte-class":"Port","numofport":465,"host":120,"status":"filtered"},{"-x-magritte-key":143,"-x-magritte-class":"Port","numofport":587,"host":120,"status":"filtered"},{"-x-magritte-key":148,"-x-magritte-class":"Port","numofport":25,"host":120,"status":"filtered"},{"-x-magritte-key":153,"-x-magritte-class":"Port","numofport":38398,"host":120,"status":"filtered"},{"-x-magritte-key":158,"-x-magritte-class":"Port","numofport":443,"host":120,"status":"filtered"},{"-x-magritte-key":163,"-x-magritte-class":"Port","numofport":25,"host":120,"status":"filtered"},{"-x-magritte-key":168,"-x-magritte-class":"Port","numofport":587,"host":120,"status":"filtered"},{"-x-magritte-key":173,"-x-magritte-class":"Port","numofport":465,"host":120,"status":"filtered"},{"-x-magritte-key":178,"-x-magritte-class":"Port","numofport":443,"host":120,"status":"filtered"}]},{"-x-magritte-key":183,"-x-magritte-class":"Host","ip":"81.13.83.175","ports":[{"-x-magritte-key":186,"-x-magritte-class":"Port","numofport":995,"host":183,"status":"filtered"},{"-x-magritte-key":191,"-x-magritte-class":"Port","numofport":143,"host":183,"status":"filtered"},{"-x-magritte-key":196,"-x-magritte-class":"Port","numofport":995,"host":183,"status":"filtered"},{"-x-magritte-key":201,"-x-magritte-class":"Port","numofport":110,"host":183,"status":"open"},{"-x-magritte-key":206,"-x-magritte-class":"Port","numofport":33989,"host":183,"status":"closed"},{"-x-magritte-key":211,"-x-magritte-class":"Port","numofport":11165,"host":183,"status":"open"},{"-x-magritte-key":216,"-x-magritte-class":"Port","numofport":443,"host":183,"status":"filtered"},{"-x-magritte-key":221,"-x-magritte-class":"Port","numofport":56780,"host":183,"status":"open"},{"-x-magritte-key":226,"-x-magritte-class":"Port","numofport":25,"host":183,"status":"filtered"},{"-x-magritte-key":231,"-x-magritte-class":"Port","numofport":110,"host":183,"status":"open"},{"-x-magritte-key":236,"-x-magritte-class":"Port","numofport":22,"host":183,"status":"open"},{"-x-magritte-key":241,"-x-magritte-class":"Port","numofport":995,"host":183,"status":"filtered"}]}]},"dateofadmission":"2021-11-03","dateofdeparture":"2023-02-03","setofaccounts":[20,90,97],"plan":{"-x-magritte-key":250,"-x-magritte-class":"SubscriptionPlan","name":"Enterprise","price":40,"description":"Enterprise plan for most demanding users"}}
  const test_datetime_dump = test_user_dump.organization.listusers[0].setofaccounts[0].reg_timestamp;
  const test_date_dump = test_user_dump.dateofbirth;

  const dto_test_datetime = deserializer.deserializeHumanReadable(JSON.stringify(test_datetime_dump), new MADateAndTimeDescription());
  const serialized_str_test_datetime = serializer.serializeHumanReadable(dto_test_datetime, new MADateAndTimeDescription());
  console.log(test_datetime_dump, dto_test_datetime, serialized_str_test_datetime);

  const dto_test_date = deserializer.deserializeHumanReadable(JSON.stringify(test_date_dump), new MADateDescription());
  const serialized_str_test_date = serializer.serializeHumanReadable(dto_test_date, new MADateDescription());
  console.log(test_date_dump, dto_test_date, serialized_str_test_date);



  // Communication with MAModelFastapiAdapter_example.py
  //fetch('http://localhost:8000/user/1').then(response => {
  //  return response.text();
  //}).then(test_user_serialized => {
  //  const dto_user = deserializer.deserializeHumanReadable(test_user_serialized, userDescriptor);
  //  console.log(dto_user.dateofbirth);
  //});


  // Try to receive descriptors from backend
  
  //const serialized_hostDescriptor = {"-x-magritte-key":0,"-x-magritte-class":"MAContainer","name":"Host","label":"Host model","group":null,"comment":null,"priority":0,"undefined":"","undefinedValue":null,"readOnly":false,"visible":true,"required":false,"children":[{"-x-magritte-key":15,"-x-magritte-class":"MAStringDescription","name":"ip","label":"IP Address","group":null,"comment":null,"priority":0,"default":null,"undefined":"","undefinedValue":null,"readOnly":false,"visible":true,"required":true},{"-x-magritte-key":30,"-x-magritte-class":"MAToManyRelationDescription","name":"ports","label":"Ports","group":null,"comment":null,"priority":0,"default":null,"undefined":"","undefinedValue":null,"readOnly":false,"visible":true,"required":true}]};
  //const serialized_str_hostDescriptor = JSON.stringify(serialized_hostDescriptor);
  //const dto_hostDescriptor = deserializer.deserializeHumanReadable(serialized_str_hostDescriptor, undefined);
