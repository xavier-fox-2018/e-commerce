new Vue({
  el: '#app',
  data: {
    name: '',
    price: 0,
    description: '',
    image: '',
    stock: 0,
    category: [],
    categories: [],
    items: [],
    filteredItems: [],
    carts: [],
    cartsTotal: 0,
    detail: {},
    categoryName: '',
    categoryId: '',
    role: 'customer',
    alert: '',
    isLogin: false
  },
  methods: {
    init() {
      if (localStorage.getItem('token')) {
        this.isLogin = true
        this.role = localStorage.getItem('role')
      }
      axios.get('http://localhost:3000/store/item')
        .then(response => {
          response.data.forEach(element => {
            this.items.push(element)
          })
          console.log(this.items)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addNewItem() {
      let newItem = {
        name: this.name,
        price: this.price,
        description: this.description,
        image: this.image,
        stock: this.stock,
        category: this.category
      }
      axios({
        url: `http://localhost:3000/store/item/`,
        method: 'post',
        headers: { token: localStorage.getItem('token') },
        data: newItem
      })
        .then(response => {
          this.name = ''
          this.price = 0
          this.description = 0
          this.image = ''
          this.stock = 0
          this.items.push(response.data)
          console.log(response)
          this.alert = 'New Item Successfully created!'
        })
        .catch(error => {
          console.log(error)
        })
    },
    editItem(item) {
      this.detail = item
    },
    updateItem(detail) {
      axios({
        url: `http://localhost:3000/store/item/${detail._id}`,
        method: 'put',
        headers: { token: localStorage.getItem('token') },
        data: { detail }
      })
        .then(response => {
          this.alert = 'Item successfully updated!'
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteItem(id) {
      if (confirm('Are you sure want to delete this item?')) {
        axios({
          url: `http://localhost:3000/store/item/${id}`,
          method: 'delete',
          headers: { token: localStorage.getItem('token') }
        })
          .then(response => {
            this.items = this.items.filter(element => element._id != id)
            this.alert = 'Item successfully deleted!'
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    addToCart(item) {
      for (let i in this.items) {
        if (this.items[i].name == item.name) {
          if (item.quantity > 0 && item.quantity <= this.items[i].stock) {
            this.items[i].stock -= Number(item.quantity)

            //validate if the item already in the cart
            for (var j = 0; j < this.carts.length; j++) {
              if (this.carts[j].name == item.name) {
                this.carts[j].stock -= Number(this.carts[j].quantity)
                this.carts[j].quantity = Number(this.carts[j].quantity) + Number(item.quantity)
                this.getTotal((item.quantity * item.price))
                break
              }
            }

            if (j == this.carts.length) {
              item.stock -= item.quantity
              this.carts.push(item)
              this.getTotal((item.quantity * item.price))
            }

            this.detail = {}
            console.log(this.carts)
            console.log(this.cartsTotal)
            this.alert = 'Item successfully added to cart!'
          } else {
            alert("Item must be more than 0 and less than item's stock!")
          }
        }
      }
    },
    removeFromCart(itemId) {
      for (let i in this.carts) {
        if (this.carts[i].id == itemId) {
          for (let j in this.items) {
            if (this.items[j].name == this.carts[i].name) {
              this.items[j].stock += Number(this.carts[i].quantity)
              this.cartsTotal -= Number(this.carts[i].quantity) * Number(this.carts[i].price)
              }
            }
          }
          this.carts.splice(i, 1)
      }
      this.alert = 'Item successfully removed from cart!'
    },
    convertToRupiah(data) {
      let price = data.toString()
      let str = ''
      let counter = 1
      for (let i = price.length - 1; i >= 0; i--) {
        if (counter % 3 == 0 && counter < price.length) {
            str += price[i] + '.'
        } else {
          str += price[i]
        }
        counter++
      }
      return 'Rp ' + str.split('').reverse().join('') + ',00'
    },
    getTotal(price) {
      this.cartsTotal += price
    },
    getDetail(item) {
      this.detail = {
        id: item._id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        stock: item.stock,
        quantity: 0
      }
    },
    searchByCategory(category) {
      this.filteredItems = []

      // For prettier button
      for (let i in this.categories) {
        if (this.categories[i].name != category.name) {
          this.categories[i].active = false
        } else {
          if (this.categories[i].active) {
            this.categoryName = ''
            this.categoryId = ''
            this.categories[i].active = false
          } else {
            this.categories[i].active = true
            this.categoryName = category.name
            this.categoryId = category.id
          }
        }
      }
      axios.get(`http://localhost:3000/store/category/${this.categoryId}`)
        .then(response => {
          response.data.forEach(element => {
            this.filteredItems.push(element)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCategories() {
      axios.get('http://localhost:3000/store/category')
        .then(response => {
          response.data.forEach(element => {
            this.categories.push({ name: element.name, id: element._id })
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkout() {
      location.reload()
      // for (let i in this.carts) {
      //   axios.post(`http://localhost:3000/store/item/${this.carts[i].id}/stock`, {
      //     stock: this.carts[i].stock
      //   })
      // }
      // console.log('masuk')
      // axios.post('http://localhost:3000/transaction', {
      //   items: this.carts,
      //   total: this.cartsTotal
      // })
      //   .then(response => {
      //     console.log('masuksini')
      //     console.log(response)
      //     this.carts = []
      //     this.cartsTotal = 0
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    addNewCategory() {
      axios({
        url: 'http://localhost:3000/store/category', 
        method: 'post',
        headers: { token: localStorage.getItem('token') },
        data: { name: this.name }
      })
        .then(response => {
          this.name = ''
          this.categories.push({ name: response.data.name, id: response.data._id })
          this.alert = 'New category has been created!'
        })
        .catch(error => {
          this.alert = error.response.data.message
          console.log(error)
        })
    },
    deleteCategory(id) {
      if (confirm('Are you sure want to delete this category?'))
      axios({
        url: `http://localhost:3000/store/category/${id}`,
        method: 'delete',
        headers: { token: localStorage.getItem('token') }
      })
        .then(response => {
          this.categories = this.categories.filter(element => element.name != response.data.name)
          this.alert = 'The category has been deleted'
        })
        .catch(error => {
          this.alert = error.response.data.message
          console.log(error)
        })
    },
    closeAlert() {
      this.alert = ''
    },
    signOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      location.replace('/login.html')
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.getCategories()
  }
})