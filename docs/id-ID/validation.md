# Validation
Sebuah request bisa divalidasi sebelum mulai di-handle. Kamu bisa membuat sebuah struktur sederhana di direktori `app/http/validation` yang berisikan konten HTTP body request secara spesifik.

Gampangnya, jika kamu ingin mem-validasi sebuah request yang harusnya berupa json object dalam 2 field secara spesifik, kamu bisa membuat seperti berikut.

```go title="Contoh validation structure"
type Credentials struct {
  Username string `json:"username" valid:"required"`
  Password string `json:"password" valid:"required"`
}
```

Seperti yang bisa kamu lihat dari struktur diatas, terdapat dua field: Username dan Password. Tiap field ini memiliki dua tags yang berbeda.

* Tag `json` digunakan untuk men-decode raw json menjadi sebauh struct Golang menggunakan format `encoding/json` standar.
* Tag `valid` bertanggung-jawab untuk mem-validasi request yang masuk. Ada beberapa configurasi yang bisa membantumu dalam mem-validasi request. Cek dokumentasi [govalidator](https://github.com/asaskevich/govalidator) untuk informasi lebih lanjut.

Terakhir kamu harus meng-enable validation tadi ke suatu controller dengan mendaftarkannya di Validation field pada HTTP route seperti contoh di bawah.

```go title="instansiasi Validation pada HTTPRouter"
var AuthRouter = register.HTTPRouter{
  Route: []register.Route{
     {
        Name:        "login",
        Path:        "/login",
        Action:      "AuthController@JWTAuthentication",
        Method:      "POST",
        Validation:  &validation.Credentials{},
        Description: "Perform login",
        Middleware:  []register.Middleware{},
     },
   },
}
```

