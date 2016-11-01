#!/bin/bash

[[ -z $HOST_OF_TASKAPI ]] && host1="pas-web:8080/pas/services" || host1=$HOST_OF_TASKAPI

/bin/sed -i "s@task_url@http://${host1}@" /etc/nginx/nginx.conf

nginx -g "daemon off;"
