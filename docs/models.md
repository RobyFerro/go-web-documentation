# Models
In MVC frameworks models are responsible for the database interaction logic.
Go-Web takes advantage of the GORM library to provide them (see [GORM](https://gorm.io/docs/models.html) documentation for more information about models).
Alfred may even help you to create a new model, in fact you can run the following command to automatically generate and register a custom model.

```
$ ./alfred model:create <model name>
```

_Models generated with the model:create command are located in the `database/model` folder._

Every model has to be registered in the foundation.BaseEntities structure located in the `register/register.go.`

:::caution
This operation is automatically handled by the Alfred procedure, but if you decide to manually create your model, you’ll need to manually register it.
:::

```go title="Model registration structure in BaseEntities"
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

## Seeding
You may create database seeding by implementing a Seed method in your model.
This is responsible for filling the table “owned” by the current model with custom/random data.
As you can see in the figure 4 the Seed method contains a loop (that determines how many records has to be inserted)
that create and fill an instance of the current model. This instance is finally used to insert data into the database table.

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
:::tip
Go-Web uses GoFakeIt  to generate random data, see library documentation to have more information about every implementation.
:::

Seeder may be executed by running the following command:
```
./alfred database:seed <model name>
```
:::danger
Omitting the model name the command will run every model seeder's.
:::