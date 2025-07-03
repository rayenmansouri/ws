#!/bin/bash
docker exec deployment-staging-mongo1 mongosh --port 20204 --eval "rs.initiate({
 _id: \"myReplicaSet\",
 members: [
   {_id: 0, host: \"deployment-staging-mongo1:20204\" , priority : 10},
   {_id: 1, host: \"deployment-staging-mongo2:20205\" , priority : 5},
   {_id: 2, host: \"deployment-staging-mongo3:20206\", priority : 1}
 ]
})"