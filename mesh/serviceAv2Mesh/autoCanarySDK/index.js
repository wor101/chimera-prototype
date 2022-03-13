const { AppMeshClient, CreateVirtualNodeCommand, AwsCloudMapInstanceAttribute, ServiceDiscovery } = require("@aws-sdk/client-app-mesh")
const createServiceName = require('./services/createServiceName')
const createVirtualNode = require('./services/createVirtualNode')
const createService = require('./services/createService')
const registerTaskDefinition = require('./services/registerTaskDefinition')
const updateRoute = require('./services/updateRoute')
const testCanary = require('./services/testCanary')

// required parameters
const clientConfiguration = { region: "us-west-2" }
const newServiceName = 'serviceav3'
const newServiceNamespaceID = 'ns-duw5hzhk5cfw45c5'
const clusterName = 'app'
const clusterARN = 'arn:aws:ecs:us-west-2:822180497458:cluster/app'
const meshName = 'apps'
const routeName = 'servicea'
const originalNodeName = 'serviceAv2'
const originalServiceName = 'serviceAv2'
const originalNodeWeight = 0
const canaryNodeName = 'serviceAv3'
const canaryNodeWeight = 100
const routePathPrefix = '/'
const routerName = 'servicea'
const securityGroups = ['sg-cff186c7']
const subnets = ['subnet-7273ec0a']

const taskName = 'APP-serviceAv3'
const containerName = 'serviceAv3'
const imageURL = '822180497458.dkr.ecr.us-west-2.amazonaws.com/serviceav3:latest'
const containerPortNumber = 8080
const executionIAMRole = 'arn:aws:iam::822180497458:role/DEMO-ecs-cluster-TaskExecutionIamRole-LT6CS9UJ5IOX' 
const taskIAMRole = 'arn:aws:iam::822180497458:role/DEMO-ecs-cluster-TaskIamRole-5932OTKY837Z'
const registryArn = 'arn:aws:servicediscovery:us-west-2:822180497458:service/srv-ux3kh4hj32ybmyfb' // may need to retrieve from response of creating service name in cloud map or by using id with getService.js

const numberOfTests = 5
const testURL = 'http://35.86.102.245:8000/gettime/ab'
const tests = {
  matchDataStrings: ['serviceAv3 response data and serviceB response data', 'serviceAv2 response data and serviceB response data'],
  matchStatus: 200,
}

const desiredCount = 0


// createServiceName(clientConfiguration, newServiceName, newServiceNamespaceID)
// createVirtualNode(clientConfiguration, meshName, newServiceName)

// must create ECR register before TaskDefintion
// must create TaskDefinition before service
// registerTaskDefinition(clientConfiguration, taskName, containerName, imageURL, containerPortNumber, executionIAMRole, taskIAMRole)
// createService(clientConfiguration, clusterName, securityGroups, subnets, newServiceName, taskName, containerName, containerPortNumber, registryArn)
// updateRoute(clientConfiguration, meshName, routeName, originalNodeName, originalNodeWeight, canaryNodeName, canaryNodeWeight, routePathPrefix, routerName )
// testCanary(numberOfTests, testURL, tests)
// deleteVirtualNode = async (clientConfig, meshName, originalNodeName)
// updateService(clientConfiguration, clusterName, desiredCount, originalServiceName)
// deleteService(clientConfiguration, clusterARN, originalServiceName)