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
4. Create task definition for service (task definitions are a required field when creating a new service)
5. Create new Service
6. Update service Route of corresponding Virtual Router with new virtual node targets and weights
  - can do via AWS consol or....
  - via CLI with a JSON file (see updateRoute.json)
    aws appmesh update-route --cli-input-json file://updateRoute.json
7. Test canary deployement 
    for x in {1..50}; do curl http://35.86.102.245:8000/gettime/ab; echo ''; done

8. Gradually shift weights to new node target in the Route until at 100% NOT IMPLEMENTED
9. Delete virtual node for old version of service
10. MUST SCALE DOWN running Service tasks to 0 before you can delete the servcie.
    - stopTask.js will stop the task but it auto-restarts
    - updateService.js can be used to set 'desiredCount' to 0
      - must wait for task instance to spin down
      - maybe get task ID and then use stopTask.js to ensure it has stopped before attempting to delete service?
11. Delete old version of ECS service 
  - deleting ECS 'servicea' broke communication between 'getTime/ab' and servicea.apps.local, why?????
    - traffic through the virtual gateway direct to servicea still functions and returns data for serviceAv3
    - 'getTime/ab'says "getaddrinfo ENOTFOUND servicea.apps.local"
    - why is north/south traffic through the virtual gateway unaffected but traffic from another microservice affected?
    - is the east/west traffic circumventing the virtual service and virtual router to go direct to the other microservice? 
    - REGARDING ABOVE QUESTIONS:
      - must make sure service discovery name remains the same (i.e. serviceAv3 should still be given service discovery name of servicea so it can be found at servicea.apps.local)

12. Delete task definition of old version
13. Delete old version of service name registry from Cloud Map
