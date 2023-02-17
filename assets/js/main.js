const getName = () => ({
  name: {
    firstName: '',
    lastName: '',
  },
  // computed
  fullName: function() { return `${this.name.firstName} ${this.name.lastName}` }
})

const getTodos = () => ({
  url: 'http://localhost:3000/todos',
  todos: [],
  task: '',
  required: false,
  isLoading: false,

  init() {
    this.getData()

    // watch
    this.$watch('task', (newValue, oldValue) => {
      console.log(newValue, oldValue)
      if (newValue.length > 0) {
        this.required = false
      }
    })
  },

  getData() {
    this.isLoading = true

    // Pega os dados no backend com fetch.
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.todos = data
        this.isLoading = false
      })
  },

  saveData() {
    // Verifica se task foi preenchido.
    if (!this.task) {
      this.required = true
      return
    }
    // Salva os dados no backend.
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

  // Marca a tarefa como feita ou não.
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
  }
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

    // watch
    // com @input no select de region não dá certo.
    this.$watch('selectedRegion', (newValue, oldValue) => {
      console.log(newValue, oldValue)
      // Filtra o array 'states' pelo ID da região selecionada e define a propriedade 'filteredStates'.
      this.filteredStates = this.states.filter(state => state.region.id == newValue)
    })
  },

  getData() {
    this.isLoading = true

    // Pega os dados no backend com fetch.
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
  }
})

const getSales = () => ({
  urlSale: 'http://localhost:3000/sales',
  urlProduct: 'http://localhost:3000/products',
  isLoading: false,
  sales: [],
  products: [],

  init() {
    this.getData()
  },

  getData() {
    this.isLoading = true

    // Pega os dados das vendas.
    fetch(this.urlSale)
      .then(response => response.json())
      .then(data => {
        this.sales = data

        // Se estiver vazio insere uma linha vazia.
        if (this.sales.length === 0) {
          this.sales = [{
            'product': '',
            'quantity': null,
            'price': null
          }]
        }

      })

    // Pega os dados dos produtos.
    fetch(this.urlProduct)
      .then(response => response.json())
      .then(data => {
        this.products = data
        this.isLoading = false
      })
  },

  addRow() {
    this.sales.push({
      'product': '',
      'quantity': null,
      'price': null
    })
  },

  findProduct(product, index) {
    const item = this.products.find((item) => {
      return item.id == product
    })
    if (item) this.sales[index].price = item.price
  },

  async saveData() {
    for (const item of this.sales) {
      if (!item.product) {
        this.required = true
        return
      }

      // Só para manter o que está na tabela.
      await this.deleteSale(item.id)

      const response = await fetch('http://localhost:3000/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: parseInt(item.product),
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
        })
      })
      const data = await response.json()
      this.getData()
    }
  },

  async deleteSale(id) {
    const response = await fetch(`http://localhost:3000/sales/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    this.getData()
  },

  total() {
    return this.sales.reduce((acc, sale) => {
      return acc + (sale.quantity * sale.price)
    }, 0).toFixed(2)
  }
})