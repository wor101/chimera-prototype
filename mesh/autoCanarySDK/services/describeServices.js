const { ECSClient, DescribeServicesCommand } = require("@aws-sdk/client-ecs")

const describeServices = async (clientConfig, cluster, services) => {
  const client = new ECSClient(clientConfig);
  const input = {
    cluster,
    services
  }

  const command = new DescribeServicesCommand(input);

  try {
    const response = await client.send(command);
    console.log(`Success describing services ${services}`)
    console.log(response)
    return response
  } catch(err) {
    console.log(`Error describing services ${services.toString()}`)
    console.log(err)
    return err
  }
  

}

const cluster = 'app'
const services = ['serviceAv5']

describeServices( { region: 'us-west-2' }, cluster, services)
  .then(response => {
    const service = response.services[0]
    //console.log(response.services[0].deploymentConfiguration)
    //console.log(service.networkConfiguration)
    service.serviceRegistries.forEach(reg => console.log(reg))
  })



module.exports = describeServices