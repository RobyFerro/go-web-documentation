---
sidebar_label: Commands
---
# Commands
Alfred merupakan command-line interface (CLI) yang ada di Go-Web. Alfred menyediakan banyak command yang bisa membantu kamu ketika membuat aplikasimu. kamu bisa meng-kompile si Alfred dengan menjalankan 
`sudo make build-cli` di root projekmu.
```
$ ./alfred show:commands
```

| Commands                  | Description                            |
| ------------------------- | -------------------------------------- |
| database:seed             | Mengeksekusi database seed             |
| model:create [nama model] | Membuat model database baru            |
| migration:create [nama migration] | Membuat migration baru |
| migration:up | Mengeksekusi migration |
| migration:rollback [step] | Mengeksekusi rollback migration |
| show:commands | Menampilkan menu bantuan |
| controller:create [nama controller] | Membuat controller baru |
| cmd:create [nama command] | Membuat command CLI baru |
| middleware:create [nama middleware] | Membuat middleware baru |
| generate:key | Men-generate key aplikasi |

## Membuat command sendiri
Kamu bisa coba membuat command sendiri untuk Alfred, dengan menjalankan `./alfred cmd:create <command name>`.
Command ini akan membuat file .go baru di folder `app/console` yang memiliki beberapa kode boilerplate.

```
$ ./alfred cmd:create batman
```
```go title="custom command baru"
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
Seperti yang terlihat di figur 3, command ini memiliki dua method utama:
* Register: digunakan oleh command `show:commands` untuk menunjukkan signatur dan deskripsi command.
* Run: berisi logic utama dari custom commandmu.

Hal terakhir yang perlu kita lakukan adalah me-registerkan custom command kita ini ke Go-Web register.
Buka file `app/console/kernel.go` kemudian tambahkan sebuah pointer ke command bari di CommandRegister struct:

```go title="Struktur register command"
// Commands configuration represent all Go-Web application conf
// Every command needs to be registered in the following list
var (
    Commands = register.CommandRegister{
        // Here is where you've to register your custom commands
    }
)
```

## Dependency injection
TODO


