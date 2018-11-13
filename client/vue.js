Vue.component('carousel', { // dalam 1 component cuma bisa 1 kepala -> jd misalkan, bungkus sama div. klo ada ul & p sederajat -> yg keambil cuma ul doank
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
        config: {
            port: `http://ecommerce-server.hedyafeb.me`
        },
        register: {
            email: "",
            password: ""
        }, // password gpp kliatan, toh blom ke database, blom ada process checking
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
        file: null,
        loggedInUser: null, // nyimpen data yg login dsini ato token aja?
        currentPage: "frontPage",
        SuccessAlert: false,
        adminError: '' // define error dsini??
    },

    methods: {
        deleteItem: function(itemID) {
            axios({
                method: 'DELETE',
                url: `${this.config.port}/${itemID}`,
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
                url: `${this.config.port}/cart/currentCart`,
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
                url: `${this.config.port}/cart/addToCart`, 
                data: {itemID: item._id, itemPrice: item.price},
                headers: { accesstoken: localStorage.getItem('accesstoken')}
            })
            .then(response => {
                console.log(response.data);
                this.displayCart()
            })
            .catch(err => {
                console.log(err);
            })
        },

        checkout: function() {
            axios({
                method: 'DELETE',
                url: `${this.config.port}/cart/checkout`,
                headers: { accesstoken: localStorage.getItem('accesstoken')}
            })
            .then( response => {
                console.log(response);
                alert('Please continue your payment')
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
            event.preventDefault() // jd ga bisa click yg lain
            this.getCategoryDetails(categoryID)
            this.showProductList = true
            this.cartShow = false
            this.showFrontPage = false
            this.showLogin = false
            this.showRegister = false
        },

        getItem: function () { 
            axios.get(`${this.config.port}/item`)
            .then(response => {
                this.items = response.data        
            })
            .catch(err => {
                console.log(err);
            })
        },

        postRegister: function () {
            event.preventDefault()
            // 'http://35.241.93.117:3000/user/register'
            axios.post(`${this.config.port}/user/register`, {
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
                url: `${this.config.port}/user/login`, 
                data: {
                    email: this.login.email,
                    password: this.login.password}
            }) 
            .then( user => {
                localStorage.setItem('accesstoken', user.data.accesstoken)
                localStorage.setItem('userID', user.data.userID) // klo set di vue, bakal ilang klo di refresh ya?
                localStorage.setItem('role', user.data.role)
                this.loggedInUser = user.data.userID // bakal kganti ga? ato pake getItem localstorage
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
                url: `${this.config.port}/user/login`, 
                data: {
                    email: this.login.email,
                    password: this.login.password}
            }) 
            .then( user => {
                if (user.data.role === 'admin') {
                    localStorage.setItem('accesstoken', user.data.accesstoken)
                    localStorage.setItem('userID', user.data.userID) // klo set di vue, bakal ilang klo di refresh ya?
                    localStorage.setItem('role', user.data.role)
                    this.loggedInUser = user.data.userID // bakal kganti ga? ato pake getItem localstorage
                    this.role = user.data.role
                    this.displayCart()
                    this.currentDisplay("frontPage")
                    this.allUsers = this.getUsers()
                } 
                else {
                    alert('You are not admin, you cannot access admin page')
                }
            })
            .catch(err => {
                console.log(err);
            })
        },

        checkToken: function () { // untuk check ada loggedIn user stiap refresh page -> masukin ke created
            let existingUser = localStorage.getItem('accesstoken')
            let existingUserID = localStorage.getItem('userID') // klo set di vue, bakal ilang klo di refresh ya?
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
            this.allUsers = []
        },

        getCategory: function () {
            axios.get( `${this.config.port}/category`)
            .then( response => {
                this.categories = response.data
            })
            .catch( err => {
                console.log(err);
            })
        },

        getCategoryDetails: function(categoryID) {
            axios.get(`${this.config.port}/category/${categoryID}`)
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
                url: `${this.config.port}/admin/allUsers`,
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
        },

        uploadImage: function(event, itemID) {
            console.log('kepencet', itemID);
            console.log(event.target);
            
            let image = event.target.files[0]
            this.file = image
            let uploadData = new FormData()
            uploadData.append("image", this.file)
            axios.put(`http://localhost:3000/item/upload/${itemID}`, uploadData, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then( response => {
                console.log(response);
            })
            .catch( err => {
                console.log( err.response.data );
            })
        }, 


                
    },
    computed: { 
        getFilteredItems: function() {
            // console.log(this.search); // ga bisa console log trnyataa...
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
        // this.getUsers() // tapi masih error
    }
})