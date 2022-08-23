# Models

Nel framework MVC i modello sono responsavili per dell'interazione con il database.
Go-Web utilizza la libreria [GORM](https://gorm.io/docs/models.html) per gestire queste operazioni.

È possibile creare nuovi modelli utilizzando il comando `alfred model:create [model name]`.

:::note
I modelli generati tramite Alfred sono inseriti all'interno del paccheto `database/model`.
:::

:::warning
Tutti i modelli devono pessere registrati all'interno della struttura `BaseEntities` presente nel pacchetto `register`.
Utilizzando Alfred questa operazione è eseguita in automatico ma, se si vuole creare un nuovo modello, è necessario registrarlo manualmente.

```go title="Registrazione di un nuovo modello"
// Other BaseEntities structs...
//
// Models will handle all application models
// Here is where you've to register your custom models
// If you create a new model with Alfred it will be auto-registered
Models: register.ModelRegister{
  model.User{},
  // Here is where you’ve to register new models
},
```

:::

## Seeding

È possibile popolare il database con dati di test implementanto il metodo `Seed`.
Questo sarà responsabile di inserire dei dati all'interno della tabella del database gestira dal modello.

:::tip
Go-Web utilizza la libreria [GoFakeIt](https://github.com/brianvoe/gofakeit) per generare dati casuali.
:::

```go title="Il metodo Seed"
// Execute model seeding
func (User) Seed(db *gorm.DB) {
    for i := 0; i < 10; i++ {
        password := gofakeit.Password(true, true, true, true, false, 32)
        encryptedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)

        user := User{
            Name:     gofakeit.FirstName(),
            Surname:  gofakeit.LastName(),
            Username: gofakeit.Username(),
            Password: string(encryptedPassword),
        }

        if err := db.Create(&user).Error; err != nil {
            exception.ProcessError(err)
        }
    }
}
```

I seeder possono essere eseguiti tramite il comando `alfred database:seed [model name]`.

:::danger
Se il nome modello non viene inserito, il comando verrà eseguito per tutti i modelli presenti nel pacchetto `database/model`.
:::
