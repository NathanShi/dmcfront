#!/bin/bash

gulp clean
gulp build
cd /home/t/Desktop/gitDMC/dmcdeploy/azure/localUpdate/
./updateStackFrontFromLocalDev2.sh
