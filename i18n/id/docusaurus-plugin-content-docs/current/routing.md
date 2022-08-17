# Routing
Go-Web menangani seluruh HTTP request di dalam router. Router disini memiliki struktur sederhana yang mendefinisikan tiap request/group-request yang ada dalam aplikasi web. Kamu bisa temukan dan definisikan semua router di dalam router package

Setiap router harus berupa instansiasi dari struktur register.HTTPRouter dan harus mengimplementasikan setidaknya satu route atau satu group-route.

```go title="Struktur HTTPRouter"
// HTTPRouter contains Route and Group that defines a complete HTTP Router
type HTTPRouter struct {
  Route  []Route
  Groups []Group
}
```

### Route
Struktur ini digunakan untuk mendefinisikan endpoint HTTP dan harus berupa instansiasi dari struktur `register.Route`.
```go title="Struktur Route"
// Route defines an HTTP Router endpoint
type Route struct {
  Name        string
  Path        string
  Action      string
  Method      string
  Description string
  Validation  interface{}
  Middleware  []Middleware
}
```
Seperti yang terlihat dari figur di atas, sebuah struktur Route merupukan struktur sederhana yang berisi semua informasi request:

#### Name
Mendeklarasikan nama path.
#### Path
Mendeklarasikan path endpoint.
#### Action
Mendeklarasikan path action. Bentuknya berupa string yang terdiri dari nama controller + @ simbol + method controller yang akan meng-handle request masuk: `MainController@Main`.
#### Description
Berisi deskripsi endpoint.
#### Validation
Berisi instasiasi dari sebuah struktur yang merupakan konten dari body HTTP request-mu.

Struktur ini harus mengimplementasikan tags govalidator yang akan digunakan untuk meng-validasi HTTP request yang masuk. Jika gagal akan me-return HTTP error code 422. Lihat bagian request validation untuk informasi lebih lanjut.

#### Middleware
Berisi daftar middleware yang meng-handle sebelum/sesudah masukknya sebuah request (sebelum atau sesudah main action).

### Groups
Seperti namanya, Groups field berisi daftar struktur group. Termasuk juga daftar routes yang dikelompokkan oleh sebuah prefix.

```go title="Struktur group"
// Group defines a group of HTTP Route
type Group struct {
  Name       string
  Prefix     string
  Routes     []Route
  Middleware []Middleware
}
```

#### Name
Mendefinisikan nama group.
#### Prefix
Mendefiniskan prefix HTTP untuk semua route
#### Routes
Berisi daftar struktur Route. Definisikan semua route dalam group ini.
#### Middleware
Kegunaan field ini mirip dengan Route middleware, tetapi yang ini akan meng-handle setiap route yang ada di group ini.