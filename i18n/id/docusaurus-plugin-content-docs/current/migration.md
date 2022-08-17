---
sidebar_position: 6
sidebar_label: Migration
---
# Migration
Migration mirip seperti version control untuk databasemu, memudahkan timmu untuk memodifikasi dan membagikan schema database aplikasinya.
Developer bisa membuat migration baru dengan cara berikut:
```bash
$ ./alfred migration:up
```
Alfred akan membuatkan migration baru di directory `/database/migration`.
Disitu kamu akan menemukan dua file .sql yang berbeda. File tadi punya nama yang mirip kecuali pas bagian akhirannya.
Yang `*_up.sql` itu untuk melakukan apa-gitu ke database, sedangkan file `*_down.sql` itu untuk
mengembalikan (rollback) perubahan ke kondisi awal. Kamu bisa menuliskan statement SQL biasa di kedua file-file tadi.

## Mengeksekusi migrations
Proses migration disini hanya akan melakukan migrasi untuk migration yang belum termigrasi. Caranya dengan menjalankan command berikut:
```bash
$ ./alfred migration:up
```
Perintah ini akan menjalankan statement SQL yang ada di tiap file `*_up.sql`.

## Rollback
Jika kamu ingin mengembalikan (roolback) perubahan yang ada, kamu bisa mengeksekusi command rollback database
berikut:
```bash
$ ./alfred migration:rollback <steps>
```
Steps yang dimaksud disini adalah kumpulan migration yang ingin di-rollback. Jadi kamu bisa pilih ingin rollback satu atau lebih migration yang ada dengan mengganti value dari `steps` tadi.

