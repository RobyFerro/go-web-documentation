# Gestione delle rotte

Go-Web gestisce tutte le richiesta HTTP in arrivo attraverso dei router. Questi sono semplici strutture che definiscono tutte le rotte/gruppi disponibili all'interno del servizio web. È possibile visionare/creare/modificare i router esistenti modificando il contenuto del pacchetto `router`.

I router devono essere un istanza di tipo `register.HTTPRouter` e devono implementere almeno una rotta o un gruppo.

```go title="Esempio di un router"
// HTTPRouter contains Route and Group that defines a complete HTTP Router
type HTTPRouter struct {
  Route  []Route
  Groups []Group
}
```

## Le rotte

La struttura di tipo `Route` definisce una rotta.

```go title="The Route structure"
// Route defines an HTTP Router endpoint
type Route struct {
  Name        string
  Path        string
  Action      string
  Method      string
  Description string
  Validation  interface{}
  Middleware  []Middleware
}
```

Come è possibile vedere, la struttura contiene i seguenti campi:

| Campo | Descrizione |
| ------ | ----------- |
| `Name` | Nome della rotta |
| `Path` | Percorso della rotta |
| `Action` | Nome della funzione di callback |
| `Method` | Metodo HTTP |
| `Description` | Descrizione della rotta |
| `Validation` | Struttura di validazione |
| `Middleware` | Middlewares da applicare |

## I gruppi

I gruppi sono strutture che contengono una serie di `Route` raggruppati da un prefisso.

```go title="The Group structure"
// Group defines a group of HTTP Route
type Group struct {
  Name       string
  Prefix     string
  Routes     []Route
  Middleware []Middleware
}
```

| Campo | Descrizione |
| ------ | ----------- |
| `Name` | Nome del gruppo |
| `Prefix` | Prefisso del gruppo |
| `Routes` | Rotte del gruppo |
| `Middleware` | Middlewares da applicare |

## Esempio di un router

Di seguito è riportato l'esempio di un router:

```go title="Esempio di un router"
package router

import (
 "github.com/RobyFerro/go-web-framework/register"
 "github.com/RobyFerro/go-web/app/http/validation"
)

var AuthRouter = register.HTTPRouter{
 Route: []register.Route{
  {
   Name:        "login",
   Path:        "/login",
   Action:      "AuthController@JWTAuthentication",
   Method:      "POST",
   Validation:  &validation.Credentials{},
   Description: "Perform login",
   Middleware:  []register.Middleware{},
  },
  {
   Name:        "basic login",
   Path:        "/basic-auth",
   Action:      "AuthController@BasicAuthentication",
   Method:      "POST",
   Validation:  &validation.Credentials{},
   Description: "Basic authentication",
   Middleware:  []register.Middleware{},
  },
 },
}

```

:::warning
Tutti i router, per poter essere implementati devono essere registrati all'interno del pacchetto `register`.

```go title="Registrazione dei router"
// BaseEntities returns a struct that contains Go-Web base entities
func BaseEntities() foundation.BaseEntities {
 return foundation.BaseEntities{
  // ... your base entities here ...
  // Router contains all application routes
  Router: []register.HTTPRouter{
   router.AppRouter,
   router.AuthRouter,
  },
 }
}
```

:::
