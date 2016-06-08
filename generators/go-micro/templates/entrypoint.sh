#!/bin/sh
. /etc/<%= projectName %>/aws/aws-credentials.env && \
  micro.<%= projectName %>
