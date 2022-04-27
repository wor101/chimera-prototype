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
    service.deployments.forEach(dep => console.log(dep))
    service.events.forEach(event => console.log(event)) 

    // events has an array of objects. If the service is successfully started, the last object should be the below. It's message key has a string value which contains the task ID
    /*
      {
        createdAt: 2022-03-14T16:16:56.402Z,
        id: 'f473ca29-0a13-4327-860b-af8cf79b3e95',
        message: '(service serviceAv5) has started 1 tasks: (task 671b6b5d8b354f8fb801822baec81ea9).'
      }
    */
  })



module.exports = describeServices