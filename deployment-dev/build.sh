#!/bin/bash
set -e

docker build -t backend-development -f ../src/apps/main/Dockerfile ./.. 
docker build -t smart-calendar-development --build-arg environment=development -f ../src/apps/smart-calendar/Dockerfile ./..
docker build -t backup-service-development --build-arg environment=development -f ../src/apps/backup/Dockerfile ./..
