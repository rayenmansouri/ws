#!/bin/bash
set -e

docker build -t backend-production -f ../src/apps/main/Dockerfile ./.. 
docker build -t smart-calendar-production --build-arg environment=production -f ../src/apps/smart-calendar/Dockerfile ./..
docker build -t backup-service-production --build-arg environment=production -f ../src/apps/backup/Dockerfile ./..
