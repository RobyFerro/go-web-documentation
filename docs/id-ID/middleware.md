# Middleware
Middleware menyediakan mekanisme mudah untuk memeriksa dan menyaring tiap ada request yang masuk ke aplikasimu. Mirip controller, sebuah middleware bisa dibuat dengan command:
```bash
./alfred middleware:create
```
Misalnya, middleware bernama "batman" bisa dibuat dengan menjalankan command:
```bash
./alfred middleware:create batman
```
Setelah meng-eksekusi command tadi, sebuah middleware baru akan tersedia di folder `/app/http/middleware`

```go title="Middleware batman baru
package middleware

import (
    "net/http"
)

type BatmanMiddleware struct {
    Name        string
    Description string
}

// Handle description
func (BatmanMiddleware) Handle(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
        // Do stuff here if you wanna execute something before handling
          // the incoming request
          next.ServeHTTP(w, r)
          // Do something here if you wanna execute something after the request
    })
}

// GetName returns the middleware name
func (m BatmanMiddleware) GetName() string {
  return m.Name
}

// GetDescription returns the middleware description
func (m BatmanMiddleware) GetDescription() string {
  return m.Description
}


func NewBatmanMiddleware() BatmanMiddleware{
  return BatmanMiddleware{
     Name:        "BasicAuth",
     Description: "Provides basic authentication",
  }
}
```
Seperti yang sudah disebutkan sebelumnya, middleware bisa digunakan untuk memproses sebelum/sesudah request dan menggunakan method `next.ServeHTTP` untuk melanjutkan http request tadi ke controller. Kamu bisa melakukan apa-gitu sebelum atau/dan sesudah statement ini.

Seperti yang bisa kamu lihat dari contoh diatas, middleware berisi tiga method berbeda. Yang paling penting sendiri itu yang `Handle` method yang berisi logic middlaware utamanya. Method yang kedua sama yang ketiga yaitu `GetName` dan `GetDescription`, mereka berdua ini digunakan di Go-Web kernel untuk mengkategorikan tiap-tiap middleware dan tidak boleh di-edit.

Tiap middleware harus punya sebuah contructor function yang mengembalikan sebuah instance dari middleware sekarang. Kamu bisa menggunakan function ini untuk meng-enable suatu middleware pada suatu route atau group gitu, dengan menambahkannya ke Field Middleware sebuah HTTP router.

```go title="Middleware di HTTPRouter"
var AppRouter = register.HTTPRouter{
  Route: []register.Route{
     {
        Name:        "home",
        Path:        "/",
        Action:      "HomeController@Main",
        Method:      "GET",
        Description: "Main route",
        Middleware: []register.Middleware{
           middleware.NewBatmanMiddleware(),
        },
     },
  }
}
```