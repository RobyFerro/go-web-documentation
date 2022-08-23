# Controller {#controller}

Begin an MVC framework, Go-Web uses controllers as request endpoints. Here developers can handle all the logic that has to be applied to the current request.

You can create a controller by running the following command in console:

```bash
alfred controller:create sample
```

Go-Web will create the .go file containing a controller named “SampleController” in the `/app/http/controller` directory.
The content will be:

```go title="New SampleController"
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

When creating a controller, Go-Web automatically add to it the function Main, which could be expanded with some logic, as shown in following code; controllers can be extended by adding new public functions.

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

To gain access to everything underlying a Go-Web controller, including HTTP request and response, a controller needs to extend `gwf.BaseController`.

## Handle request {#-handle-request}

By extending `gwf.BaseController` controllers have access to the incoming request within the `Request` field. You can read the incoming request parameters, query strings, and body content by using the `c.Request` field.

```go title="Access to the incoming request"
// Main controller method
func (c *SampleController) Main(db *gorm.DB) {
    fmt.Println(c.Request.Method)
}
```

:::tip
`Request` field represent a pointer to the incoming `http.Request` object
:::

### Handle request body {#-handle-request-body}

If you've validated the request within a validation structure you can access to request data simply including the
`kernel.Request` value in method parameter.
This helps you to access to these values without explicitly decoding the incoming request.

Data are exposed as `map[string]interface{}` type.

```go title="Access to request in Controller"
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
Because data in `kernel.Request` object is a `map[string]interface{}` every value has to be cast with the original type.

```go title="Example of type casting"
req["username"]          // This was originally a string
req["username"].(string) // But you've explicitly cast to use it properly
```

:::

:::note
You can always manually decode the request body manually in order to use the original struct.

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

## Handle response {#-handle-response}

Similar to `Request` the controller has the `Response` field that is used to handle the outgoing http response.

```go title="Handle outgoing Response in controller"
// Main controller method
func (c *SampleController) Main() {
    _, err := c.Response.Write([]byte("Hello world")) if err != nil {
        exception.ProcessError(err)
    }
}
```

:::tip
`Response` field represent a pointer to the `http.ResponseWriter` object
:::

## Dependency injection {#-dependency-injection}

Since contoller are execued inside a IoC container, every dependency (if properly configured) can be injected into the controller.

```go title="SampleController with DependencyInjection"
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
    // *gorm.DB is a dependency that is injected into the controller
    var user model.User
    if err := db.Find(&user).Error;err != nil {
        gwf.ProcessError(err)
    }
}
```
