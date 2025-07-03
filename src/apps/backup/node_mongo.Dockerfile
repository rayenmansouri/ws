FROM ubuntu:20.04

ARG TARGETPLATFORM

#set value of arch based on targetplatform
RUN if [ "$TARGETPLATFORM" = "linux/arm64" ]; then \
          echo arm64 > /etc/architecture; \
    elif [ "$TARGETPLATFORM" = "linux/amd64" ]; then \
          echo x86_64 > /etc/architecture; \
    fi

RUN apt-get update \
    && apt-get install -y curl

#installing node
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

#installing mongo tools
RUN ARCHITECTURE=$(cat /etc/architecture) \
    && curl -s -o mongo-tools.deb https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2004-$ARCHITECTURE-100.9.4.deb \
    && apt-get install -y ./mongo-tools.deb

#clean up
RUN apt-get autoremove -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

#docker buildx build --push --platform linux/amd64,linux/arm64 -f ./node_mongo.Dockerfile -t ayoubchrigui01/node_mongo-tools:1.0.0 .