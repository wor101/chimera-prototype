#!/bin/bash

aws cloudformation deploy \
  --template-file serviceAv2.yaml \
  --stack-name serviceAv2