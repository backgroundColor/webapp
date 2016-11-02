#!/bin/bash

[[ -z $HOST_OF_TASKAPI ]] && host1="task-manager:8080/task-manager" || host1=$HOST_OF_TASKAPI

/bin/sed -i "s@task_url@http://${host1}@" /etc/nginx/nginx.conf

nginx -g "daemon off;"
