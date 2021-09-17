---
sidebar_position: 7
---
# Front-end
While Go-Web does not dictate which technology developers should use when building applications consuming APIs made with this Go-Web framework, it does provide foundations for building apps by suggesting the use of React and Redux.
Front-end assets and files can be found in folder `assets`
Specifically, the structure of the assets folder is simple and contains following sub folders:

* Js
  * contains JavaScript files used by the front-end application;
* CSS
  * contains JavaScript files used by the front-end application;
* View
  * contains HTML views

Because Go-Web suggests using React and Redux, developers who want to use this stack must install appropriate tools on the development machine, like NodeJS and NPM ; this document will not cover React, Redux or other front-end related topics other than a few “basic” concepts. 

For instance, the core single page application can be installed by running command
```bash
npm install
```

## Views
Views are implemented by package `http/template`; Go-Web provides a simple helper to return a view from a controller, as reported in following example:

```go title="View helper"
func (c *ViewController) Main() {
        helper.View("index.html", c.Response, nil)
}
```

Helper function View accepts three parameters:
* A view path
* An HTTP response returned by the controller
* An interface used to "fill" the view