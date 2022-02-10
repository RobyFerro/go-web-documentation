# Models
Didalam framework MVC, models bertanggung-jawab dalam melakukan interkasi logis terhadap database.
Go-Web disini mengambil fitur dari library GORM untuk melakukan modelisasi tadi (lihat dokumentasi [GORM](https://gorm.io/docs/models.html) untuk informasi lanjut terkait modeling).
Alfred may even help you to create a new model, in fact you can run the following command to automatically generate and register a custom model.
Alfred bisa membantu kamu untuk membuat sebuah model baru. malah, kamu bisa langsung coba jalankan command berikut untuk membuat sekaligus meregister sebuah custom model secara otomatis.

```
$ ./alfred model:create <nama model>
```

_Model dibuat dengan command model:create yang berlokasi di folder `database/model`_

Setiap model harus diregristrasikan didalam struktur foundation.BaseEntities yang berlokasi di `register/register.go`.

:::caution
Cara ini secara otomatis ditangani oleh prosedur milik si Alfred, tapi jika kamu ingin membuat modelnya
manual, kamu harus registrasikan juga secara manual.
:::

```go title="Struktur registrasi model di BaseEntities"
// Other BaseEntities structs...
//
// Models will handle all application models
// Here is where you've to register your custom models
// If you create a new model with Alfred it will be auto-registered
Models: register.ModelRegister{
  model.User{},
  // Here is where you’ve to register new models
},
```

## Seeding
Kamu bisa membuat database seeding dengan mengimplementasikan sebuah method Seed di dalam modelmu.
Seed ini akan mengisi table "yang dimiliki" oleh modelmu tadi dengan data tersendiri/acak.
Seperti yang terlihat di figure 4, method Seed disini memiliki sebuah loop (tergantung berapa banyak record yang ingin di-insert)
yang akan meng-create dan mengisi sebuah instansi dari modelmu tadi. Kemudian, Instasi ini akan digunakan untuk mengisi table yang ada di database.

```go title="method Seeding dari sebuah model"
// Execute model seeding
func (User) Seed(db *gorm.DB) {
    for i := 0; i < 10; i++ {
        password := gofakeit.Password(true, true, true, true, false, 32)
        encryptedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)

        user := User{
            Name:     gofakeit.FirstName(),
            Surname:  gofakeit.LastName(),
            Username: gofakeit.Username(),
            Password: string(encryptedPassword),
        }

        if err := db.Create(&user).Error; err != nil {
            exception.ProcessError(err)
        }
    }
}
```
:::tip
Go-Web menggunakan GoFakeIt untuk membuat data acak (random), lihat dokumentasi dari library tadi untuk informasi lanjut terkait implementasinya.
:::

Seeder bisa dieksekusi dengan menjalankan command berikut:
```
./alfred database:seed <nama model>
```
:::danger
Bila nama modelnya dihilangkan, command diatas akan menjalankan semua seeder model yang ada.
:::