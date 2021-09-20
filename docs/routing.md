# Routing
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