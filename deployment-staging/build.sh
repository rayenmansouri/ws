#!/bin/bash
set -e

docker build -t backend-staging -f ../src/apps/main/Dockerfile ./.. 
docker build -t smart-calendar-staging --build-arg environment=staging -f ../src/apps/smart-calendar/Dockerfile ./..
docker build -t backup-service-staging --build-arg environment=staging -f ../src/apps/backup/Dockerfile ./..
