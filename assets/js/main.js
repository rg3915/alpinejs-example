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

const getStates = () => ({
  url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  isLoading: false,
  regions: [],
  states: [],
  selectedRegion: null,
  filteredStates: [],

  init() {
    this.getData()

    // com @input no select de region não deu certo.
    this.$watch('selectedRegion', (newValue, oldValue) => {
      // Filtra o array 'states' pelo ID da região selecionada e define a propriedade 'filteredStates'
      this.filteredStates = this.states.filter(state => state.region.id == newValue)
    })

  },

  getData() {
    this.isLoading = true
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        // Mapeia a resposta da API para um array de objetos com as propriedades 'id', 'name' e 'region'
        const states = data.map(state => ({ id: state.id, name: state.nome, region: state.regiao }))
                           .sort((a, b) => a.name.localeCompare(b.name))

        // Obtém um array de regiões únicas a partir do array de estados
        const regions = [...new Set(states.map(state => state.region.id))].map(regionId => {
          const regionStates = states.filter(state => state.region.id === regionId)
          return {
            id: regionId,
            name: regionStates[0].region.nome,
            states: regionStates
          }
        })

        this.regions = regions
        this.states = states
        this.filteredStates = states
        this.isLoading = false
      })

  },

})