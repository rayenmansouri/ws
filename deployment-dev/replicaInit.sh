#!/bin/bash
docker exec deployment-mongo1 mongosh --port 20201 --eval "rs.initiate({
 _id: \"myReplicaSet\",
 members: [
   {_id: 0, host: \"deployment-mongo1:20201\" , priority : 10},
   {_id: 1, host: \"deployment-mongo2:20202\" , priority : 5},
   {_id: 2, host: \"deployment-mongo3:20203\", priority : 1}
 ]
})"