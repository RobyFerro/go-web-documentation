# Configurazione {#configuration}

Tutte le strutture di configurazione sono disponibili all'interno del paccetto "config".
È possibile creare nuove cofigurazioni personalizzare aggiungendo nuove strutture all'interno del pacchetto.

```go title="File di configurazione customizzato"
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

Poi ottenere la configurazione personalizzata tramite il metodo `config.CustomConf()`

:::tip
Puoi includere la tua configurazione all'interno servizio in modo da propagare le tue configurazioni all'interno delle richieste HTTP in arrivo
:::
