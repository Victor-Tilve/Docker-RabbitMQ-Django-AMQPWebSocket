# Docker-RabbitMQ-Django-AMQPWebSocket
In this project, the facilities provided by web AMQP will be used to communicate a web application to rabbitMQ running on the host computer. The web application is running with Django, we tried to use channel, but since it had processes that would be running in C++, it was not possible to import the configuration and it was decided to do it this way.

# Components
The solution was proposed as shown in the following image:

<p align="center">
  <img src="images/Components.png">
  <br/>
</p>


### How to run the application:
To avoid any kind of conflict with the python packages installed on the host, I created a virtual environment where I installed the dependencies I needed. In this particular case I used pipenv.

To install it, all you have to do is:

> python install pipenv
 
when the installation is ready, we run the virtual environment and then run the application.
#### Run the virtual environment

> pipenv install
> pipenv shell

#### Run the application
Locating us in the ACME folder, at the same level as the virtual environment and input.txt files.

<p align="center">
  <img src="images/layout_project.png">
  <br/>
</p>

command:

> python my_acme/main.py input.txt

<p align="center">
  <img src="images/application.png">
  <br/>
</p>

