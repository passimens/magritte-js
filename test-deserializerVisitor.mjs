

import { MAReferencedDataHumanReadableDeserializer } from './Magritte/visitors/MAReferencedDataWriterReader_visitors.js';
import { NetModelDescriptors } from './Magritte/model_for_tests/ModelDescriptor_test.js';
import { TestEnvironmentProvider } from './Magritte/model_for_tests/EnvironmentProvider_test.js';


const hostModel = {"_key":0,"address":"192.168.0.1","last_updated":"2024-03-04T15:09:57.582255","ports":[{"_key":4,"last_updated":"2024-03-04T15:09:57.582266","ip4_addr":0,"port_num":80,"service":{"_key":9,"name":"https","standard_port":null,"applicable_weaknesses":[{"_key":13,"name":"acac","weakness_type":"Misconfiguration","details":"Access-Control-Allow-Credentials set to true","cve_id":null,"vendor_id":null,"more_info":null}]},"weaknesses":[13]},{"_key":22,"last_updated":"2024-03-04T15:09:57.582288","ip4_addr":0,"port_num":22,"service":{"_key":27,"name":"ssh","standard_port":null,"applicable_weaknesses":[{"_key":31,"name":"notimeout","weakness_type":"Misconfiguration","details":"immediate password re-request","cve_id":null,"vendor_id":null,"more_info":null},{"_key":38,"name":"root","weakness_type":"Misconfiguration","details":"login as root possible","cve_id":null,"vendor_id":null,"more_info":null}]},"weaknesses":[38]}]}


function deserializeHost()
{
  const descriptionProvider = new NetModelDescriptors();
  const hostDescription = descriptionProvider.factByName('Host');
  const deserializer = new MAReferencedDataHumanReadableDeserializer();
  const hostSerialized = JSON.stringify(hostModel);
  const host = deserializer.deserializeHumanReadable(hostSerialized, hostDescription);
  console.log(host);
  throw TypeError();
}

deserializeHost();
