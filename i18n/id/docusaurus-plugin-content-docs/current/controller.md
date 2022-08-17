# Controller
Saat memulai sebuah framework MVC, Go-Web menggunakan controller sebagai endpoint request. Disini developer bisa meng-handle semua logic yang akan diterapkan pada tiap request yang masuk. Kamu bisa membuat controller dengan menjalankan command berikut di console:
```bash
./alfred controller:create sample
```
Kemudian Go-Web akan membuatkan sebuah file .go yang berisi sebuah controller bernama “SampleController” di dalam directory `/app/http/controller`.
Isinya akan berupa seperti berikut:

```go title="SampleController Baru"
package controller

import "github.com/RobyFerro/go-web-framework"

type SampleController struct{
    gwf.BaseController
}

// Main controller method
func (c *SampleController) Main(){
    // Insert your custom logic
}
```
Ketika membuat sebuah controller, Go-Web secara otomatis akan menambahkan controller tadi ke function Main, yang mana bisa diperluas dengan beberapa logic, seperti yang dicontohkan dibawah; controller bisa diperluas dengan menambahkan public function baru.

```go title="SampleController dengan beberap logic"
// Sample controller
package controller

import (
    "github.com/RobyFerro/go-web-framework"
    "github.com/RobyFerro/go-web/exception"
)

type SampleController struct{
    gwf.BaseController
}

// Main controller method
func (c *SampleController) Main() {
    _, err := c.Response.Write([]byte("Hello world")) if err != nil {
        exception.ProcessError(err)
    }
}
```

Untuk mendapatkan akses ke semua aspek Go-Web controller, termasuk HTTP request dan response, sebuah controller haruslah meng-extend `gwf.BaseController`.

Karena service containernya digunakan untuk "menyelesaikan" semua controller di Go-Web. developer bisa type-hint tiap depedencynya karena depedency ini akan di-inject ke instansi controller, sebagaimana yang dijelaskan pada code dibawah:

```go title="SampleController dengan DependencyInjection"
// Dependency injection in controller
package controller

import (
    "github.com/RobyFerro/go-web-framework" 
    "github.com/RobyFerro/go-web/database/model" 
    "github.com/jinzhu/gorm"
)

type SampleController struct{
    gwf.BaseController
}

// Main controller method
func (c *SampleController) Main(db *gorm.DB) {
    var user model.User
    if err := db.Find(&user).Error;err != nil {
        gwf.ProcessError(err)
    }
}
```

### Menangani request
By extending `gwf.BaseController` controllers have access to the incoming request within the `Request` field.

```go title="Access to the incoming request"
// Main controller method
func (c *SampleController) Main(db *gorm.DB) {
    fmt.Println(c.Request.Method)
}
```

:::tip
Field `Request` merupakan represent sebuah pointer untuk object `http.Request` yang masuk.
:::

#### Menangani request body

Jika kamu telah mem-validasi request yang masuk dengan validation struktur, kamu bisa mengakses request data dengan mudah, termasuk value `kernel.Request` dalam parameter method.
Jadi membantu kamu untuk mengakses value yang ada tanpa harus repot-repot meng-decoding tiap request yang masuk.

Data akan ber-type `map[string]interface{}`.

```go title="Mengkases request di Controller"
// Main controller method
func (c *SampleController) Main(db *gorm.DB, req kernel.Request) {
    fmt.Println(req["name"]) // You can access to the incoming request payload with the `req` object
    
    var user model.User
    if err := db.Find(&user).Error;err != nil {
        gwf.ProcessError(err)
    }
}
```

:::caution
Karena data object di `kernel.Request` merupakan sebuah `map[string]interface{}`, maka setiap value harus meng-cast type data yang aslinya.

```go title="Contoh type casting"
req["username"]          // This was originally a string
req["username"].(string) // But you've explicitly cast to use it properly
```
:::

:::note
Kamu selalu bisa men-decode manual body request secara manual untuk menggunakan struct aslinya.
:::


### Handle response
Similar to `Request` the controller has the `Response` field that is used to handle the outgoing http response.

```go title="Handle outgoing Response in controller"
// Main controller method
func (c *SampleController) Main() {
    _, err := c.Response.Write([]byte("Hello world")) if err != nil {
        exception.ProcessError(err)
    }
}
```

:::tip
`Response` field represent a pointer to the `http.ResponseWriter` object
:::