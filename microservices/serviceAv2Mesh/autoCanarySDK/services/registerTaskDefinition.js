const { ECSClient, RegisterTaskDefinitionCommand } = require("@aws-sdk/client-ecs")

const registerTaskDefinition = async (clientConfig, taskName, containerName, imageURL, containerPortNumber, executionIAMRole, taskIAMRole) => {
  const client = new ECSClient(clientConfig);

  const registerTaskDefinitionInput = {
    family: taskName,
    containerDefinitions: [
      {
        name: containerName,
        dependsOn: [
          {
            condition: 'START',
            containerName: 'envoy'
          }
        ],
        image: imageURL,
        portMappings: [
          {
            containerPort: containerPortNumber,
            protocol: 'tcp'
          }
        ]
      },
      {
        portMappings: [],
        environment: [
          {
            name: "APPMESH_VIRTUAL_NODE_NAME",
            value: "mesh/apps/virtualNode/serviceAv2"
          }
        ],
        memory: 500,
        image: "840364872350.dkr.ecr.us-west-2.amazonaws.com/aws-appmesh-envoy:v1.21.1.0-prod",
        healthCheck: {
          retries: 3,
          command: [
            "CMD-SHELL",
            "curl -s http://localhost:9901/server_info | grep state | grep -q LIVE"
          ],
          timeout: 2,
          interval: 5,
          startPeriod: 10
        },
        essential: true,
        user: "1337",
        name: "envoy"
      }
    ],
    cpu: '256',
    memory: '512',
    executionRoleArn: executionIAMRole, // ARN
    taskRoleArn: taskIAMRole,
    networkMode: 'awsvpc',
    proxyConfiguration: {
      type: "APPMESH",
      containerName: "envoy",
      properties: [
        {
          name: "ProxyIngressPort",
          value: "15000"
        },
        {
          name: "AppPorts",
          value: `${containerPortNumber}`
        },
        {
          name: "EgressIgnoredIPs",
          value: "169.254.170.2,169.254.169.254"
        },
        {
          name: "IgnoredGID",
          value: ""
        },
        {
          name: "EgressIgnoredPorts",
          value: ""
        },
        {
          name: "IgnoredUID",
          value: "1337"
        },
        {
          name: "ProxyEgressPort",
          value: "15001"
        }
      ]
    },    
  }

  const registerTaskDefinitionCommand = new RegisterTaskDefinitionCommand(registerTaskDefinitionInput);

  try {
    const response = await client.send(registerTaskDefinitionCommand)
    console.log(`Success registering new Task Definition named ${taskName}`)
    console.log(response)
    return response
  } catch(err) {
    console.log(`ERROR registering new Task Definition named ${taskName}`)
    console.log(err)
    return err
  }
}

module.exports = registerTaskDefinition