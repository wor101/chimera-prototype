const { AppMeshClient, CreateVirtualNodeCommand, AwsCloudMapInstanceAttribute, ServiceDiscovery } = require("@aws-sdk/client-app-mesh")
const createServiceName = require('./services/createServiceName')
const createVirtualNode = require('./services/createVirtualNode')


// required parameters
const clientConfiguration = { region: "us-west-2" }
const newServiceName = 'serviceav3'
// const newServiceNamespaceID = 'ns-duw5hzhk5cfw45c5'

//createServiceName(clientConfiguration, newServiceName, newServiceNamespaceID)
createVirtualNode(clientConfiguration, newServiceName)

// create clients for issuing commmands
//const appMeshClient = new AppMeshClient(clientConfiguration)

// create a  Virtual Node for new version of service
// CreateVirtualNodeCommand

//const virtualNodeServiceDiscoveryObject = new ServiceDiscovery(clientConfiguration)

// const virtualNodeInput = {
//   meshName: 'apps',
//   spec: {
//     // backendDefaults: {},
//     // backends: [],
//     listeners: [ 
//       {
//         portMapping: {
//           port: 8080,
//           protocol: 'http'
//         }
//       }
//     ],
//     serviceDiscovery: 
//       { dns: 
//         {
//           hostname: 'serviceav3.apps.local',
//           name: 'serviceav3'
//         }
//     },
//   },
//   virtualNodeName: 'serviceAv3'
// }

// const createVirtualNode = new CreateVirtualNodeCommand(virtualNodeInput)

// appMeshClient.send(createVirtualNode)

