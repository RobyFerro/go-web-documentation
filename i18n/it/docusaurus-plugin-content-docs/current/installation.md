---
sidebar_position: 2
---
# Installazione

Puoi scaricare e installare Go-Web seguendo i seguenti passi:

* Esegui il comando `go install github.com/RobyFerro/cmd/alfred@latest` per installare l'ultima versione di Alfred
* Crea un nuovo servizio lanciando `alfred service:create [nome del servizio]`

## Docker

All'interno del progetto è presente il file "docker-compose.yml" che contiene le istruzioni per l'avvio del server tramite Docker.

:::tip
Il file "docker-compose.yml" contiente alcuni dei servizi che potrebbero essere utilizzati all'interno di un servizio:

* MySQL
* Redis
* MongoDB
* ElasticSearch
:::

## Compilazione e avvio

| Commands| Description |
| ---------| ------------------------ |
| `make run` | Avvia il server |
| `make build` | Compila il server |
| `./alfred show:commands` | Visualizza i comandi disponibili |
| `./goweb` | Avvia il server (da eseguibile compilato) |
