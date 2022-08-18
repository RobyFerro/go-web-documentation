# Controller

Essendo un framework MVC, Go-Web utilizza i controller per gestire le richieste HTTP. Al loro interno gli sviluppatori possono gestire ed implementare le logiche di business.

È possibile creare un nuovo controller utilizzando il comando `./alfred controller:create [controller name]`.

## Controller di esempio

È possibile creare un nuovo controller lanciando il comando `./alfred controller:create sample`. Verrà creato un nuovo file `controller/sample.go` all'interno del pacchetto `app/controller`:

```go title="Nuovo controller"
package controller

import "github.com/RobyFerro/go-web-framework"

type SampleController struct{
    gwf.BaseController
}

// Main controller method
func (c *SampleController) Main(){
    // Insert your custom logic
}
```

I metodi della struttura principale (in quasto caso SampleController) sono i veri gestori delle richieste HTTP.
Di default, alla creazione di un nuovo controller viene creato il metodo `Main()`.

All'interno dei metodi è possibile inserire la business logic dell'endpoint.

```go title="SampleController with some logic"
// Sample controller
package controller

import (
    "github.com/RobyFerro/go-web-framework"
    "github.com/RobyFerro/go-web/exception"
)

type SampleController struct{
    gwf.BaseController
}

// Main controller method
func (c *SampleController) Main() {
    _, err := c.Response.Write([]byte("Hello world")) if err != nil {
        exception.ProcessError(err)
    }
}
```

Per poter avere accesso alla Response e al Request, è necessario che il controller estenda il `gwf.BaseController`.

## Gestione della richiesta

Estendendo il `gwf.BaseController` il controller ha accesso a tutti i valori presenti all'interno della richiesta HTTP in arrivo.
È possibile leggere i valori tramite il campo `c.Request` (di tipo `*http.Request`).

```go title="Lettura dei valori della richiesta"
// Main controller method
func (c *SampleController) Main(db *gorm.DB) {
    fmt.Println(c.Request.Method)
}
```

:::tip
Il campo `Request` è un puntatore a un oggetto di tipo `*http.Request`.
:::

### Gestire il corpo della richiesta

Se la richiesta è stata validata tramite una struttura di validazione, puoi accedere al contenuto semplicemente includendo un parmetro di tipo `kernel.Request` all'interno del metodo. In questo modo è possibile leggere i valori della richiesta senza dover esplicitamente decodificare il contenuto all'interno di una struttura.

:::tip
I valori di tipo `kernel.Request` sono una struttura di tipo `map[string]interface{}`.
:::

```go title="Accedere al contenuto della richiesta all'interno di un controller"
// Main controller method
func (c *SampleController) Main(db *gorm.DB, req kernel.Request) {
    fmt.Println(req["name"]) // You can access to the incoming request payload with the `req` object
    
    var user model.User
    if err := db.Find(&user).Error;err != nil {
        gwf.ProcessError(err)
    }
}
```

:::caution
Dato che i valori all'interno della `kenel.Request` sono di tipo `map[string]interface{}` è necessario effettuare un cast esplicito al tipo di appartenenza.

```go title="Esempio di casting"
req["username"]          // This was originally a string
req["username"].(string) // But you've explicitly cast to use it properly
```

:::

:::note
Se preferisci puoi sempre decodificare manualmente il contenuto della richiesta all'interno di una struttura

```go title="Decodifica manuale del contenuto della richiesta"
type Credentials struct {
 Username string `json:"username"`
 Password string `json:"password"`
}

var credentials Credentials
if err := tool.DecodeJsonRequest(c.Request, &data); err != nil {
  log.Fatal(err)
}

fmt.Println(credentials.Username)
```

:::

## Gestione della risposta

Come per la richiesta, è possibile accedere al contenuto della risposta tramite il campo `c.Response` (di tipo `*http.ResponseWriter`).

```go title="Gestione delle risposta HTTP"
// Main controller method
func (c *SampleController) Main() {
    _, err := c.Response.Write([]byte("Hello world")) if err != nil {
        exception.ProcessError(err)
    }
}
```

## Dependency injection

Dato che i controller sono eseguiti all'interno dei service container, tutti i metodi presenti sono in grado di risolvere i autonomia le dipendenze indicate al loro interno.

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
    var user model.User
    if err := db.Find(&user).Error;err != nil {
        gwf.ProcessError(err)
    }
}
```

:::caution
Per poter essere risolte, le dipendenze indicato all'interno dei metodi del controller devono essere specificate all'interno dei servizi di sistema.
In caso contrario il metodo riporterà un runtime error.
:::
