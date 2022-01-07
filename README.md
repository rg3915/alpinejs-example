# alpinejs-example

Todo list made with [Alpine.js](https://alpinejs.dev/)

![https://alpinejs.dev/alpine_long.svg](https://alpinejs.dev/alpine_long.svg)

## json-server

https://github.com/typicode/json-server


### Installation

```
npm install -g json-server
```

Create a `db.json`

```json
{
  "todos": [
    {
      "id": 1,
      "task": "One"
    },
    {
      "id": 2,
      "task": "Two"
    },
    {
      "id": 3,
      "task": "Three"
    }
  ]
}
```

Run Json Server

```
json-server --watch db.json
```

## http-server

https://github.com/http-party/http-server

```
npm install --global http-server

http-server [path] [options]
```

