---
sidebar_position: 2
---

# Penginstalan

## Penginstalan standar

Kamu bisa download dan menginstal Go-Web dengan mengikuti langkah-langkah ini:

- Download Go-Web yang dirilis dari [GitHub](https://github.com/RobyFerro/go-web)
- Ekstrak download-an tadi ke root projekmu
- Clone file env.example di directory root projekmu dengan diberi nama .env
- Sesuaikan interface server di config/server.go (opsional)
- Download semua dependencies dengan cara mengeksekusi go mod download di root projekmu
- Buat CLI utility dengan make build-cli
- Eksekusi ./alfred show:commands untuk melihat semua command yang tersedia
- Eksesuki make run untuk menjalankan http servernya

## Docker
Go-Web menyediakan sebuah file docker-compose.yml yang bisa digunakan para developer untuk men-setup
environtment development yang baru dengan lebih mudah: untuk keperluan ini pastikan Docker dan Docker-compose sudah terinstal di sistem development.

:::tip
docker-composer.yml disini sudah mendefinisikan beberapa service, jadi sudah dikonfigurasi untuk menyediakan instansi MySQL, Redis, MongoDB dan ElasticSearch; jika perlu, service lainnya bisa diinstansiasikan dengan memodifikasi file docker-compose.yml.
:::

## Mengkompile dan menjalankan
Jika kamu ingin menjalankan Go-Web untuk dicoba, kamu bisa jalankan command berikut:
```
$ make run
```
Untuk mengkompile seluruh projek, cukup jalankan:
```
$ make build
```
Kemudian untuk memulai, kamu cukup jalankan Go-Web dengan command:
```
$ ./goweb
```
Sekarang server akan mulai menerima request dari port yang sudah didefinisikan di config/server.go