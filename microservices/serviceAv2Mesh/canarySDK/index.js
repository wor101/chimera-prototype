const { AppMeshClient, UpdateRouteCommand } = require("@aws-sdk/client-app-mesh");
const args = process.argv.slice(2).map(arg => parseInt(arg, 10))
console.log(args)

/*
Initiate client with configuration (e.g. credentials, region).
Initiate command with input parameters.
Call send operation on client with command object as input.
If you are using a custom http handler, you may call destroy() to close open connections.
*/

// a client can be shared by different commands.
const client = new AppMeshClient({ region: "us-west-2" });

// UpdateRouteCommandInput
const v1weight = args[0] || 1
const v2weight = args[1] || 1

const input = {
  meshName: 'apps',
  routeName: 'servicea',
  spec: {
    httpRoute: {
      action: {
        weightedTargets: [
          {
            virtualNode: 'serviceA',
            weight: v1weight,
          },
          {
            virtualNode: 'serviceAv2',
            weight: v2weight,
          },
        ],
      },
      match: {
        prefix: '/',
      }
    }
  },
  virtualRouterName: 'servicea'
}

// the updateRouteCommand
const command = new UpdateRouteCommand(input)

client
  .send(command)
  .then(res => {
    console.log('Success!')
    console.log(res.route.spec.httpRoute.action.weightedTargets)
  })
  .catch(err => {
    console.log('Oh no!')
    console.log(err)
  })

