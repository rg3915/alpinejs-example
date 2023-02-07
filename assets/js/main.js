const getName = () => ({
  name: {
    firstName: '',
    lastName: '',
  },
  fullName: function() { return `${this.name.firstName} ${this.name.lastName}` },
})

const getTodos = () => ({
  url: 'http://localhost:3000/todos',
  todos: [],
  task: '',
  required: false,
  isLoading: false,

  init() {
    this.getData()

    this.$watch('task', (newValue, oldValue) => {
      console.log(newValue, oldValue)
      if (newValue.length > 0) {
        this.required = false
      }
    })

  },

  getData() {
    this.isLoading = true
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.todos = data
        this.isLoading = false
      })
  },

  saveData() {
    if (!this.task) {
      this.required = true
      return
    }
    fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: this.task
        })
      })
      .then(response => response.json())
      .then(() => {
        this.getData()
        this.task = ''
      })
  },

  toggleDone(id, value) {
    fetch(`${this.url}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          done: value
        })
      })
      .then(response => response.json())
      .then(() => {
        this.getData()
      })
  },

  deleteTask(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(() => {
        this.getData()
      })
  },
})