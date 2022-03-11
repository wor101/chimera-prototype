const { AppMeshClient, CreateVirtualNodeCommand, AwsCloudMapInstanceAttribute, ServiceDiscovery } = require("@aws-sdk/client-app-mesh")
const createServiceName = require('./services/createServiceName')
const createVirtualNode = require('./services/createVirtualNode')
const createService = require('./services/createService')
const registerTaskDefinition = require('./services/registerTaskDefinition')

// required parameters
const clientConfiguration = { region: "us-west-2" }
const newServiceName = 'serviceav3'
const newServiceNamespaceID = 'ns-duw5hzhk5cfw45c5'
const clusterName = 'app'
const securityGroups = ['sg-cff186c7']
const subnets = ['subnet-7273ec0a']

const taskName = 'APP-serviceAv3'
const containerName = 'serviceAv3'
const imageURL = '822180497458.dkr.ecr.us-west-2.amazonaws.com/serviceav3:latest'
const containerPortNumber = 8080
const executionIAMRole = 'arn:aws:iam::822180497458:role/DEMO-ecs-cluster-TaskExecutionIamRole-LT6CS9UJ5IOX' 
const taskIAMRole = 'arn:aws:iam::822180497458:role/DEMO-ecs-cluster-TaskIamRole-5932OTKY837Z'

//createServiceName(clientConfiguration, newServiceName, newServiceNamespaceID)
//createVirtualNode(clientConfiguration, newServiceName)


//must create ECR register before TaskDefintion
//must create TaskDefinition before service
//registerTaskDefinition(clientConfiguration, taskName, containerName, imageURL, containerPortNumber, executionIAMRole, taskIAMRole)

createService(clientConfiguration, clusterName, securityGroups, subnets, newServiceName, taskName)

