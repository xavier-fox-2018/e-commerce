Vue.config.errorHandler = function (err, vm) {
    console.log(err);
}

const server = axios.create({ baseURL:'http://localhost:3000' })
Vue.prototype.$server = server

let app = new Vue({
    el : '#app',
    data : {

        viewMode : 'main',
        editItemMode : "",

        user : null,
        items : [],
        categories : [],
        transactions : [],

        displayCart : false,
        cartId : '',
        cartItems : [],
        total : 0,

        searchInput : '',
        searcOptionKey : 'name',
        
        displayLoginRegister : false,
        loginModel : {
            email : '',
            password : ''
        },

        checkoutModel : {
            user : '',
			items : [],
			total : 0,
			status : ''
        },

        registerModel : {
            name : '',
            email : '',
            password : ''
        },

        imgInput: '',
        imgFileName : '',
        addItemModel : {
            name : '',
            img : '',
            description : '',
            price : 0,
            stock : 0,
            categories : '' 
        },

        editItemModel : {
            _id : '',
            name : '',
            img : '',
            description : '',
            price : null,
            stock : null,
            categories : '' 
        },

        report : [],

        dt : $('#transactionTable').DataTable()
    },
    computed: {
        totalQtyOfCart : function() {
            let totalQty = 0
            this.cartItems.forEach(cartItem => {
                totalQty += cartItem.quantity
            })
            return totalQty
        },
        
        itemQtyinCartItems : function () {
            let result = {}
            this.cartItems.forEach(cartItem => {
                result[cartItem._id] = {
                    quantity : cartItem.quantity
                }
            })
            return result
        }
    },
    created () {
        let token = localStorage.getItem('token')
        if(token) {
            this.getUserByToken()
            this.getUserTransactions()
        }
        
        this.dt = $('#transactionTable').DataTable(); 
        this.getItems()
        this.getCategories()

        
    },
    mounted () {
        if(this.user) {
            this.dt = $('#transactionTable').DataTable();  
            this.getUserTransactions()
        }
    },
    watch: {
        transactions(val) {
            if(this.transactions) {
                this.dt.destroy();
                this.$nextTick(() => {
                  this.dt = $('#transactionTable').DataTable()
                });
            }
        }
    },
    methods: {

        getReport() {
            let option = {}

            this.$server.post('/transactions/report', option,{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(result => {
                this.report = result.data.data
            }).catch(err => {
                console.log(err.response);
            });
        },

        getImgInput(link) {
            this.imgInput = link.target.files[0]
            this.imgFileName = link.target.files[0].name
        },

        addNewItem() {
            
            let categories = this.addItemModel.categories.split(",").map(item => item.trim());
            this.addItemModel.categories = categories

            let formdata1 = new FormData()
            formdata1.append('picturefile', this.imgInput)

            this.$server.post(`/uploads/picture`, formdata1, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then((image) => {

                    if(image) this.addItemModel.img = image.data.link

                    this.$server.post('/items', this.addItemModel,{
                        headers : {
                            token : localStorage.getItem('token')
                        }
                    })
                    .then(result => {
                        this.getItems()
                    }).catch(err => {
                        console.log(err.response);
                    });

                })
                .catch((err) => {
                    console.log(err.response);
                })

        },

        getUserTransactions() {

            this.$server.get(`/transactions`,{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.transactions = result.data
            }).catch((err) => {
                console.log(err.response.data);
            });

        },

        checkout() {
            this.checkoutModel = {
                cartId : this.cartId,
                user : this.user._id,
                items : this.cartItems,
                total : this.total,
                status : 'transfer'
            }
        },

        confirmCheckout() {

            this.$server.post('/transactions', this.checkoutModel,{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(result => {
                this.getItems()
                this.getCart(this.user._id)
                this.viewMode ='main'
                this.getUserTransactions()
            }).catch(err => {
                console.log(err.response);
            });

        },

        updateItem() {

            this.$server.put(`/items/${this.editItemModel._id}`,this.editItemModel,{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.getItems()
                this.editItemMode = ''
            }).catch((err) => {
                console.log(err.response);
            });

        },

        deleteItem(itemId) {
            let self = this
            this.$server.delete(`/items/${itemId}`,{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.getItems()
            }).catch((err) => {
                console.log(err.response);
            });

        },

        displayEditItem(itemObj){
            
            this.editItemModel = {
                _id : itemObj._id,
                name : itemObj.name,
                // img : itemObj._id,
                description : itemObj.description,
                price : itemObj.price,
                stock : itemObj.stock,
                categories : itemObj.categories 
            }
            this.editItemMode = itemObj._id

        },

        changeViewMode(viewName, backViewname) {

            if(this.viewMode != viewName) {
                this.viewMode = viewName
            } else {
                this.viewMode = backViewname || 'main'
            }

            // if(viewName == 'main') this.displayCart = false

        },

        toggleDisplayCart() {

            if(this.displayCart) {
                this.displayCart = false
            } else {
                this.displayCart = true
            }

        },

        toggleLoginRegister() {

            if(this.displayLoginRegister) {
                this.displayLoginRegister = false
            } else {
                this.displayLoginRegister = true
            }

        },

        logout() {

            this.displayLoginRegister = false
            this.changeViewMode('main')
            localStorage.clear()
            this.user = null
            this.cartItems = []
            displayLoginRegister = false

            location.reload();

        },

        getCart(userId) {

            this.$server.get(`/carts/${userId}`,{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                let Cart = result.data
                this.cartId = Cart._id
                this.cartItems = Cart.cartItems
                this.total = Cart.total
            }).catch((err) => {
                console.log(err.response.data);
            });

        },

        register() {

            this.$server.post('/register', {
                name : this.registerModel.name,
                email : this.registerModel.email,
                password : this.registerModel.password
            })
            .then(result => {
                this.registerModel = {name : '', email : '', password : ''}
                localStorage.setItem('token', result.data.token)
                this.getUserByToken()
            }).catch(err => {
                console.log(err.response.data);
            });

        },

        login() {

            this.$server.post('/login', {
                email : this.loginModel.email,
                password : this.loginModel.password
            })
            .then(result => {
                this.loginModel = { email : '', password : ''}
                localStorage.setItem('token', result.data.token)
                this.getUserByToken()
            }).catch(err => {
                console.log(err.response.data);
            });

        },

        addToCart(itemObj) {

            let InCartItem = [...this.cartItems]
            let index = InCartItem.findIndex(val => {
                return val._id == itemObj._id
            })
            if(index == -1) {
                itemObj.quantity = 1
                itemObj.subtotal = itemObj.price
                InCartItem.push(itemObj)
                this.total += itemObj.price
            } else {
                InCartItem[index].quantity += 1
                InCartItem[index].subtotal += InCartItem[index].price 
                this.total += itemObj.price
            }
            this.cartItems = InCartItem
            this.saveCartItems()
        },

        saveCartItems() {

            this.$server.put(`/carts/${this.cartId}`,{
                cartItems : this.cartItems,
                total : this.total
            },{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.getCart(this.user._id)
            }).catch((err) => {
                console.log(err.response.data);
            });

        },

        removeFromCart(itemObj, allThisItem) {

            let InCartItem = [...this.cartItems]
            let index = InCartItem.findIndex(val => {
                return val._id == itemObj._id
            })

            if(allThisItem) {
                this.total -= InCartItem[index].price * InCartItem[index].quantity
                InCartItem.splice(index,1)
            } else if(index != -1 && InCartItem[index].quantity == 1  ) {
                this.total -= InCartItem[index].price
                InCartItem.splice(index,1)
            } else {
                InCartItem[index].quantity -= 1
                InCartItem[index].subtotal -= InCartItem[index].price
                this.total -= InCartItem[index].price
            }
            this.cartItems = InCartItem
            this.saveCartItems()
        },

        getCategories() {

            this.$server.get(`/items`)
            .then((result) => {

                let categories = []
                let items = result.data
                items.forEach(item => {
                    categories.push(item.categories)
                });
                let arr = categories.join(',').split(',')
                this.categories = [ ...new Set(arr) ]

            }).catch((err) => {
                console.log(err.response.data);
            });

        },

        getUserByToken() {

            this.$server.get(`/verify`,{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.user = result.data
                this.getCart(result.data._id)
                this.getUserTransactions()
                if(result.data.role == 'admin') {
                    this.getReport()
                }
                                
                this.dt.destroy();
                this.$nextTick(() => {
                    this.dt = $('#transactionTable').DataTable()
                });
            })
            .catch(function(error) {
                console.log(error.response);
            })
            
        },

        getItems(){

            this.addItemModel = {
                name : '',
                img : '',
                description : '',
                price : 0,
                stock : 0,
                categories : '' 
            },
    
            this.editItemModel = {
                _id : '',
                name : '',
                img : '',
                description : '',
                price : null,
                stock : null,
                categories : '' 
            }


            this.$server.get(`/items`)
                .then((result) => {
                    this.items = result.data
                    this.getCategories()
                }).catch((err) => {
                    console.log(err.response);
                });

        },

        getRpFormat(num) {

            if(num){
                let rupiah = '';		
                let numrev = num.toString().split('').reverse().join('');
                for(let i = 0; i < numrev.length; i++) if(i%3 == 0) rupiah += numrev.substr(i,3)+'.';
                return 'IDR '+rupiah.split('',rupiah.length-1).reverse().join('');
            } else {
                return num
            } 
            
        },

        searchByCategory(categoryKey) {

            this.$server.post(`/items/search`,{
                    optionKey : 'categories',
                    optionValue : categoryKey
                })
                .then((result) => {
                    this.items = result.data
                }).catch((err) => {
                    console.log(err.response.data);
                });

        },

        search(optionKey, optionValue) {

            this.$server.post(`/items/search`,{
                    optionKey : optionKey,
                    optionValue : optionValue
                })
                .then((result) => {
                    this.items = result.data
                }).catch((err) => {
                    console.log(err.response.data);
                });

        },


    },
    


})