# Service container

Il 'service container' è un potente strumento per gestire le dipendenze del nostro applicativo.
La Dependency Injection (DI) è utilizzata per *iniettare* le dipendenze all'interno di controller e comandi CLI.

È possibile pensare ad un 'service container' come ad un contenitore dove al suo interno le dipendenze vengono risolte automaticamente.
Questo significa che tutti i metodi che vengono eseguiti tramite questo contesto possono accedere a queste dipendenze.

Gli step necessari per utilizzare questo strumento sono:

* Definire un servizio
* Registrarlo all'interno dello specifico container.

## Definizione di un servizio

Tutti i servizi devono essere definiti all'interno del pacchetto `service` e consistono in un metodo che restituisce un oggetto ti uno specifico tipo.

```go title="Definizione del servizio 'Redis'"
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

L'esemprio di codice mostra come dovrebbe essere definito un servizio. Possiamo notare che il metodo `ConnectRedis()` restituisce un oggetto di tipo `*redis.Client` che, una volta registrato all'interno del service container, permetterà a controller e comandi di risolvere la dipendenza in automatico.

## Registrazione di un servizio

Per poter registrare un servizio all'interno di un service container è necessario inserire il metodo creato in precedenza all'interno della struttura `foundation.BaseEntities` situate nel pacchetto register.

```go title="Registrazione del servizio 'Redis'"
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
   service.ConnectRedis, // <- registrazione del servizio 'Redis'
  },
  SingletonServices: register.ServiceRegister{},
  CommandServices: console.Services,
  // ... other entities ...
 }
}
```

Come è possibile notare, il servizio può essere registrato in tre modi:

* All'interno del campo `Services`
* All'interno del campo `SingletonServices`
* Popolando la struttura `console.Services`

### Services

Rappresenta il service container generato ad ogni richiesta in arrivo. Le dipendenze risolte al suo interno vengono rigenerate ogni volta che viene presa un carico una nuova richiesta.

### SingletonServices

Rappresenta un service container che viene generato una sola volta all'avvio dell'applicazione.
Tutte le dipendenze risolte al suo interno vengono generato all'avvio dell'applicazione.

:::warning
Tutti gli utilizzatori di questo service container utilizzeranno la stessa istanza.
:::

### CommandServices

Consiste nel service container utilizzato da tutti i comandi eseguiti da CLI.
È possibile configurare i servizi disponibili andando ad implementare la struttura `console.Services` presente all'interno del paccheto `console`.

```go title="Registrazione servizii in console.Services"
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
  service.ConnectRedis,
  // ... OTHER SERVICES ...
  }
)
```

## Utilizzo dei container

Una volta configurati i servizi possono essere consumati all'interno di un container o da un comando eseguito da CLI.
Basterà inserire il tipo di oggetto ritornato dal servizio come parametro del metodo `Run()` del comando o come parametro dei metodi presenti all'interno dei controller.

```go title="DI all'interno di un controller"
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

```go title="DI all'interno di un comando"
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
