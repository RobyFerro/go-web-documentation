---
sidebar_position: 3
---
# Configuration
All of the configuration structures are stored in the config folder. The basic configuration is located in the server.go file that is used to customize the web server configuration.
Within the config package you will find other configuration structures (MySQL, Redis etc…) that are used by various Go-Web services.

You can create your custom configuration by adding a file in this package, naming it with your implementation name.

```go title="Custom configuration file"
package config

type CustomConf struct {
    Field1 string
    Field2 int
}

func CustomConf () *CustomConf  {
  return &CustomConf {
         Field1: "test",
         Field2: 1 
  }
}
```
Now you can retrieve your custom configuration by calling the `config.CustomConf()` method. 

:::tip
You can encapsulate this method within a system service to propagate this instance within the http request lifecycle.
:::
