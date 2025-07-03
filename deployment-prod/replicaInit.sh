#!/bin/bash
docker exec mongo1 mongosh  --eval "rs.initiate({
 _id: \"myReplicaSet\",
 members: [
   {_id: 0, host: \"mongo1:27017\" , priority : 10},
   {_id: 1, host: \"mongo2:27017\" , priority : 5},
   {_id: 2, host: \"mongo3:27017\", priority : 1}
 ]
})"