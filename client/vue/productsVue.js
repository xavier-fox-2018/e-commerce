// ! PRODUCTS DATA

new Vue({
  el: '#app',
  data: {
    categories: [],
    products: [],
    search: '',
    signInState: false,
    signUpState: false
  },
  methods: {
    addProducts: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3030/api/item'
      })
        .then(result => {
          for (let i in result.data.result) {
            result.data.result[i].price = `Rp. ${(result.data.result[i].price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
            this.products.push(result.data.result[i])
          }
        })
        .catch(err => console.log(err))
    },

    // ADD CATEGORIES
    addCategories: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3030/api/category'
      })
        .then(result => {
          for (let i in result.data.result) {

            // NON VUE
            String.prototype.capitalize = function () {
              return this.charAt(0).toUpperCase() + this.slice(1);
            }

            let tempName = result.data.result[i].name.split('-').join(' ').capitalize()

            this.categories.push({
              showName: tempName,
              value: result.data.result[i].name
            })
          }

          console.log(this.categories)
        })
        .catch(err => console.log(err))
    },

    // MODAL SHOWUP
    signUpClick: function() {
      this.signUpState = !this.signUpState
      console.log(this.signUpState)
    }
  },
  computed: {
    filteredList() {
      return this.products.filter(post => {
        // console.log(post)
        return post.image.toLowerCase().includes(this.search.toLowerCase())
        // %LIKE%
        // image === name
        // name === image
      })
    }
  },
  beforeMount() {
    this.addCategories()
    this.addProducts()
  }
})