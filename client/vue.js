Vue.component('carousel', {
    template: `
    <div id="carousel1" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img class="d-block w-100 img-fluid" src="arch1.jpg" alt="First slide">
            </div>
            <div class="carousel-item">
            <img class="d-block w-100 img-fluid" src="arch2.jpg" alt="Second slide">
            </div>
            <div class="carousel-item">
            <img class="d-block w-100 img-fluid" src="arch3.jpg" alt="Third slide">
            </div>
            <div class="carousel-item">
            <img class="d-block w-100 img-fluid" src="front1.jpg" alt="Third slide">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carousel1" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel1" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    `
})


var app = new Vue({
    el: '#app',
    data: {
        register: {
            email: "",
            password: ""
        }, 
        login: {
            email: "",
            password: ""
        },
        role: "",
        categories: [],
        search: "",
        items: [],
        cart: [],
        allUsers: [], 
        message: "",
        grandTotal: 0,
        loggedInUser: null, 
        currentPage: "frontPage",
        SuccessAlert: false,
        adminError: '' 
    },

    methods: {
        deleteItem: function(itemID) {
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/item/${itemID}`,
                headers: { accesstoken: localStorage.getItem('accesstoken')}
            })
            .then(response => {
                console.log(response);
                
            })
            .catch(err => {
                console.log(err);
            })
        },

        displayCart: function() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/cart/currentCart',
                headers: { accesstoken: localStorage.getItem('accesstoken')}
            })
            .then( response => {
                this.cart = response.data.cartItems
                console.log(this.cart);
                
            })
            .catch(err => {
                console.log(err);
            })
        },

        addToCart: function(item) {
            console.log(item._id);
            axios({
                method: 'POST',
                url: `http://localhost:3000/cart/addToCart`, 
                data: {itemID: item._id, itemPrice: item.price},
                headers: { accesstoken: localStorage.getItem('accesstoken')}
            })
            .then(response => {
                console.log(response.data);
                
            })
            .catch(err => {
                console.log(err);
            })
        },

        checkout: function() {
            axios({
                method: 'DELETE',
                url: 'http://localhost:3000/cart/checkout',
                headers: { accesstoken: localStorage.getItem('accesstoken')}
            })
            .then( response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
        },

        currentDisplay: function(display) {
            event.preventDefault()
            this.currentPage = display
        },

        clickCategoryDetails: function(categoryID) {
            event.preventDefault() 
            this.getCategoryDetails(categoryID)
            this.showProductList = true
            this.cartShow = false
            this.showFrontPage = false
            this.showLogin = false
            this.showRegister = false
        },

        getItem: function () { 
            axios.get('http://localhost:3000/item')
            .then(response => {
                this.items = response.data        
            })
            .catch(err => {
                console.log(err);
            })
        },

        postRegister: function () {
            event.preventDefault()
            axios.post('http://localhost:3000/user/register', {
                email: this.register.email,
                password: this.register.password
            })
            .then(response => {
                console.log(response);
                this.message = 'Thank you, you have been registered'
                this.SuccessAlert = true
            })
            .catch(err => {
                console.log(err);
            })
        },

        postLogin: function () {
            event.preventDefault()
            console.log(this.login.email);
            axios({
                method: 'POST',
                url: `http://localhost:3000/user/login`, 
                data: {
                    email: this.login.email,
                    password: this.login.password}
            }) 
            .then( user => {
                localStorage.setItem('accesstoken', user.data.accesstoken)
                localStorage.setItem('userID', user.data.userID) 
                localStorage.setItem('role', user.data.role)
                this.loggedInUser = user.data.userID 
                this.role = user.data.role
                this.displayCart()
                this.currentDisplay("frontPage")
                
            })
            .catch(err => {
                console.log(err);
            })
        },

        postAdminLogin: function () {
            event.preventDefault()
            console.log(this.login.email);
            axios({
                method: 'POST',
                url: `http://localhost:3000/user/login`, 
                data: {
                    email: this.login.email,
                    password: this.login.password}
            }) 
            .then( user => {
                if (user.data.role === 'admin') {
                    localStorage.setItem('accesstoken', user.data.accesstoken)
                    localStorage.setItem('userID', user.data.userID) 
                    localStorage.setItem('role', user.data.role)
                    this.loggedInUser = user.data.userID 
                    this.role = user.data.role
                    this.displayCart()
                    this.currentDisplay("frontPage")
                } 
                else {
                    alert('You are not admin, you cannot access admin page')
                }
            })
            .catch(err => {
                console.log(err);
            })
        },

        checkToken: function () { 
            let existingUser = localStorage.getItem('accesstoken')
            let existingUserID = localStorage.getItem('userID') 
            let existingRole = localStorage.getItem('role')
            if (existingUser) {
                this.loggedInUser = existingUser
                this.role = existingRole

            }
        },

        logout: function () {
            localStorage.removeItem('accesstoken')
            localStorage.removeItem('userID')
            localStorage.removeItem('role')
            this.loggedInUser = null
            this.role = null
            this.currentDisplay("login")
        },

        getCategory: function () {
            axios.get('http://localhost:3000/category')
            .then( response => {
                this.categories = response.data
            })
            .catch( err => {
                console.log(err);
            })
        },

        getCategoryDetails: function(categoryID) {
            axios.get(`http://localhost:3000/category/${categoryID}`)
            .then( response => {
                console.log(response.data.items);
                this.items = response.data.items
            })
            .catch(err => {
                console.log(err);
                
            })
        },

        getUsers: function() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/admin/allUsers',
                headers: { 
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then(response => {
                console.log('all usersss', response.data);
                this.allUsers = response.data
            })
            .catch(err => {
                console.log(err);
            })
        }
                
    },
    computed: { 
        getFilteredItems: function() {
            // console.log(this.search); 
            // return this.items[0].name
            // let items = ['makan, minum, baju']
            // return this.items.filter(item => {
            //     return item.name.includes(this.search) 
            // })
        },

        getGrandTotal: function() {
            for (let i = 0; i < this.cart.length; i++) {
                this.grandTotal += this.cart[i].subTotal
            }
            return this.grandTotal
        }
    },
    created: function() {
        this.checkToken()
        this.getItem() 
        this.getCategory() 
        this.displayCart()
        this.getUsers() 
    }
})