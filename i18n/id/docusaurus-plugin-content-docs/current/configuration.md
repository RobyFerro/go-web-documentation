---
sidebar_position: 3
---
# Konfigurasi
Semua struktur konfigurasi disimpan di dalam config folder. Sedangkan untuk konfigurasi dasar disimpan di file server.go yang digunakan untuk mengkostumisasi konfigurasi web server.
Didalam config package kamu bisa menemukan struktur konfigurasi lain (MySQL, Redis dsb...) yang digunakan oleh beraneka-macam Go-Web services

Kamu juga bisa membuat konfigurasi sendiri dengan menambahkan sebuah file di config package ini, beri nama
sesuai dengan nama yang ingin kamu implementasikan.

```go title="File konfigurasi sendiri"
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
Nah, sekarang kamu bisa menggunakan configurasimu tadi dengan memangging method `config.CustomConf()`.
:::tip
Kamu juga bisa mengkapsulasikan methodmu ini kedalam system service supaya bisa digunakan pada tiap siklus http request.
:::
