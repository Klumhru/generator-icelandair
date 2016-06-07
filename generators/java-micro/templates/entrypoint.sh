#!/bin/sh

. /etc/<%= projectName %>/<%= projectName %>.conf
java -Djava.security.egd=file:/dev/./urandom -jar /app.jar