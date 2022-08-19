# Routing {#routing}

Go-Web handles all HTTP requests within routers. Routers are simple structures that define every request/group of requests included in the web application. You can find and define all the routers in the `router` package.

Every router must be an instance of the `register.HTTPRouter` structure and should implement at least a Route or a Group.

```go title="The HTTPRouter structure
// HTTPRouter contains Route and Group that defines a complete HTTP Router
type HTTPRouter struct {
  Route  []Route
  Groups []Group
}
```

## Route {#-route}

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

| Field | Description |
|-------|-------------|
| Name | The name of the route |
| Path | The path of the route |
| Action | The action of the route |
| Method | The method of the route |
| Description | The description of the route |
| Validation | The validation of the route |
| Middleware | The middlewares of the route |

## Groups {#-groups}

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

| Field | Description |
|-------|-------------|
| Name | The name of the group |
| Prefix | The prefix of the group |
| Routes | The routes of the group |
| Middleware | The middlewares of the group |
