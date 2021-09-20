# Middleware
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