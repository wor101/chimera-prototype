const { ECSClient, DescribeTaskSetsCommand } = require("@aws-sdk/client-ecs")

const describeTaskSets = async (clientConfig, cluster, service) => {
  const client = new ECSClient(clientConfig);
  const input = {
    cluster,
    service
  }

  const command = new DescribeTaskSetsCommand(input);

  try {
    const response = await client.send(command)
    console.log(`Success describing Task Sets for ${service}`)
    console.log(response)
    return response
  } catch(err) {
    console.log(`ERROR describing Task Sets for ${service}`)
    console.log(err)
    return err
  }  
}

const cluster = 'app'
const service = 'serviceAv5'

describeTaskSets({region: 'us-west-2'}, cluster, service)

module.exports = describeTaskSets
