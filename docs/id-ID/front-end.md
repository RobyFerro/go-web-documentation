---
sidebar_position: 7
---
# Front-end
While Go-Web does not dictate which technology developers should use when building applications consuming APIs made with this Go-Web framework, it does provide foundations for building apps by suggesting the use of React and Redux.
Meskipun Go-Web tidak mematok teknologi mana yang developer harus gunakan pada saat membuat aplikasi yang meng-consume API dari Go-Web framework, Go-Web menyediakan dasar pijakan untuk membuat aplikasi front-end dengan menggunakan React dan Redux.
asset dan file Front-end bisa ditemukan di folder `assets`
Spesifiknya, struktur asset folder itu memiliki beberapa sub-folder berikut:

* Js
  * isinya file-file JavaScript yang digunakan untuk aplikasi front-end;
* CSS
  * isinya CSS files yang digunakan untuk aplikasi front-end;
* View
  * isinya HTML views

Because Go-Web suggests using React and Redux, developers who want to use this stack must install appropriate tools on the development machine, like NodeJS and NPM ; this document will not cover React, Redux or other front-end related topics other than a few “basic” concepts. 
Karena Go-WEb menyarankan penggunaan React dan Redux, para developer yang mau menggunakan stack ini harus menginstall tools tadi di development machinenya, sepert NodeJS dan NPM ; dokumentasi ini tidak akan membahas React, Redux atau front-end lain yang tidak terkait dengan topik konsep "dasar".

Gampangnya, aplikasi front-end single-page bisa diinstal dengan menjalankan command
```bash
npm install
```

## Views
Views diimplementasikan oleh package `http/template`; Go-Web menyediakan sebuah helper sederhana untuk me-return sebuah view dari controller, seperti contoh berikut:

```go title="View helper"
func (c *ViewController) Main() {
        helper.View("index.html", c.Response, nil)
}
```

Helper function View disini menerima tiga paramter:
* sebuah view path
* sebuah HTTP response yang di-return dari controller
* dan sebuah interface untuk "mengisi" view nya