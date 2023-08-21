# Configuration {#configuration}

## Server configuration

You can customize server configuration by editing `GetServer()` method located in `config/server.go` file.

```go title="Main Go-Web configuration"
package config

import "github.com/RobyFerro/go-web-framework/kernel"

func GetServer() kernel.ServerConf {
  return kernel.ServerConf{
    Port:    8005,
    SSL:     false,
    SSLCert: "storage/certs/tls.crt",
    SSLKey:  "storage/certs/tls.key",
    Key:     "REPLACE_WITH_CUSTOM_APP_KEY",
  }
}

```

## Custom configurations

All of the configuration structures are stored in the config folder.
You can create your custom configuration by adding a new structure in this package.

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
