const { ECSClient, DescribeTasksCommand } = require("@aws-sdk/client-ecs")

const describeTasks = async (clientConfig, cluster, tasks) => {
  const client = new ECSClient(clientConfig);
  const input = {
    cluster,
    tasks
  }

  const command = new DescribeTasksCommand(input);
  
  try {
    const response = await client.send(command);
    console.log(`Success describing tasks ${tasks}`)
    console.log(response)
    return response
  } catch(err) {
    console.log(`ERROR describing tasks ${tasks}`)
    console.log(err)
    return err
  }
}

const cluster = 'app'
const tasks = ['671b6b5d8b354f8fb801822baec81ea9']  // this is the Task ID that we are trying to get
const taskArn = 'arn:aws:ecs:us-west-2:822180497458:task/app/671b6b5d8b354f8fb801822baec81ea9'


describeTasks({region: 'us-west-2'}, cluster, tasks)

module.exports = describeTasks