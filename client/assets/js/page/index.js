
var app = new Vue({
    el: '#app',
    data: { 
        host: 'http://localhost:3000',
        user: null,
        items: [],
        categories: [],
        report: false,
        itemrep: false
    },
    created(){
        this.getUserData()
        this.getAllItems()
        this.getCategory()
    },
    methods: {
        backFirst(){
            this.report = false
            this.itemrep = false
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
                    this.countTotal()

                }).catch((err) => {
                    console.log(err);
                    localStorage.removeItem('tokenEC')
                    this.user = null
                });
            } else {
                localStorage.removeItem('tokenEC')
                this.user = null
            }
        },
        
        countTotal(){
            this.user.total = 0
            this.user.totalQty = 0
            this.user.cart.forEach(item => {
                this.user.totalQty += item.qty
                var ttl = item.qty*item.item.price
                // console.log(ttl);
                this.user.total += ttl
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
        getItemCategory(id) {
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
        searchItem(key) {            
            if (key === '') {
                this.getAllItems()
            } else {
                axios({
                    method: 'GET',
                    url: `${this.host}/items/search/${key}`
                })
                .then((result) => {
                    // console.log(result.data);
                    this.items = result.data
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        getCategory() {
            // this.btnEditCategory = ''
            axios({
                method: 'GET',
                url: `${this.host}/categories`
            })
            .then((result) => {
                this.categories = result.data
            }).catch((err) => {
                console.log(err)
            });
        },
        reportTrx(){
            this.report = !this.report
            this.itemrep =false
        },
        itemReport(){
            this.itemrep = !this.itemrep
            this.report = false
        }
    }
})
