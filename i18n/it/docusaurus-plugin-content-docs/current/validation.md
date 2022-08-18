# Validazione

Le richieste possono essere sottoposte a validazione prima che vengano prese in carico dal controller.
Puoi creare una nuova validazione generando una nuova struttura contentente tutti i valori presenti nel corpo della richiesta, all'interno del pacchetto `app/http/validation`.

Per esempio, se necessiti di validare una richiesta contentene i valori necessari per effettuare il login, potresti creare una struttura simile alla segiente:

```go title="Esempio di una struttura di validazione"
type Credentials struct {
  Username string `json:"username" valid:"required"`
  Password string `json:"password" valid:"required"`
}
```

Come puoi vedere la struttura è composta da due campi, uno per il nome utente e uno per la password. Ogni campo possiede tue tag differenti:

* `json` tag è usato per decodificare il JSON all'interno di una struttura Go. Per fare ciò viene utilizzato il formato standard definito all'interno di `encoding/json`.
* `valid` tag è responsabile per la validazione dei valori presenti all'interno della richiesta. Ci sono molte opzioni di validazione disponibili, per ulteriori informazioni consulta la documentazione di [govalidator](https://github.com/asaskevich/govalidator).

L'ultima cosa da sapere è che per poter essere eseguita, la validazione deve essere registta all'interno di una specifica rotta. Basta inserire il riferimento ad una istanza di questa struttura nel campo `Validation` della rotta.

```go title="Validazione all'iterno di una rotta"
var AuthRouter = register.HTTPRouter{
  Route: []register.Route{
     {
        Name:        "login",
        Path:        "/login",
        Action:      "AuthController@JWTAuthentication",
        Method:      "POST",
        Validation:  &validation.Credentials{}, // Validazione all'interno della rotta
        Description: "Perform login",
        Middleware:  []register.Middleware{},
     },
   },
}
```
