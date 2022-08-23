# Installation {#installation}

You can download and install Go-Web by following these steps`

* Install Alfred by executing the following command `go install github.com/RobyFerro/go-web/cmd/alfred@latest`
* Launch `alfred service:create [your-service-name]`

## Docker {#-docker}

Go-Web provides a docker-compose.yml file that allows developers to easily set up a new development environment: this requires both Docker and Docker-compose installed on the development system.

:::tip
The docker-compose.yml defines several services, i.e. it is configured for providing instances of MySQL, Redis, MongoDB and ElasticSearch; if needed, instances of other services may be added by modifying the docker-compose.yml file.
:::

## Compile and run {#-compile-and-run}

If you'd like to run Go-web in order to try your new implementation you can run the following command:

| Command | Description |
|---------|-------------|
| `make run` | Runs the http server |
| `make build` | Builds the application |
| `alfred show:commands` | Shows all available commands |
| `./goweb` | Runs the http server (compiled) |
