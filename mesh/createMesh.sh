#!/bin/bash/

# create AWS App mesh named 'dragon'
aws cloudformation deploy \
  --template-file serviceMesh.yaml \
  --stack-name dragon


# create virtual gateway named 'dragon-gateway'
# aws cloudformation deploy \
#   --template-file virtualGateway.yaml \
#   --stack-name dragon