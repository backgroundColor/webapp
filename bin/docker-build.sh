#!/bin/bash

echo ""
echo "in docker: $DOCKER"

npm run deploy:prod

docker build -t dev.k2data.com.cn:5001/k2data/task-ui:dev-0.4.0 .
docker push dev.k2data.com.cn:5001/k2data/task-ui:dev-0.4.0
