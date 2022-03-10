# Implementing Canary with SDK

## Required Packages ##
- @aws-sdk/client-servicediscovery
- @aws-sdk/client-ecs
- @aws-sdk/client-ecr and/or @aws-sdk/client-ecr-public
- @aws-sdk/client-app-mesh

# Parameters Needed
- user info
- user aws region
- user ECR image
- AWS Envoy image
- user provided service name
- user provided task definition name
- user provided app mesh name


# steps to automate
1. upload new version image to ECR
2. Create virtual node for new version



3. Create Service Discovery Entry for ECS Service of new version (we have yet to actually create)
4. Create new Service
5. Create task definition for service
6. Update service Route of corresponding Virtual Router with new virtual node targets and weights
  - can do via AWS consol or....
  - via CLI with a JSON file (see updateRoute.json)
    aws appmesh update-route --cli-input-json file://updateRoute.json
7. Test canary deployement 
    for x in {1..50}; do curl http://35.86.102.245:8000/gettime/ab; echo ''; done
8. Gradually shift weights to new node target in the Route until at 100%
9. Delete virtual node for old version of service
10. Delete old version of ECS service
