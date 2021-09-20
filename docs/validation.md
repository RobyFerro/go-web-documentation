# Validation
Requests can be validated before begin handles. You can create a simple structure in the `app/http/validation` directory that should contain the content of a specific HTTP body request.

For instance if you need to validate a request that expects a json object with two specific fields you can create something like the following.

```go title="Example of validation structure"
type Credentials struct {
  Username string `json:"username" valid:"required"`
  Password string `json:"password" valid:"required"`
}
```

As you can see the above structure contains two fields: Username and Password. Each of these fields has two different tags. 

* `json` tag is used to decode the raw json into a Golang struct. It used the standard `encoding/json` format.
* `valid` tag is responsible for the request validation. There are several configurations that may help you to validate the request. Check the [govalidator](https://github.com/asaskevich/govalidator) documentation for more information.

The last thing that you have to do to enable specific validation over a specific controller is register it in the Validation field of an HTTP router like the example below.

```go title="Validation in HTTPRouter intance"
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
   },
}
```

