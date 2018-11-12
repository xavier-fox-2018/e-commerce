const url = 'http://localhost:3000'

let app = new Vue ({
    el: '#app',
    mounted(){
        this.cekLogin()
        this.getCategory()
        this.cekAdmin()
        if(this.isAdmin == true ){
            this.getAllProduct()
        }else {
            this.getAllProduct()
        }
        
    },
    created(){
        
    },
    data: {
        navTitle: 'SukaLapar',
        email: '',
        password: '', 
        products: [],
        carts: [],
        quantity: 1,
        search: '',
        signName: '',
        signEmail: '',
        signPassword: '',
        productName:'',
        price: '',
        stock: '',
        description:'',
        categories: [],
        selected: '',
        title: '',
        idcat: '',
        byCategory: [],
        isLogin: false,
        isUser: false,
        isAdmin: false,
        addPicture: '',
        totalItem: 0, 
        img: ''
        

    },
    computed: {
        searchProducts() {
            return this.products.filter(post => {
              return post.name.toLowerCase().includes(this.search.toLowerCase())
            })
        },

        total(){
            return this.carts.reduce((accum, product) => {
             return accum + product.price * product.quantity
            }, 0)
        }
        
    },
    methods: {
        addCart(item) {
            let found = this.carts.findIndex(prod => {
                return prod.name == item.name
            })
            if(found === - 1){
                item.quantity += 1;
                item.stock -= 1
                this.totalItem += 1
                this.carts.push(item);
            } else {
                item.stock -= 1
                this.totalItem += 1
                this.carts[found].quantity++
            }
        },
        removeFromCart(item) {
            let index = this.carts.indexOf(item);
            if(item.quantity > 1){
                item.quantity -= 1
                item.stock += 1
                this.totalItem -= 1
            }
            else if  (index  === 0 ) {
                this.totalItem -= 1
                let product = this.carts[index];
                this.carts.splice(index, 1);
            }

        },

        signin: function(){
            // e.preventDefault()
            console.log('masuk?')
            axios({
                method: 'POST',
                url: url +'/users/signin',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response =>{
                console.log(response);
                if(response.data){
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.role)
                    window.location ='/' 
                }
            })
            .catch(err => {
                
                console.log(err); 
            })
        },

        cekAdmin: function(){
            let role = localStorage.role
            if(role === 'admin'){
                this.isAdmin = true
            }
        },


        signup: function(){
            // e.preventDefault()
            axios({
                method: 'POST',
                url: url + '/users/signup',
                data: {
                    name: this.signName,
                    email: this.signEmail,
                    password: this.signPassword
                }
            })
            .then(response =>{
                if(response.token){
                    localStorage.setItem('token', response.token)
                    window.location = '/'
                }
            })
            .catch(err=> {
                console.log(err); 
            })
        },

        cekLogin: function(){
            let token = localStorage.token
            if(token){
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        },

        logout: function (){
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            window.location ='/'
        },

        addProduct: function(){
            // e.preventDefault()
            self = this
            axios({
                method: 'POST',
                url: url+ '/product',
                data: {
                    name: this.productName,
                    price: this.price,
                    img: this.img,
                    stock: this.stock,
                    category: this.selected,
                    description: this.description, 
                },
                headers: {
                    token: localStorage.getItem('token')
                }
                
            })
            .then(response =>{
                this.getAllProduct()
                this.productName = ''
                this.price = ''
                this.img = ''
                this.stock = ''
                this.description = ''
            })
            .catch(function(err) {
                console.log(`ini`,err); 
            })
        },

        getAllProduct: function(){
            axios({
                method: 'GET',
                url: url+ '/product',
            })
            .then( response => {
                if(response.status == 200) {
                    this.products = response.data.Product
                    this.byCategory =[]
                }
            })
            .catch( err => {
                this.products = []
                console.log(`....`);
                
            })
        },
        
        deleteProduct: function(id){
            axios({
                method: 'DELETE',
                url: url+ `/product/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response =>{
                this.getAllProduct()
            })
            .catch(err =>{
                console.log(err);
                
            })
        },

        getCategory: function(){
            axios({
                method: 'GET',
                url: url+ `/category`
            })
            .then( response => {
                
                this.categories = response.data
            })
            .catch( err => {
                this.categories = []
            })
        },

        addCategory: function(){
            axios({
                method: 'POST',
                url: url+'/category/addcategory',
                data: {
                    name: this.title,
                }
            })
            .then(response =>{
                this.title = ''
                this.getCategory()
            })
            .catch(function(err) {
                console.log(err); 
            })
        },

        filterByCategory: function(id){
            axios({
                method: 'GET',
                url: url+ `/product/${id}/products`
            })
            .then(response =>{
                this.products = []
                this.byCategory = response.data
            })
            .catch(function(err) {
                console.log(err); 
            })
        },


        uploadImage : function () {
            let formdata = new FormData()
            formdata.append('image', this.addPicture);
                axios.post(`http://localhost:3000/upload`, formdata, {  
            })
            .then(response=>{
                console.log(response.data)
            
            })
            .catch(err=>{
                console.log(`ini errr`,err)
            })
        }, 

        toEdit: function(id){
            axios({
                method: 'GET',
                url: url+ `/product/${id}`,
            })
            .then(response =>{
                if(response){
                    this.productName = response.data.result.name
                    this.price = response.data.result.price
                    this.stock = response.data.result.stock
                    this.selected = response.data.result.category._id
                    this.description = response.data.result.description
                    this.idcat = response.data.result._id
                }
            })
            .catch(err=>{
                console.log(`ini errr`,err)
            })
        },

        updateData: function(id){
            axios({
                method: 'PUT',
                url: url+ `/product/${id}/editProduct`,
                data: {
                    name: this.productName,
                    price: this.price,
                    stock: this.stock,
                    category: this.selected,
                    description: this.description, 
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response =>{
                this.getAllProduct()
                this.productName = ''
                this.price = ''
                this.stock = ''
                this.selected = ''
                this.description = ''
            })
            .catch(err=>{
                console.log(`ini errr`,err)
            })
        },


        // addToCart(product) {
        //     axios({
        //         url: url+`/cart`,
        //         method: 'POST',
        //         data: {
        //             orderid: product
        //         }, 
        //         headers: {
        //             token: localStorage.getItem('token')
        //         }
        //     })
        //     .then( found => {
        //         console.log(found)
        //     })
        // }
    },


    

    

    
    


})