const { AppMeshClient, CreateVirtualNodeCommand } = require("@aws-sdk/client-app-mesh")

const createVirtualNode = async (clientConfiguration, meshName, virtualNodeName) => {
  const appMeshClient = new AppMeshClient(clientConfiguration)

  const virtualNodeInput = {
    meshName: meshName,
    spec: {
      // backendDefaults: {},
      // backends: [],
      listeners: [ 
        {
          portMapping: {
            port: 8080,
            protocol: 'http'
          }
        }
      ],
      serviceDiscovery: 
        { dns: 
          {
            hostname: `${virtualNodeName}.apps.local`,
            name: virtualNodeName
          }
      },
    },
    virtualNodeName: 'serviceAv3'
  }
  
  const createVirtualNode = new CreateVirtualNodeCommand(virtualNodeInput)
  
  try {
    const response = await appMeshClient.send(createVirtualNode)
    console.log(`Success creating Virtual Node named ${virtualNodeName}`)
    console.log(response)
    return response
  } catch(err) {
    console.log(`ERROR creating Virtual Node named ${virtualNodeName}`)
    console.log(err)
    return err
  }
}

module.exports = createVirtualNode