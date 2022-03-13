const { ECSClient, UpdateServiceCommand } = require("@aws-sdk/client-ecs")

const updateService = async (clientConfig, cluster, desiredCount, service) => {
  const client = new ECSClient(clientConfig);
  const updateServiceCommandInput = {
    cluster,
    desiredCount,
    service,
  }
  const command = new UpdateServiceCommand(updateServiceCommandInput);
  
  try {
    const response = await client.send(command)
    console.log(`Success updating service named ${service}`)
    console.log(response)
    return response
  } catch(err) {
    console.log(`ERROR updating service named ${service}`)
    console.log(err)
    return err
  }
}

const cluster = 'app'
const desiredCount = 0
const service = 'servicea'

updateService({region: 'us-west-2'}, cluster, desiredCount, service)

module.exports = updateService