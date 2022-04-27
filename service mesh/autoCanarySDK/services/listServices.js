const { ECSClient, ListServicesCommand } = require("@aws-sdk/client-ecs")

const listServices = async (clientConfig, cluster) => {
  const client = new ECSClient(clientConfig)
  const input = {
    cluster
  }

  const command = new ListServicesCommand(input)
  try {
    const response = await client.send(command)
    console.log(`Success listing services for cluster ${cluster}`)
    console.log(response)
    return response
  } catch(err) {
    console.log(`ERROR listing services for cluster ${cluster}`)
    console.log(err)
    return err
  }
}

const cluster = 'app'
listServices({region: 'us-west-2'}, cluster)


module.exports = listServices