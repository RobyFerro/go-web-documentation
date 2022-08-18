---
sidebar_position: 2
---
# Installazione

## Standard

Puoi scaricare e installare Go-Web seguendo i seguenti passi:

* Scarica l'ultima release da [GitHub](https://github.com/RobyFerro/go-web)
* Estrai il contenuto nella tua cartella di sviluppo
* Clona il file `env.example` all'interno della cartella di sviluppo e rinominalo in `.env`
* Customizza il il web served modificando la struttura presente all'interno del file `config/server.go` (opzionale)
* Scarica tutte le dipendenze eseguendo il comando `go mod download` all'interno della cartella di sviluppo
* Compila "Alfred CLI" tramite il comando `make build-cli`
* Esegui il comando `./alfred show:commands` per visualizzare i comandi disponibili
* Esegui il comando `make run` per avviare il server

## Tramite Docker

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
| make run | Avvia il server |
| make build-cli | Compila l'Alfred CLI |
| ./alfred show:commands | Visualizza i comandi disponibili |
| make build | Compila il server |
| ./goweb | Avvia il server (da eseguibile compilato) |
