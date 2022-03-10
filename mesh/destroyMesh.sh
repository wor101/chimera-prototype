#!/bin/bash

# destroy AWS App Mesh named 'dragon'
aws cloudformation delete-stack \
  --stack-name dragon

echo "deleted stack"