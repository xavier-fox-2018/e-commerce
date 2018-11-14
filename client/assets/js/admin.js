const config = {
    host: 'http://35.229.25.90'
}

const app = new Vue({
    el: '#app',
    data: {
        page: {
            category: true,
            product: false,
            coupon: false
        },

        categories: {
            items: [],
            create: {
                name: ''
            },
            edit: {
                id: null,
                name: ''
            }
        },

        products: {
            items: [],
            create: {
                id: null,
                name: '',
                discount: 0,
                description:'',
                price: '',
                stock: 0,
                imageUrl: ''
            },
            edit: {
                id: null,
                name: '',
                discount: 0,
                description:'',
                price: '',
                category: '',
                stock: 0
            }
        }
       
    },

    created: function() {
        this.getAllCategories()
        this.getAllProducts()
    },
    methods: {
        getImage(link) {
            this.products.create.imageUrl = link.target.files[0]
        },
        showCategoryPage: function() {
            this.page.product = false
            this.page.category = true
        },
        showProductPage: function() {
            this.page.product = true
            this.page.category = false
        },

        createCategory: function() {
            axios({
                method: 'POST',
                url: `${config.host}/categories`,
                data: {
                    name: this.categories.create.name
                }
            })
            .then(response => {
                this.categories.create.name = ''
                this.getAllCategories()
            })
            .catch(err => {
                console.log(err)
            })
        },

        deleteCategory: function(id) {
            axios({
                method: 'DELETE',
                url: `${config.host}/categories/${id}`
            })
            .then(response => {
                this.getAllCategories()
            })
            .catch(err => {
                console.log(err)
            })
        },        

        updateCategory: function(category) {
            this.categories.edit.id = category._id
            this.categories.edit.name = category.name             
        },

        updateCategoryE: function() {
            axios({
                method: 'PUT',
                url: `${config.host}/categories/${this.categories.edit.id}`,
                data: {
                    name: this.categories.edit.name
                }
            })
            .then(response => {
                this.getAllCategories()
            })
            .catch(err => {
                console.log(err)
            })      
        },

        getAllCategories: function() {
            axios({
                method: 'GET',
                url: `${config.host}/categories`
            })
            .then(response => {
                this.categories.items = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },

        getAllProducts: function() {
            axios({
                method: 'GET',
                url: `${config.host}/products`
            })
            .then(response => {
                this.products.items = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },


        createProduct: function() {
            let formData = new FormData()
            formData.append('image', this.products.create.imageUrl)
            axios.post(`${config.host}/upload`, formData, {})
                .then(response => {
                    axios({
                        method: 'POST',
                        url: `${config.host}/products`,
                        data: {
                            name: this.products.create.name,
                            discount: this.products.create.discount,
                            description: this.products.create.description,
                            price: this.products.create.price,
                            category: this.products.create.id,
                            stock: this.products.create.stock,
                            image: response.data.link
                        }
                    })
                    .then(response => {
                        this.products.create.name = ''
                        this.products.create.discount = 0
                        this.products.create.description = ''
                        this.products.create.price = 0
                        this.products.create.imageUrl = ''
                        this.getAllProducts()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }) 
                .catch(err => {
                    console.log(err)
                })         
        },

        deleteProduct: function(id) {
            axios({
                method: 'DELETE',
                url: `${config.host}/products/${id}`
            })
            .then(response => {
                this.getAllProducts()
            })
            .catch(err => {
                console.log(err)
            })
        },

        updateProduct: function(product) {
                this.products.edit.id = product._id
                this.products.edit.name = product.name
                this.products.edit.discount = product.discount
                this.products.edit.description = product.description
                this.products.edit.price = product.price
                this.products.edit.category = product.category
        },

        updateProductE: function(product) {
            axios({
                method: 'PUT',
                url: `${config.host}/products/${this.products.edit.id}`,
                data: {
                    name: this.products.edit.name,
                    description: this.products.edit.description,
                    discount: this.products.edit.discount,
                    price: this.products.edit.price,
                    category: this.products.edit.category
                }
            })
            .then(response => {
                this.getAllCategories()
            })
            .catch(err => {
                console.log(err)
            })
    }

    },

   
})