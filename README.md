# Docker-RabbitMQ-Django-AMQPWebSocket
In this project, the facilities provided by web AMQP will be used to communicate a web application to rabbitMQ running on the host computer. The web application is running with Django, we tried to use channel, but since it had processes that would be running in C++, it was not possible to import the configuration and it was decided to do it this way.
