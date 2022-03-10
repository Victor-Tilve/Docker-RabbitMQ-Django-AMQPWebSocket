FROM rabbitmq:management

# Define environment variables.
ENV RABBITMQ_DEFAULT_USER USV-Project
ENV RABBITMQ_DEFAULT_PASS USV1234

ADD init.sh /init.sh

RUN ["chmod", "+x", "/init.sh"]

# Define default command
CMD ["/init.sh"]