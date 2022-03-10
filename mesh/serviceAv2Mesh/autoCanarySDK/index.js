const { AppMeshClient, CreateVirtualNodeCommand } = require("@aws-sdk/client-app-mesh")
const { ServiceDiscoveryClient,CreateServiceCommand } = require("@aws-sdk/client-servicediscovery")

// parameters to inpu
const clientConfiguration = { region: "us-west-2" }
const newServiceName = 'serviceav3'
const newServiceNamespaceID = 'ns-duw5hzhk5cfw45c5'

// create clients for issuing commmands

const appMeshClient = new AppMeshClient(clientConfiguration)
const serviceDiscoveryClient = new ServiceDiscoveryClient(clientConfiguration)

// Create Service Discovery Entry for ECS Service of new version (we have yet to actually create)
const createServiceInput = {
  Name: newServiceName,
  NamespaceId: newServiceNamespaceID
}
const createServiceCommand = new CreateServiceCommand(createServiceInput)
serviceDiscoveryClient
  .send(createServiceCommand)
  .then(res => {
    console.log(`New Service Discovery named ${newServiceName} created`)
    console.log(res)
  })
  .catch(err => {
    console.log(`ERROR creating New Service Discovery named ${newServiceName}`)
    console.log(err)
  })

// create a  Virtual Node for new version of service
// CreateVirtualNodeCommand
/*
const virtualNodeInput = {
  meshName: 'string',
  spec: {
    // backendDefaults: {},
    // backends: [],
    listeners: [ 
      {
        portMapping: {
          port: 8080,
          protocol: 'HTTP'
        }
      }
    ],
    serviceDiscovery: {

    }
  },
  virtualNodeName: 'string'
}

const createVirtualNode = new CreateVirtualNodeCommand(virtualNodeInput)
*/


