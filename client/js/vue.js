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
    items: [
      {
        name: 'MSI GL63 8RD | i7-8750H | GTX 1050 Ti 4GB | FREE STEAM VOUCHER $15',
        image: '/images/msi gl63.png',
        stock: 5,
        price: 17000000,
        description: 'Intel Core i7-8750H Coffee Lake + HM370, RAM 8GB DDR4, \
                      SSD 128GB, HDD 1TB, VGA GTX 1050Ti 4GB, Windows 10',
        category: 'Notebook'
      }
    ],
    filteredItems: [],
    carts: [],
    cartsTotal: 0,
    detail: {},
    categoryName: '',
    categoryId: '',
    role: 'customer'
  },
  methods: {
    init: function () {
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
    addNewItem: function () {
      let newItem = {
        name: this.name,
        price: this.price,
        description: this.description,
        image: this.image,
        stock: this.stock,
        category: this.category
      }
      axios.post('http://localhost:3000/store/item', newItem)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addToCart: function (item) {
      for (let i in this.items) {
        if (this.items[i].name == item.name) {
          if (item.quantity > 0 && item.quantity <= this.items[i].stock) {
            this.items[i].stock -= item.quantity
            this.carts.push(item)
            this.getTotal((item.quantity * item.price))
            this.detail = {}
          } else {
            alert("Item must be more than 0 and cant more than item stock!")
          }
        }
      }
    },
    removeFromCart: function (itemId) {
      for (let i in this.carts) {
        if (this.carts[i].id == itemId) {
          for (let j in this.items) {
            if (this.items[j].name == this.carts[i].name) {
              this.items[j].stock += Number(this.carts[i].quantity)
              this.cartsTotal -= Number(this.carts[i].quantity) * Number(this.carts[i].price)
            }
          }
          this.carts.splice(i, 1)
        }
      }

    },
    convertToRupiah(data) {
      let price = data.toString()
      let str = ''
      let counter = 1
      for (let i = price.length - 1; i >= 0; i--) {
        if (counter % 3 == 0) {
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
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.getCategories()
  }
})