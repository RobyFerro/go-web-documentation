# Middleware

I middleware sono componenti atti ad intercettare le richieste in entrata e in uscita del server.
Permettono di filtrare, modificare e analizzare i valori di input e output prima o dopo che essere state prese in carico da un controller.

Il comando per creare un nuovo middleware è il seguente comando `./alfred middleware create [middleware name]`.
Ad esempio, un middleware di dome "batman' può essere creato tramite il comando `./alfred middleware create batman`.

Dopo averlo eseguito il nuovo middleware sarà disponibile nella cartella `app/http/batman.go`.

```go title="Nuovo middleware"
package middleware

import (
    "net/http"
)

type BatmanMiddleware struct {
    Name        string
    Description string
}

func (BatmanMiddleware) Handle(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
          // Inserisci qui la tua logica se desideri eseguire qualcosa PRIMA che venga preso in carico dal controller
          next.ServeHTTP(w, r)
          // Inserisci qui la tua logica se desideri eseguire qualcosa DOPO che venga preso in carico dal controller
    })
}

// GetName returns the middleware name
func (m BatmanMiddleware) GetName() string {
  return m.Name
}

// GetDescription returns the middleware description
func (m BatmanMiddleware) GetDescription() string {
  return m.Description
}


func NewBatmanMiddleware() BatmanMiddleware{
  return BatmanMiddleware{
     Name:        "BasicAuth",
     Description: "Provides basic authentication",
  }
}
```

Come è possibile visionare nell'esempio i middleware contengono tre metodi differenti: `Handle`, `GetName` e `GetDescription`.

* Il metodo `Handle` è il metodo che viene eseguito quando il middleware viene preso in carico dal server.
* Il metodo `GetName` restituisce il nome del middleware.
* Il metodo `GetDescription` restituisce la descrizione del middleware.

Tutti i middleware devono avere un metodo *factory* in grado di restituire una nuova istanza dello stesso middleware. Per poter integrare un middleware all'interno di una specifica rotta sarà necessario inserire il metodo 'factory' all'interno della rotta.

```go title="Registrazione di un middleware all'interno di una specifica rotta/gruppo"
var AppRouter = register.HTTPRouter{
  Route: []register.Route{
     {
        Name:        "home",
        Path:        "/",
        Action:      "HomeController@Main",
        Method:      "GET",
        Description: "Main route",
        Middleware: []register.Middleware{
           middleware.NewBatmanMiddleware(),
        },
     },
  }
}
```
