const { ECSClient, CreateServiceCommand } = require("@aws-sdk/client-ecs")

const createService = async (clientConfig, clusterName, securityGroups, subnets, newServiceName, taskName) => {
  const client = new ECSClient(clientConfig)

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