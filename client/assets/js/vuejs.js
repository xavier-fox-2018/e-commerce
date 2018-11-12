const app = new Vue({
    el: '#app',   
    data: {
        isLogin: false,
        isHome: true,
        isRegister: false,
        logedinUser: null,

        categories: [],
        products: [],
        carts: [],
        transactions: [],
        total: 0,

        page: {
            category: true,
            cart: false,
            checkout: false,
            transactionHistory: false
        },

        notification: {
            error: null,
            succes: null
        },

        customer:{
            success: false,
            errors: [],
            fullName: '',
            email: '',
            password1: '',
            password2:''
        },

        isActive: null,
        filterProduct: ''
    },

    mounted: function () {
       this.getCategory()
       this.getProduct()
       this.checkLogin()
       this.getCart()
    },

    methods: {
        checkout: function() {
            console.log('testt')
           axios({
               method: 'POST',
               url: 'http://localhost:3000/transactions',
               headers: {
                   token: localStorage.getItem('token')
               }
           })
           .then(response => {
               this.getCart()
               this.getProduct()
                console.log(response)
           })
           .catch(err => {
               console.log(err)
           })
        },

        getTransaction: function() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/transactions',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {          
                this.transactions = response.data     
                 console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        clearNotification: function() {
            this.notification.succes = '',
            this.notification.error = ''
        },
        checkLogin: function() {
            const token = localStorage.getItem('token')           
            if (token) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        },
        showRegisterForm: function() {
            this.isRegister = true
            this.isHome = false
        },

        register: function() {
           if (this.customer.password1 !== this.customer.password2) {
                this.customer.errors.push('password doen\'t match')
           } else if (this.customer.fullName.length === 0) {
               this.customer.errors.push('fill the name')
           } else if (this.customer.email.length === 0) {
                this.customer.errors.push('fill the email')
           }else if (this.customer.password1.length === 0) {
                    this.customer.errors.push('fill the password')
            }
            else {
               axios({
                   method: 'POST',
                   url: 'http://localhost:3000/users/register',
                   data: {
                       fullName: this.customer.fullName,
                       email: this.customer.email,
                       password: this.customer.password1
                   }
               })
               .then(response => {
                  for(let i in this.customer) {
                      this.customer[i] = ''
                  }
                   this.customer.success = 'succes resgister user ' +response.data.fullName
               })
               .catch(err => {
                   console.log(err)
               })
           }
        },

        login: function() {
            axios({
                method: 'POST',
                url:'http://localhost:3000/users/login',
                data: {
                    email: this.customer.email,
                    password: this.customer.password1
                }
            })
            .then(response => {
                this.customer.email = ''
                this.customer.password1 = ''
                localStorage.setItem('token', response.data.token)
                this.checkLogin()
                this.isRegister = false
                this.clearNotification()
            })
        },

        logout: function() {
            localStorage.removeItem('token')
            this.checkLogin()
        },
        addTransaction: function(product) {    
            if (!this.isLogin) {
                this.notification.error = 'you are not logedin, please login to add transactions'
            } else {
                axios({
                    method: 'POST',
                    url: 'http://localhost:3000/cart',
                    data: {
                        product: {
                            productId: product._id,
                            qty: 1,
                            price: product.price
                        }
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.getProduct()
                    this.getCart()
                    this.carts = response.data.cart.products
                    console.log(response.data.cart.products)
                })
                .catch(err => {
                    console.log(err.response.data.message)
                })
            }
           
        },

        showCategory: function() {
            console.log(this.isLogin, 'oo')
            this.page.category = true
            this.page.cart = false
            this.page.checkout = false
            this.isHome = false
            this.transactionHistory = false
            console.log(this.isHome)
        },
        showCart: function() {
            this.page.category = false
            this.page.cart = true
            this.page.checkout = false
            this.isHome = false
            this.transactionHistory = false
            this.page.transactionHistory = false
        },
        showCheckout: function() {
            this.page.category = false
            this.page.cart = false
            this.page.checkout = true
            this.isHome = false
            this.transactionHistory = false
        },

        showtransactionHistory: function() {
            this.getTransaction()
            this.page.category = false
            this.page.cart = false
            this.page.checkout = false
            this.isHome = false
            this.page.transactionHistory = true
        },

        getCategory: function() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/categories'
            })
            .then(function (response) {
                app.categories = response.data
            })
            .catch(function (err) {
                console.log(err)
            })
        },

        getProduct: function() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/products'
            })
            .then(response => {
                this.products = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },

        getProductCategory: function(id) {
            this.isActive = id
            axios({
                method: 'GET',
                url: `http://localhost:3000/products/${id}`
            })
            .then(response => {
                // console.log(response.data)
                this.products = response.data
                // this.isActive = true
            })
            .catch(err => {
                console.log(err)
            })
        },

        getCart: function() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/cart',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                this.carts = response.data.products
                // console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },

    computed: {
        getGrandTotal: function() {
            console.log(this.carts)
            let sum = 0
            this.carts.forEach(element => {
                let subtotal = element.price * element.qty
                sum += subtotal
            })
            return this.total = sum
        }
    },

    watch: {
        filterProduct: function(newData) {
            if(newData.length > 0) {
                axios({
                    method: 'GET',
                    url: `http://localhost:3000/filterproducts/${newData}`
                })
                .then(products => {
                    this.products = products.data
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                this.getProduct()
            }         
        }
    }
})