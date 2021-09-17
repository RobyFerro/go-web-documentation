---
sidebar_position: 5
sidebar_label: CLI Commands
---
# CLI Commands
Alfred is the command-line interface included with Go-Web. It provides a number of helpful commands that can assist you while you build your application. You can compile Alfred by running `sudo make build-cli` in your project root.
```
$ ./alfred show:commands
```

| Commands                  | Description                            |
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

## Create custom commands
You can create a custom Alfred command by launching `./alfred cmd:create <command name>`. 
This will create a new .go file in the `app/console` folder that contains some boilerplate code.

```
$ ./alfred cmd:create batman
```
```go title="New custom command"
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
As you can see in the figure 3 the commands contains two main methods:
* Register: used by the show:commands command to expose signature and description
* Run: contains the main logic of your custom command.

The last thing that we need to do is register our custom command into the Go-Web register. 
Open the `app/console/kernel.go` file and append a pointer to the new command in the CommandRegister struct:

```go title="Command register structure"
/ Commands configuration represent all Go-Web application conf
// Every command needs to be registered in the following list
var (
    Commands = register.CommandRegister{
        // Here is where you've to register your custom commands
    }
)
```

## Dependency injection
TODO


