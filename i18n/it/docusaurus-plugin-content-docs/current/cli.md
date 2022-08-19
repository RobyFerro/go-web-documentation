---
sidebar_label: Comandi Alfred
---
# Comandi CLI

Alfred è la utility da linea di comando inclusa all'interno di Go-Web. Mette a disposizione dello sviluppatore molti comandi utili per velocizzare lo sviluppo. Puoi compilare Alfred tramite il comando `sudo make build-cli`.

Lancia il comando `./alfred show:commands` per visualizzare i comandi disponibili.


| Comandi disponivili | Descrizione |
| ------------------------- | -------------------------------------- |
| database:seed             | Executes database seeder               |
| model:create [model name] | Creates new database model             |
| migration:create [migration name] | Creates new migration |
| migration:up | Executes migrations |
| migration:rollback [step] | Execute migrations rollback |
| show:commands | Shows help menu |
| controller:create [controller name] | Creates new controller |
| cmd:create [command name] | Creates new CLI command |
| middleware:create [middleware name] | Creates new middleware |
| generate:key | Generates new application key |

## Crea comandi personalizzati

Puoi creare un nuovo comando Alfred eseguendo `./alfred cmd:create [command name]`.
In questo modo verrà creato un nuovo file `cmd/[command name].go` all'interno del pacchetto `app/console` contente il codice necessario per la creazione di un nuovo comando.

### Esempio

Lanciando il comando `./alfred cmd:creare batman` verrà creato un nuovo file `cmd/batman.go` all'interno del pacchetto `app/console`:

```go title="Nuovo comando"
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
func (c *Batman) Run() {
    // Insert command logic
}
```
Come puoi vedere all'interno della figura il comando contiene due metodi principali:

* Register: utilizzato da `./alfred show:commands` per visionare la descrizione del comando
* Run: contiene la business logic del comando

L'ultima cosa che devi fare è registrare il comando all'interno della struttura `CommandRegister` presente all'interno del pacchetto `app/console`.

```go title="Struttura per la registrazione dei comandi CLI"
// Commands configuration represent all Go-Web application conf
// Every command needs to be registered in the following list
var (
    Commands = register.CommandRegister{
        // Here is where you've to register your custom commands
    }
)
```

## Dependency injection

Come per i controller, Go-Web permette l'utilizzo di servizi presenti all'interno del container IoC. Dichiarando un servizio all'interno della variabile `Services` presente nel file `console/kernel.go`, questo servizio verrà iniettato all'interno del comando.

```go title="DI all'interno di un comando CLI"
type Seeder struct {
 register.Command
}

func (c *Seeder) Register() {
 c.Signature = "database:seed <name>"
 c.Description = "Execute database seeder"
}

// Todo: Improve this method to run a single seeder
func (c *Seeder) Run(db *gorm.DB, models register.ModelRegister) {
 // Dichiarando i parametri con un tipo di dato presente all'intenro del container IoC, questo servizio verrà iniettato all'interno del comando
}
