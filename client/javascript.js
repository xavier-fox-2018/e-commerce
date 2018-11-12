
const e_commerce = new Vue({
    el : '#e_commerce',
    data : {

        name : '',
        email : '',
        password :'',
        error_login : null,
        error_signup :null,
        success_signup : null,

        carts : [],
        user_login:false,
        now_category : '',
        role : localStorage.getItem('role') || 'member',

        //data
        categories :null,
        now_category : 'elektronik',
        items : null,

        
        
        open_form : 'item',
        //form input item
        file : null,
        item_id : null,
        error_add_item : null,
        success_add_item : null,
        operation : 'add',
        name : '',
        description : '',
        stock : 0,
        price : 0,
        category_id : null,

        //user
        users : [],
        user_id : null,
        error_add_user : '',
        success_add_user:'',
        name_user : '',
        email : '',
        password : '',

        //form-category
        error_add_category : '',
        success_add_category : '',
        category_id : null,
        category_name: '',


        //transactions
        transactions : []




       
    },
    methods : {
        isLogin : function(){
            if ( localStorage.getItem('token') ){
                this.user_login = true
            }else {
                this.user_login = false
            }

            if ( localStorage.getItem('role') ) {
                this.role = localStorage.getItem('role')
            }else{
                this.role = 'member'
            }

            if ( localStorage.getItem('cart')) {
                this.carts = JSON.parse(localStorage.getItem('cart'))
            }
        },
        login: function(){
            
            this.error_login = null
            axios({
                method : 'POST',
                url : 'http://localhost:3000/users/signin',
                data: {
                    email : this.email, password: this.password
                }
            })
            .then( user => {
                let jtoken = user.data.jtoken
                let role = user.data.view
               
                if( user.data.cart ) {
                    let cart = user.data.cart
                    this.carts = cart
                    localStorage.setItem('cart',JSON.stringify(cart))
                }

                localStorage.setItem('token', jtoken)
                localStorage.setItem('role', role)

                this.isLogin()
                this.clear()
            })
            .catch( error => {
                this.email = ""
                this.password = ""
                this.error_login = error.response.data.message
            })
        },
        signup: function(){
            axios({
                method : 'post',
                url :'http://localhost:3000/users/signup',
                data : {
                    name : this.name, email: this.email, password : this.password
                }
            })
            .then( user => {
                this.success_signup = 'Succes! Registered.'
            })
            .catch( error =>{
                this.error_signup = error.response.data.message
            })
        },
        logout : function(){
            localStorage.clear()
            this.isLogin()
        },
        getAll : function(){
            axios({
                method : 'GET',
                url : 'http://localhost:3000/categories'
            })
            .then( categories =>{
                this.categories = categories.data.categories
                this.changeCategories(this.now_category)

            })
            .catch( error=> {
                console.log(error.response)
            })


            
        },
        changeCategories: function(value){
            
            this.now_category = value
            let itemsSelected = this.categories.find(category =>{
                return category.name === this.now_category
            })
            
            this.items = itemsSelected.item_list
           
        },
        addItem : function(){
            this.error_add_item = null
            this.success_add_item = null

            let formData = new FormData()
            formData.append('img',this.file)
            formData.append('category_id', this.category_id)
            formData.append('name', this.name)
            formData.append('description', this.description)
            formData.append('stock', this.stock)
            formData.append('price', this.price)

            // ,
            //     data : {
            //         category_id: this.category_id,
            //         name : this.name,
            //         description : this.description,
            //         stock : this.stock,
            //         price : this.price
            //     }
            this.isToken()
            axios({
                method : 'POST',
                url : `http://localhost:3000/categories/add-item`,
                formData,
                headers : {
                    jtoken : localStorage.getItem('token')
                }
            })
            .then( response => {
                this.name = ''
                this.description = ''
                this.stock = 0
                this.price = 0 
                this.category_id = null
                
                this.success_add_item = 'Succes! added item'
                this.getAll()
            })
            .catch( error => {
                this.error_add_item = error.response.data.message
            })
        },
        isToken: function(){
            let token = localStorage.getItem('token')

            if ( !token ) {
                alert('Maaf Anda Belum Login!')
                return
            } 
        },
        updateItem : function( id ) {
            let category = this.categories.find(category => {
                return category.name === this.now_category
            })

            let itemSelected = this.items.find(item => {
                return item._id == id
            })

            this.operation = 'update'
            
            this.name = itemSelected.name
            this.description = itemSelected.description
            this.stock = itemSelected.stock
            this.price =itemSelected.price
            this.category_id = category._id
            this.item_id = itemSelected._id
            
        },
        saveChangeItem: function(id){
            this.success_add_item = ''
            this.error_add_item = ''

            axios({
                method : 'PUT',
                url : `http://localhost:3000/items/${id}`,
                headers :{
                    jtoken : localStorage.getItem('token')
                },
                data : {
                    name : this.name,
                    description : this.description,
                    stock : this.stock,
                    price : this.price,
                    category_id : this.category_id
                }
            })
            .then( response => {
                this.success_add_item = 'Succes Updated Item!'
                this.clear()
                this.getAll()
            })
            .catch( error => {
                this.error_add_item = error.response.data.message
            })
        },
        deleteItem: function(id){
            let category = this.categories.find(category => {
                return category.name === this.now_category
            })

            axios({
                method : 'DELETE',
                url : `http://localhost:3000/categories/remove-item/${id}`,
                headers : {
                    jtoken :localStorage.getItem('token')
                },
                data:  {
                    category_id : category._id
                }
            })
            .then( response => {
                this.getAll()
            })
            .catch( error => {
                console.log(error.response)
            })
        },
        openForm: function( form ) {
            this.open_form = form

            if ( form === 'user') {
                this.readAdmin()
            }
        },
        addUserAdmin: function(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/users/create-admin',
                headers : {
                    jtoken : localStorage.getItem('token')
                },
                data : {
                    name: this.name_user,
                    email : this.email,
                    password : this.password
                }
            })
            .then( response => {
                console.log(response.data)
                this.success_add_user = `Succes Add User!`
                this.clear()
                this.readAdmin()
                
            })
            .catch( error => {
                this.error_add_user = error.response.data.message
            })
        },
        clear: function(){
            this.name = '',
            this.description = '',
            this.stock = 0,
            this.price = 0,
            this.category_id = null,
            this.name_user = '',
            this.email = '',
            this.password = '',
            this.category_name = '',
            this.category_id = null
        },
        readAdmin: function(){
            axios({
                method : 'GET',
                url : 'http://localhost:3000/users/read-admin',
                headers : {
                    jtoken : localStorage.getItem('token')
                }
            })
            .then(  response =>{
                this.users = response.data
            } )
            .catch( error => {
                console.log( error.response.data.message)
            })
        },
        updateAdmin: function(id){
            let userSelected= this.users.find( user => {
                return user._id === id
            })
            this.operation = 'update'
            this.name_user = userSelected.name
            this.email = userSelected.email
            this.user_id = userSelected._id
        },
        saveChangeAdmin : function(){
            axios({
                method : 'PUT',
                url : `http://localhost:3000/users/${this.user_id}`,
                headers :{
                    jtoken : localStorage.getItem('token')
                },
                data : {
                    name : this.name_user,
                    email : this.email,
                    password : this.password
                }
            })
            .then( response =>{
                this.success_add_user = `Succes update User!`
                this.readAdmin()
                this.clear()
            })
            .catch( error => {
                this.error_add_user = error.response.data.message
            })
        },
        deleteAdmin : function(id){
            axios({
                method : 'DELETE',
                url : `http://localhost:3000/users/${id}`,
                headers : {
                    jtoken : localStorage.getItem('token')
                }
            })
            .then( response => {
                this.readAdmin()
            })
            .catch( error => {
                console.log(error.response.data.message)
            })
        },
        addToCart : function( id ) {
            axios({
                method : 'PUT',
                url : `http://localhost:3000/categories/add-to-cart/${id}`,
                headers : {
                    jtoken : localStorage.getItem('token')
                },
                data : {
                    numberBuy : 1
                }
            })
            .then( response => {
                this.getAll()
                this.getUser()
            })
            .catch( error => {
                console.log( error.response.data.message)
            })
        },
        getUser : function(){
            axios({
                method : 'GET',
                url : 'http://localhost:3000/users/find-user',
                headers : { jtoken : localStorage.getItem('token')}
            })
            .then( response => {
                
                this.carts = response.data.carts
                let cartString = JSON.stringify(response.data.carts)
                localStorage.setItem('cart', cartString)

            })
            .catch( error => {
                console.log( error.response.data.message)
            })
        },
        subTotal : function(jumlah, harga){
            return jumlah*harga
        },
        removeFromChart : function( id ){
            axios({
                method : 'PUT',
                url : `http://localhost:3000/categories/remove-from-cart/${id._id}`,
                headers : { jtoken :localStorage.getItem('token')},
                data : { numberBuy : 1}
            })
            .then( response => {
                this.getAll()
                this.getUser()
            })
            .catch( error => {
                console.log( error.response.data.message)
            })
        },
        checkOut : function( cart_id ){
           
            let id = cart_id._id
            axios({
                method : 'POST',
                url : `http://localhost:3000/transactions/${id}`,
                headers : { jtoken : localStorage.getItem('token')}
            })
            .then( response =>{
                this.getAll()
                this.getUser()
                this.getTransaction()
            })
            .catch( error => {
                console.log( error.response.data.message)
            })
        },
        updateCategory : function( category_id) {
            let categorySelected = this.categories.find( category => {
                return category._id === category_id
            })

            this.category_name = categorySelected.name
            this.category_id = categorySelected._id
        },
        saveChangeCategory : function( ){
           
            axios({
                method : 'PUT',
                url : ` http://localhost:3000/categories/${this.category_id}`,
                headers : { jtoken : localStorage.getItem('token')},
                data : { name : this.category_name}
            })
            .then( response => {
                this.success_add_category = `Succes! update category`
                this.getAll()
                this.getUser()
                this.clear()
            })
            .catch( error => {
                this.error_add_category = error.response.data.message
            })
        },
        addCategory : function(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/categories',
                headers : { jtoken : localStorage.getItem('token')},
                data : {
                    name : this.category_name
                }
            })
            .then( response => {
                this.success_add_category = `Succes! add category`
                this.getAll()
                this.getUser()
                this.clear()
            })
            .catch( error => {
                this.error_add_category = error.response.data.message
            })
        },
        deleteCategory : function( category_id ){
            axios({
                method : 'DELETE',
                url :`http://localhost:3000/categories/${category_id}`,
                headers : { jtoken : localStorage.getItem('token')}
            })
            .then( response =>{
                this.getAll()
                this.getUser()
                this.clear()
            })
            .catch( error => {
                console.log(error.response.data.message)
            })
        },
        getTransaction : function(){
            axios({
                method : 'GET',
                url : `http://localhost:3000/transactions`,
                headers : { jtoken : localStorage.getItem('token')}
            })
            .then( response => {
                this.transactions = response.data
            })
            .catch( error =>{
                console.log(error.response.data.message)
            })
        },
        processFile: function( event ) {
            
            let image = event.target.files[0]
            this.file=image
            console.log(this.file)
        }

    },
    computed : {
        totalItemInCart : function(){
            var accumulator = 0
            let total = this.carts.reduce( function(accumulator,  cart ){
               return accumulator+cart.number
            }, accumulator)
            return total
        },
        totalHarga : function(){
            var accumulator = 0
            let total= this.carts.reduce(function(accumulator,cart){
                return accumulator +( cart.number * cart._id.price)
            }, accumulator)

            return total
        }
    },
    created :function(){
        this.isLogin()
        let cart = localStorage.getItem('cart')

        if ( cart ) {
            this.carts = JSON.parse( cart)
        }
        this.getTransaction()

        this.getAll()

    }
})

