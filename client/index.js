
var app = new Vue({
    el: '#app',
    data: {
        host: 'http://localhost:3000',
        user: null,
        regisName: '',
        regisEmail: '',
        regisPassword: '',
        loginEmail: '',
        loginPassword: '',
        addItemName: '',
        addItemIsActive: '',
        addItemCategory: '',
        addItemStock: '',
        addItemPrice: '',
        addItemDescription: '',
        categoryName: '',
        categories: [],
        items: [],
        detailName: '',
        detailCategory: '',
        detailPrice: '',
        detailStock: '',
        detailDescription: '',
        detailImage: '',
        idEditItem: '',
        btnEditCategory: '',
        notifCategory:'',
        notifRegFail: '',
        notifRegSuccess: '',
        notifLogSuccess: '',
        notifLogFail: '',
        notifFormItemOK: '',
        notifFormItemErr: '',
        modeEditItem: false,
        test:false,
        keySearch: ''

    },
    created(){
        this.getUserData()
        this.getAllItems()
        this.getCategory()
    },
    methods: {
        modalRegister(){
            this.clearFormRegister()
            this.regisName = ''
            this.regisEmail = ''
            this.loginEmail = ''
            $('#formRegister').modal('show')    
        },
        modalAddItem(){
            this.notifFormItemOK = ''
            this.notifFormItemErr = ''
            this.modeEditItem = false
            this.getCategory()
            $('#modalAddItem').modal('show')
        },
        modalEditItem(id){
            this.notifFormItemOK = ''
            this.notifFormItemErr = ''
            this.getCategory()
            this.modeEditItem = true
            axios({
                method: 'GET',
                url: `${this.host}/items/${id}`
            })
            .then((result) => {
                console.log(result.data);
                this.addItemName = result.data.name
                this.addItemCategory = result.data.category._id
                this.addItemStock = result.data.stock
                this.addItemPrice = result.data.price
                this.addItemDescription = result.data.description
                this.idEditItem = result.data._id
                $('#modalAddItem').modal('show')
            }).catch((err) => {
                console.log(err); 
            });
        },
        modalCategory(){
            this.getCategory()
            this.categoryName = ''
            $('#modalCategory').modal('show')
        },
        clearFormRegister(){
            this.notifLogSuccess = ''
            this.notifLogFail = ''
            this.notifRegFail = ''
            this.notifRegSuccess = ''
            this.regisPassword = ''
            this.loginPassword = ''
        },
        register(){
            axios({
                method: 'POST',
                url: `${this.host}/users`,
                data: {
                    name: this.regisName,
                    email: this.regisEmail,
                    password: this.regisPassword
                }
            })
            .then((result) => {
                // console.log(result.data.message);
                this.clearFormRegister()
                this.notifRegSuccess = result.data.message
            }).catch((err) => {
                console.log(err.response);
                this.clearFormRegister()
                this.notifRegFail = err.response.data.message.slice(23)
            });
        },
        login(){
            axios({
                method: 'POST',
                url: `${this.host}/users/login`,
                data: {
                    email: this.loginEmail,
                    password: this.loginPassword
                }
            })
            .then((result) => {
                // console.log(result.data.token);
                localStorage.setItem('tokenEC', result.data.token)
                this.getUserData()
                this.clearFormRegister()
                $('#formRegister').modal('hide')

            }).catch((err) => {
                console.log(err.response);
                this.clearFormRegister()
                this.notifLogFail = err.response.data.message
            });
        },
        getUserData(){
            let token = localStorage.getItem('tokenEC')
            if(token){
                axios({
                    method: 'GET',
                    url: `${this.host}/users`,
                    headers: {
                        token: token
                    }
                })
                .then((result) => {
                    // console.log(result.data.data);
                    this.user = result.data.data
                }).catch((err) => {
                    console.log(err);
                    this.logout()
                });
            } else {
                this.logout()
            }
        },
        logout(){
            localStorage.removeItem('tokenEC')
            this.user = null
        },
        getCart(){
            this.getUserData()
            console.log(this.user);
            
            $('#modalCart').modal('show')

        },
        getDetail(id){   
            $('.menu .item')
            .tab();
            $('.ui.rating')
            .rating();
            axios({
                method: 'GET',
                url: `${this.host}/items/${id}`
            })
            .then((result) => {
                console.log(result.data);
                this.detailImage = result.data.image
                this.detailName = result.data.name
                this.detailCategory = result.data.category.name
                this.detailPrice = result.data.price
                this.detailStock = result.data.stock
                this.detailDescription = result.data.description
                $('#modalProduct').modal('show')
            }).catch((err) => {
                console.log(err.response);
                
            });
        },
        getCategory(){
            this.btnEditCategory = ''
            axios({
                method: 'GET',
                url: `${this.host}/categories`
            })
            .then((result) => {
                console.log(result.data);
                this.categories = result.data
            }).catch((err) => {
                console.log(err)
            });
        },
        addCategory(){
            axios({
                method: 'POST',
                url: `${this.host}/categories`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                },
                data: {
                    name: this.categoryName
                }
            })
            .then((result) => {
                console.log(result.data.message);
                this.notifCategory = ''
                this.categoryName = ''
                this.getCategory()
            }).catch((err) => {
                // console.log(err.response)
                this.notifCategory = err.response.data.errmsg
                this.notifCategory = err.response.data.errors.name.message
            });
        },
        editCategory(id){
            axios({
                method: 'PUT',
                url: `${this.host}/categories/${id}`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                },
                data: {
                    name: this.categoryName
                } 
            })
            .then((result) => {
                console.log(result.data.message);
                this.categoryName = ''
                this.getCategory()
            }).catch((err) => {
                console.log(err.response);
                
            });
        },
        deleteCategory(id){
            axios({
                method: 'DELETE',
                url: `${this.host}/categories/${id}`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                }
            })
            .then((result) => {
                console.log(result.data.message);
                this.getCategory()
            }).catch((err) => {
                console.log(err.response);
                
            });
        },
        getEditCategory(id, name){
            this.notifCategory = ''
            this.categoryName = name
            this.btnEditCategory = id
        },
        cancelEditCategory(){
            this.categoryName = ''
            this.btnEditCategory = ''
        },
        getItemCategory(id){
            axios({
                method: 'GET',
                url: `${this.host}/items/category/${id}`
            })
            .then((result) => {
                console.log(result.data);
                this.items = result.data
            }).catch((err) => {
                console.log(err);
            });
        },
        getAllItems(){
            axios({
                method: 'GET',
                url: `${this.host}/items`
            })
            .then((result) => {
                // console.log(result.data);
                this.items = result.data
            }).catch((err) => {
                console.log(err.response);
            });
        },
        addItem(){
            axios({
                method: 'POST',
                url: `${this.host}/items`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                },
                data: {
                    name: this.addItemName,
                    category: this.addItemCategory,
                    stock: this.addItemStock,
                    price: this.addItemPrice,
                    description: this.addItemDescription
                }
            })
            .then((result) => {
                // console.log(result.data.message);
                this.notifFormItemOK = ''
                this.notifFormItemErr = ''
                this.notifFormItemOK = result.data.message
                this.addItemName = ''
                this.addItemCategory = ''
                this.addItemStock = ''
                this.addItemPrice = ''
                this.addItemDescription = ''
                this.getAllItems()
            }).catch((err) => {
                console.log(err.response);
                this.notifFormItemOK = ''
                this.notifFormItemErr = ''
                // this.notifFormItemErr = err.response.data.errmsg
                this.notifFormItemErr = err.response.data.message
                
            });
        },
        editItem(id){
            axios({
                method: 'PUT',
                url: `${this.host}/items/${id}`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                },
                data: {
                    name: this.addItemName,
                    category: this.addItemCategory,
                    stock: this.addItemStock,
                    price: this.addItemPrice,
                    description: this.addItemDescription
                }
            })
            .then((result) => {
                // console.log(result.data.message);
                this.notifFormItemOK = ''
                this.notifFormItemErr = ''
                this.notifFormItemOK = result.data.message
                this.getAllItems()
            }).catch((err) => {
                // console.log(err.response.data.message);
                this.notifFormItemOK = ''
                this.notifFormItemErr = ''
                this.notifFormItemErr = err.response.data.message
            }); 
        },
        deleteItem(id){
            axios({
                method: 'PUT',
                url: `${this.host}/items/softDelete/${id}`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                }
            })
            .then((result) => {
                console.log(result.data.message);
                this.getAllItems()
            }).catch((err) => {
                console.log(err.response.data.message);
            }); 
        },
        addToCart(idItem){
            axios({
                method: 'POST',
                url: `${this.host}/users/cart/plus`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                },
                data: {
                    item: idItem
                }
            })
            .then((result) => {
                console.log(result);
                this.getUserData()
                this.getAllItems()
            }).catch((err) => {
                console.log(err.response);
            });
        },
        removeFromCart(idItem){
            axios({
                method: 'POST',
                url: `${this.host}/users/cart/min`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                },
                data: {
                    item: idItem
                }
            })
            .then((result) => {
                console.log(result);
                this.getUserData()
                this.getAllItems()
            }).catch((err) => {
                console.log(err.response);
            });
        },
        searchItem(){
            console.log(this.keySearch);
            
            axios({
                method: 'GET',
                url: `${this.host}/items/search/$this.keySearch)`
            })
            .then((result) => {
                console.log(result.data);
                
            }).catch((err) => {
                console.log(err);
            });
        }
    }
})
