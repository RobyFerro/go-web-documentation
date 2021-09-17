---
sidebar_position: 2
---
# Installation

## Standard installation
You can download and install Go-Web by following these steps:
* Download Go-Web release from [GitHub](https://github.com/RobyFerro/go-web)
* Extract the content in you project root
* Clone the env.example file in the root directory by naming it as .env
* Customize the server interface in config/server.go (optional)
* Download all dependencies by executing go mod download in project root
* Build CLI utility with make build-cli
* Execute ./alfred show:commands to see all available commands
* Execute make run to runs the http server

## Docker
Go-Web provides a docker-compose.yml file that allows developers to easily set up a new development environment: this requires both Docker and Docker-compose installed on the development system.

:::tip
The docker-compose.yml defines several services, i.e. it is configured for providing instances of MySQL, Redis, MongoDB and ElasticSearch; if needed, instances of other services may be added by modifying the docker-compose.yml file.
:::

## Compile and run
If you'd like to run Go-web in order to try your new implementation you can run the following command:
```
$ make run
```
To compile the entire project you just need to run:
```
$ make build
```
Then to start you can simply run of your Go-Web commands:
```
$ ./goweb
```
The server will start listening on the port defined in config/server.go