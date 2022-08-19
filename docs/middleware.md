# Middleware

Middleware provides a convenient mechanism for inspecting and filtering  incomind and outcoming HTTP requests. Like controllers, a middleware can be created with Alfred. The command is `./alfred middleware:create [middleware name]`.

For instance, middleware named “batman” can be created by running command `./alfred middleware:create batman`.
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
          // Do stuff here if you wanna execute something BEFORE handling the request
          next.ServeHTTP(w, r)
          // Do something here if you wanna execute something AFTER the request
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

As you can see in the example above, middleware contains three different methods: `Handle`, `GetName` and `GetDescription`.

* `Handle` is the method that is executed when the middleware is executed.
* `GetName` returns the middleware name.
* `GetDescription` returns the middleware description.

Every middleware should have a 'factory' function that returns an instance of the current middleware. You can use this function to enable middlewares over specific routes or groups. Just add it in the Middleware field of an HTTP router.

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
