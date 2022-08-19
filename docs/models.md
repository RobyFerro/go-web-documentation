# Models

In MVC frameworks models are responsible for the database interaction logic.
Go-Web takes advantage of the GORM library to provide them (see [GORM](https://gorm.io/docs/models.html) documentation for more information about models).

You can create a new model by running the following command:

```bash
$> ./alfred model:create [model name]
```

:::note
Models generated with the `model:create` command are located in the `database/model` folder.
:::

:::warning
Every model has to be registered in the foundation.BaseEntities structure located in the `register/register.go.`
Alfred take care of this for you, but if you want to create a model manually you have to do it manually.

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

You can populate your database with test data implementing the `Seed` method.

:::tip
Go-Web uses [GoFakeIt library](https://github.com/brianvoe/gofakeit) to generate fake data.
:::

```go title="Seeding method of a model"
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

Seeder may be executed by running the command `./alfred database:seed [model name]`.

:::danger
Omitting the model name the command will run every model seeder's.
:::
