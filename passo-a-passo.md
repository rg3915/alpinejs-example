# Alpine.js

## json-server

Primeiro vamos usar o [json-server](https://github.com/typicode/json-server) que vai nos servir uma API em backend de uma forma bem simples.

```
npm install -g json-server
```

Crie um arquivo `db.json`

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

E rode o servidor

```
json-server --watch db.json
```

## http.server

Para não abandonar o Python vamos criar um `index.html` e rodar

```
python -m http.server
```

## index.html

O conteúdo básico do index.html será:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <link rel="shortcut icon" href="https://alpinejs.dev/favicon.png">

  <title>Alpine JS</title>

  <!-- Bulma -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

  <!-- Font-awesome -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

  <!-- Alpine -->
  <script defer src="https://unpkg.com/alpinejs"></script>

  <style>
    .is-done {
      text-decoration: line-through;
    }
  </style>

</head>
<body>
  <div class="container">
    <img src="https://camo.githubusercontent.com/fdb582cadc3af8a37688d04f78a8c5876cb9142aac7c0bfc43ad1a018963a76e/68747470733a2f2f616c70696e656a732e6465762f616c70696e655f6c6f6e672e737667">
    <div class="notification is-primary">
      <p>Exemplos do <a
          href="https://alpinejs.dev/"
          target="_blank"
        >Alpine.js</a></p>
      <p>O Alpine.js basicamente trabalha com atributos, e ele tem 15 atributos.</p>
    </div>
    <div class="columns">
      <!-- START column -->
      <div class="column">
        <!-- 3 cards -->
        <!-- ASSUNTO x-data e x-text -->
        <!-- START card -->
        <!-- Precisamos colocar tudo dentro de uma div. -->
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Título</p>
          </div>
          <div class="card-content">
            <!-- Conteúdo do card -->
            <p>Conteúdo</p>
          </div>
        </div>
        <!-- END card -->
        <br>
        <!-- ASSUNTO x-if e x-show -->
        <!-- START card -->
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Título</p>
          </div>
          <div class="card-content">
            <!-- Conteúdo do card -->
            <p>Conteúdo</p>
          </div>
        </div>
        <!-- END card -->
        <br>
        <!-- ASSUNTO x-bind -->
        <!-- START card -->
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Título</p>
          </div>
          <div class="card-content">
            <!-- Conteúdo do card -->
            <p>Conteúdo</p>
          </div>
        </div>
        <!-- END card -->
      </div>
      <!-- END column -->
      <!-- START column -->
      <div class="column">
        <!-- 2 cards -->
        <!-- ASSUNTO x-model e x-ref -->
        <!-- START card -->
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Título</p>
          </div>
          <div class="card-content">
            <!-- Conteúdo do card -->
            <p>Conteúdo</p>
          </div>
        </div>
        <!-- END card -->
        <br>
        <!-- ASSUNTO Computed -->
        <!-- START card -->
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Título</p>
          </div>
          <div class="card-content">
            <!-- Conteúdo do card -->
            <p>Conteúdo</p>
          </div>
        </div>
        <!-- END card -->
      </div>
      <!-- END column -->
      <!-- START column -->
      <div class="column">
        <!-- 1 card -->
        <!-- ASSUNTO Todo list -->
        <!-- START card -->
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Título</p>
          </div>
          <div class="card-content">
            <!-- Conteúdo do card -->
            <p>Conteúdo</p>
          </div>
        </div>
        <!-- END card -->
      </div>
      <!-- END column -->
    </div>
  </div>
  <script src="/assets/js/main.js"></script>
</body>

</html>
```

## Alpine.js

O Alpine.js basicamente trabalha com atributos, e ele tem 15 atributos.

### x-data

O primeiro deles, e mais importante é o `x-data`, que você coloca na `div` principal do seu componente.

No exemplo a seguir vamos criar um objeto com dois campos:

```html
<div
  class="container"
  x-data="{ title: 'Tarefas', items: ['Um', 'Dois', 'Três'] }"
  >
  <!-- Conteúdo -->
</div>
```

### x-text

Depois vamos ver o atributo `x-text`

```html
<div
  class="container"
  x-data="{ title: 'Tarefas', items: ['Um', 'Dois', 'Três'] }"
  >
    <h1
      class="title"
      x-text="title"
    ></h1>
</div>
```

### x-for

E agora veremos o `x-for`. Mas você precisa colocar ele dentro de um `<template>`

```html
<ul>
  <template x-for="item in items">
    <li x-text="item"></li>
  </template>
</ul>
```

### x-if e x-show

O `x-if` precisa de um `<template>` para surtir efeito.

```html
<div
  class="container"
  x-data="{ isActive: true, isAdmin: false }"
>
  <h1 class="title">x-if e x-show</h1>

  <template x-if="isAdmin">
    <button class="button is-warning">Admin</button>
  </template>

</div>

<hr>
```


O `x-show` funciona direto no elemento.

```html
<button class="button is-primary" x-show="isActive">Ativo</button>
<button class="button is-danger" x-show="isAdmin">Admin</button>
```

### x-bind

Com o `x-bind` você pode tornar dinâmico qualquer atributo do elemento. No exemplo, vamos ver isso numa classe.

```html
<div
  class="container"
  x-data="{ yes: true, items: ['Um', 'Dois', 'Três'] }"
>
  <h1 class="title">x-bind</h1>

  <ul>
    <template x-for="(item, index) in items">
      <li
        x-text="item"
        :class="{ 'has-text-primary': index % 2 === 0, 'has-text-danger': index % 2 }"
      ></li>
    </template>
  </ul>

</div>

<hr>
```

### x-on

É usado num evento, exemplo clique de um botão.

```html
<button
  class="button"
  :class="{ 'is-primary': yes, 'is-danger': !yes }"
  x-text="yes"
  @click="yes =! yes"
>Toggle</button>

<span x-show="yes">SIM</span>
<span x-show="!yes">NÃO</span>
```

### x-model e x-ref

O `x-model` serve para capturar o valor de um input. E ele já é reativo.

```html
<div
  class="container"
  x-data="{ form: { firstName: '', lastName: '' }, email: '', selectedFramework: '' }"
>
  <h1 class="title">x-model e x-ref</h1>

  <input
    type="text"
    class="input"
    placeholder="Nome"
    x-model="form.firstName"
  >
  <p x-text="form.firstName"></p>

</div>

<hr>
```

O `x-ref` torna um elemento visível pelo Alpine.js. Usamos ele quando queremos fazer uma referência a um elemento com valor já existente. Mas ele não é reativo por padrão, então precisamos usar algum evento para manipular e/ou capturar seu valor.

```html
<input
  type="email"
  class="input"
  placeholder="E-mail"
  x-ref="newEmail"
  @input="email = $refs.newEmail.value"
>
<p x-text="email"></p>
```

Um exemplo mais interessante é com o `<select>`.

```html
<div class="select">
  <select
    x-ref="framework"
    @input="selectedFramework = $refs.framework.value"
  >
    <option value="">-----</option>
    <option value="1">Alpine.js</option>
    <option value="2">VueJS</option>
    <option value="3">ReactJS</option>
    <option value="4">Remix</option>
    <option value="5">Astro</option>
  </select>
</div>
<p x-text="selectedFramework"></p>
```

## Todo list

- x-data
- computed - fullName
- init()
- getData()
- isLoading
- toggleDone()
- deleteTask()

- $watch

```
x-init="$watch('task', value => {if (value.length > 0) required=false})"
```

- this.$watch()

- saveData()

- Filtrando dropdowns dependentes
