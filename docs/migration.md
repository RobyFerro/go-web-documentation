---
sidebar_position: 6
sidebar_label: Migration
---
# Migration

Migrations are like version control for your database, allowing your team to easily modify and share the application’s database schema.
Developers can creates new migration as follows:

```bash
$> ./alfred migration:create [migration name]
```

Alfred generates new migrations in the `/database/migration` directory.
You will find two different .sql files. Those files are similarly named except for the suffix.

The `*_up.sql` is responsible for doing stuff on our database and the `*_down.sql` is responsible for rolling back our changes. You can simply write a pure SQL statement in each file.

## Execute migrations

Migration process handles only unexecuted migrations and can be start by running the following command:

```bash
$> ./alfred migration:up
```

This command runs the SQL statements present into every *_up.sql files.

## Rollback

If you need to rollback some changes you can always execute database rollback. 

```bash
$> ./alfred migration:rollback <steps>
```

Steps are meant as a migration batch. It means that you can choose to rollback one or more migrations simply changing the `steps` value.
