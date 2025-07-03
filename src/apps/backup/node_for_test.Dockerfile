FROM ubuntu:20.04

RUN apt-get update \
    && apt-get install -y curl libcurl4

#installing node
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

#clean up
RUN apt-get autoremove -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

#docker buildx build --push --platform linux/amd64,linux/arm64 -f ./node_for_test.Dockerfile -t ayoubchrigui01/node_for_test:1.0.0 .