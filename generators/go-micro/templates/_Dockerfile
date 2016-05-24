FROM alpine

COPY /tmp/micro.user /bin/<%= projectName %>
COPY /entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh /bin/<%= projectName %>

ENTRYPOINT ["/entrypoint.sh"]
