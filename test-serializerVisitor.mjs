

import { MAReferencedDataHumanReadableSerializer } from './Magritte/visitors/MAReferencedDataWriterReader_visitors.js';
import { NetModelDescriptors } from './Magritte/model_for_tests/ModelDescriptor_test.js';
import { TestEnvironmentProvider } from './Magritte/model_for_tests/EnvironmentProvider_test.js';


function serializeHost()
{
  const descriptionProvider = new NetModelDescriptors();
  const environmentProvider = new TestEnvironmentProvider();
  const hostDescription = descriptionProvider.factByName('Host');
  const serializer = new MAReferencedDataHumanReadableSerializer();
  const hostModel = environmentProvider.hosts()[0];
  const hostSerialized = serializer.serializeHumanReadable(hostModel, hostDescription);
  console.log(hostSerialized);
  throw TypeError();
}

serializeHost();
