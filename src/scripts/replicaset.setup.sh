#!/bin/bash
# before the execusion of this script add execusion permission to this file by executing this command : chmod +x replicaSet.sh
# Create directories for MongoDB data
mkdir -p $HOME/mongo/data/db01
mkdir -p $HOME/mongo/data/db02
mkdir -p $HOME/mongo/data/db03

# Start MongoDB instances with replica set configuration
mongod --replSet dbrs --port 27021 --dbpath $HOME/mongo/data/db01 &
mongod --replSet dbrs --port 27022 --dbpath $HOME/mongo/data/db02 &
mongod --replSet dbrs --port 27023 --dbpath $HOME/mongo/data/db03

# Store the process IDs of the mongod instances in an array
mongod_pids=($(pgrep mongod))
# Wait for the MongoDB instances to start up
#Stop the MongoDB instances before starting the new instances
for pid in "${mongod_pids[@]}"; do
    sudo kill "$pid"
done
sleep 5

# Connect to primary instance and initiate replica set configuration
mongosh --port 27021 <<EOF
rsconf = { _id: "dbrs", members: [ { _id: 0, host: "127.0.0.1:27021", priority: 3 }, { _id: 1, host: "127.0.0.1:27022", priority: 1 }, { _id: 2, host: "127.0.0.1:27023", priority: 2 } ] };
rs.initiate(rsconf);
EOF
