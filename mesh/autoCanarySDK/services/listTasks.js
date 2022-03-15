const { ECSClient, ListTasksCommand } = require("@aws-sdk/client-ecs")

const listTasks = async (clientConfig, cluster, serviceName) => {
  const client = new ECSClient(clientConfig)
  const input = {
    cluster,
    serviceName
  }

  const command = new ListTasksCommand(input)

  try {
    const response = await client.send(command)
    console.log(`Success listing Tasks for service ${serviceName}`)
    console.log(response)
    return response
  } catch(err) {
    console.log(`ERROR listing Tasks for service ${serviceName}`)
    console.log(err)
    return err
  }
}

const clientConfig = { region: 'us-west-2' }
const cluster = 'app'
const serviceName = 'serviceAv5'

listTasks(clientConfig, cluster, serviceName)

module.exports = listTasks