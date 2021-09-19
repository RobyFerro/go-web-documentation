---
sidebar_position: 8
sidebar_label: Request lifecycle
---
# Request lifecycle
## Routing
Go-Web handles all HTTP requests within routers. Routers are simple structures that define every request/group of requests included in the web application. You can find and define all the routers in the router package.

Every router must be an instance of the register.HTTPRouter structure and should implement at least a Route or a Group.

```go title="The HTTPRouter structure
// HTTPRouter contains Route and Group that defines a complete HTTP Router
type HTTPRouter struct {
  Route  []Route
  Groups []Group
}
```

### Route
This structure is used to define a concrete HTTP endpoint and must be an instance of the register.Route structure.
```go title="The Route structure"
// Route defines an HTTP Router endpoint
type Route struct {
  Name        string
  Path        string
  Action      string
  Method      string
  Description string
  Validation  interface{}
  Middleware  []Middleware
}
```
As you can see in the figure above a Route structure is a simple structure that contains all request information:

#### Name
Declares the path name
#### Path
Declares the path endpoint
#### Action
Declares the path action. This is a string composed by the controller name + @ symbol + the controller method that will handle the incoming request: `MainController@Main`
#### Description
Contains the endpoint description.
#### Validation
Contains an instance of a structure that reflects the content of your HTTP request body. 

These structures should implement the govalidator tags and are used to validate the incoming HTTP request. It returns a 422 HTTP error code if it fails. See request validation chapter for more information.

#### Middleware
Contains a list of Middleware that pre/post handle the incoming request (before or after the main action).

### Groups
As the name explains, the Groups field contains a list of Group structure. This contains a list of routes grouped by a prefix. 

```go title="The Group structure"
// Group defines a group of HTTP Route
type Group struct {
  Name       string
  Prefix     string
  Routes     []Route
  Middleware []Middleware
}
```

#### Name
Defines the group name.
#### Prefix
Defines the http prefix for all routes.
#### Routes
Contains a list of Route structure. Defines all routes in this group.
#### Middleware
The behaviour of this field is the same as the Route middleware except that this handles every route present in this group.

## Middleware
Middleware provides a convenient mechanism for inspecting and filtering HTTP requests entering your application. Like controllers, a middleware can be created with command:
```bash
./alfred middleware:create
```
For instance, middleware named “batman” can be created by running command:
```bash
./alfred middleware:create batman
```
After executing the command, the newly created middleware will be available in folder `/app/http/middleware`

```go title="New batman middleware
package middleware

import (
    "net/http"
)

type BatmanMiddleware struct {
    Name        string
    Description string
}

// Handle description
func (BatmanMiddleware) Handle(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
        // Do stuff here if you wanna execute something before handling
          // the incoming request
          next.ServeHTTP(w, r)
          // Do something here if you wanna execute something after the request
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
As described previously, middlewares can be used for pre/post processing requests and uses next.ServeHTTP method to forward the http request to the controller. You can choose to do something before or/and after this statement

As you can see in the example above, middleware contains three different methods. The most important one is the Handle method that will contain the main middleware logic. The second and third methods are GetName and GetDescription, those are used in the Go-Web kernel in order to categorize every middleware and should not be edited. 

Every middleware should have a constructor function that returns an instance of the current middleware. You can use this function to enable this middleware over specific routes or groups by adding it in the Middleware field of an HTTP router.

```go title="Middleware in HTTPRouter"
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

## Request validation
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

## Controller
Begin a MVC framework, Go-Web uses controllers as request endpoints. Here developers can handle all the logic that has to be applied to the current request. You can create a controller by running the following command in console:
```bash
./alfred controller:create sample
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
When creating a controller, Go-Web automatically  add to it the function Main, which could be expanded with some logic, as shown in following code; controllers can be extended by adding new public functions.

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

Because the service container is used to “resolve” all controllers in Go-Web, developers can type-hint any of their dependency because they will be injected into the controller instance, as represented by the following code:

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
    var user model.User
    if err := db.Find(&user).Error;err != nil {
        gwf.ProcessError(err)
    }
}
```

### Handle incoming request
If you've validated the request within a validation structure you can access to request data simply including the
`kernel.Request` value in method parameter. 
This helps you to access to these values without explicitly decoding the incoming request.

Data are exposed as `map[string]intefrace{}` type. 

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

:::warning
Because data in `kernel.Request` object is `map[string]interface{}` every value has to be cast with the original type.

```go title="Example of type casting"
req["username"]          // This was originally a string
req["username"].(string) // But you've explicitly cast to use it properly
```
:::
