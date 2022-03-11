const { ECSClient, CreateServiceCommand } = require("@aws-sdk/client-ecs")
const getServiceFromCloudMap = require('./getService')

const createService = async (clientConfig, clusterName, securityGroups, subnets, newServiceName, taskName, containerName, containerPortNumber, registryArn) => {
  const client = new ECSClient(clientConfig)
  const serviceArn = await getService()

  const createServiceInput = {
    cluster: clusterName,
    desiredCount: 1,
    launchType: "FARGATE",
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: "ENABLED",
        securityGroups: securityGroups, // string[]
        subnets: subnets, // string[]
      }
    },
    serviceName: newServiceName,
    serviceRegistries: [
      {
        containerName: containerName,
        registryArn: 'arn:aws:servicediscovery:us-west-2:822180497458:service/srv-ux3kh4hj32ybmyfb' // 'arn:aws:servicediscovery:us-west-2:822180497458:namespace/ns-duw5hzhk5cfw45c5',
      }
    ],
    taskDefinition: taskName
  }

  const command = new CreateServiceCommand(createServiceInput)
  try {
    const response = await client.send(command)
    console.log(`Success creating new Service named ${newServiceName}`)
    console.log(response)
    return response
  } catch(err){
    console.log(`ERROR creating new Service named ${newServiceName}`)
    console.log(err)
    return err
  }  
}

module.exports = createService