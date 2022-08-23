---
sidebar_position: 6
sidebar_label: Migrazioni
---
# Migrazioni

Le migrazioni sono elementi in grado di tenere traccia di tutte le modifiche e gli aggiornamenti del database.

## Creazione di una nuova migrazione

Le migrazioni sono creati tramite il comando `alfred migration:create [migration name]`.
Il comando genererà due divesi file all'interno della cartella `database/migration`:

* `[migration name]_up.sql`: contiene le query di creazione del database.
* `[migration name]_down.sql`: contiene le query di rollback del database.

All'interno di essi è possibile inserire qualsiasi comando SQL.

:::note
Generalmente il file `*_up.sql` viene utilizzato per eseguire una creazione/modifica mentre il file `*_down.sql` viene utilizzato per eseguire il rollback delle operezioni eseguite in `*_up.sql`.
:::

## Eseguire le migrazioni

Le migrazioni possono essere eseguite tramite il comando `alfred migration:up`.

:::caution
Il comando `./alfred migration:up` esegue le migrazioni che non sono ancora state eseguite.
:::

## Rollback

Se si ha la necessità di eseguire il rollback delle migrazioni, è possibile utilizzare il comando `alfred migration:rollback [steps]`, dove `steps` indica il numero di migrazioni da ripristinare.

Esempio:

`alfred migration:rollback 2` effettuerà il rollback delle due migrazioni più recenti.
