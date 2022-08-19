# Service container {#service-container}

Service containers represent a powerful tool that injects dependencies into your application.
Methods executed there can access all the services registered in the specific service container.

To take advantage of this feature you should:

* Defining a new service
* Registering the service in a service container

## Defining a new service {#-defining-a-new-service}

All services have to be registrered inside the `service` package and implement a *factory* method that returns specific dependency type.

```go title="Defining the 'Redis' service"
package service

import (
 "fmt"
 "github.com/RobyFerro/go-web/config"
 "github.com/go-redis/redis/v7"
 "github.com/labstack/gommon/log"
)

// ConnectRedis connect to Redis
func ConnectRedis() *redis.Client {
  conf := config.GetRedis()
  client := redis.NewClient(&redis.Options{
    Addr:     fmt.Sprintf("%s:%d", conf.Host, conf.Port),
    Password: conf.Password,
    DB:       1,
  })

  _, err := client.Ping().Result()

  if err != nil {
    log.Error(err)
  }

  return client
}
```

The above example show uses how to define a new service. You can notice that the `ConnectionRedis()` method returns an instance of the `*redis.Client` type.
This is the type that will be automatically injected into our controller and commands.

## Registering the service {#-registering-the-service}

Before we can use the service we have to register it in the service container.
To do that we have to insert the method previously defined in the `foundation.BaseEntity` structure present in the `register` package.

```go title="Registering the 'Redis' service"
package register

import (
  "github.com/RobyFerro/go-web-framework"
  "github.com/RobyFerro/go-web-framework/register"
  "github.com/RobyFerro/go-web/app/console"
  "github.com/RobyFerro/go-web/app/http/controller"
  "github.com/RobyFerro/go-web/database/model"
  "github.com/RobyFerro/go-web/router"
  "github.com/RobyFerro/go-web/service"
)

func BaseEntities() foundation.BaseEntities {
  return foundation.BaseEntities{
  // ... other entities ...
  Services: register.ServiceRegister{
   service.ConnectDB,
   service.ConnectElastic,
   service.ConnectMongo,
   service.ConnectRedis, // <- register the 'Redis' service
  },
  SingletonServices: register.ServiceRegister{},
  CommandServices: console.Services,
  // ... other entities ...
 }
}
```

As you can see the 'ConnectRedis' service may be registered in three different ways:

* Inside the `Services` field
* Inside the `SingletonServices` field
* Inside the `console.Services` strucure

### Services {#-services}

Represent a service container that will be continuously regenerated. Every dependency registered in this container will be generated each time a request is made.

### SingletonServices {#-singletonservices}

Service defined in this container persist across every requests. This is dependency are generated only once and then reused.

:::warning
Every consumer of the service must be aware of the fact that the service is a singleton.
:::

### CommandServices {#-commandservices}

Services defined in this container are executed only when the console is executed.
You can register a new service by implementing the structure `console.Service` present in the `console` package.

```go title="Registering the 'Redis' service in CommandServices"
package console

import (
 "github.com/RobyFerro/go-web-framework/register"
 "github.com/RobyFerro/go-web/service"
)

var (
  // Commands is used to register all console commands.
  Commands = register.CommandRegister{}
  // Services will be used to create the Console Service Container.
  // This container is created to allow dependency injection through console commands.
  Services = register.ServiceRegister{
  service.ConnectDB,
  service.ConnectElastic,
  service.ConnectMongo,
  service.ConnectRedis, // <- register the 'Redis' service
  // ... OTHER SERVICES ...
  }
)
```

## Utilizzo dei container {#-utilizzo-dei-container}

Once you've defined your services you can use them in your application. You'll just need to define the type that is returned by one of our services as a parameter of:

* The `Run()` method present in a command
* In methods implemented in our controller.

```go title="DI inside a controller"
// Dependency injection in controller
package controller

import (
    "github.com/RobyFerro/go-web-framework" 
    "github.com/RobyFerro/go-web/database/model" 
    "github.com/jinzhu/gorm"
)

type SampleController struct{
    gwf.BaseController
}

// Main controller method
func (c *SampleController) Main(db *gorm.DB) {
    // Il parametro `db *gorm.DB` è iniettato 
    // all'interno del controller tramite il service container
    var user model.User
    if err := db.Find(&user).Error;err != nil {
        gwf.ProcessError(err)
    }
}
```

```go title="DI inside a command"
package console

type Batman struct {
    Signature   string
    Description string
    Args        string
}

// Command registration
func (c *Batman) Register() {
    c.Signature = "command:signature"          // Change command signature
    c.Description = "Execute database seeder"  // Change command desc
}

// Command business logic
func (c *Batman) Run(db *gorm.DB) {
    // Il parametro `db *gorm.DB` è iniettato 
    // all'interno del controller tramite il service container
    var user model.User
    if err := db.Find(&user).Error;err != nil {
        gwf.ProcessError(err)
    }
}
```
