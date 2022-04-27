# Chimera Prototype / Spike
[Chimera](https://chimera-deploy.dev) is a an open-source tool for performing automated canary deployments of containerized microservices. It allows software development teams to safely and easily deploy new versions of their microservices by taking advantage of the features provided by their existing service mesh.

## Built With
- JavaScript
- AWS SDK utilizing:
  - ECR
  - ECS
  - App Mesh
  - Fargate

## Notes
- See `autoCanarySDK` directory for original spike into automating canary deployments to AWS App Mesh hosted on Fargate
- See `service mesh` for files related to setting up an AWS App Mesh service mesh
- See `microservices` for various microservices used for initial testing and prototyping of Chimera
