new Vue({
    el: "#wrapper",
    data: {
        statusLogin: false,
        registerForm: false, 
        role: '',
        stocks: '',
        carts: [],
        filterMe: '',
        registerFirstName: '',
        registerLastName: '',
        registerEmail: '',
        registerPassword: ''

    },
    computed: {
        findThis: function(){
            // return this.filterMe
            console.log()
        }
    },
    created: function(){
        this.view('','')
    },
    // mounted: function () {
    //         axios
    //             .get('http://localhost:3000/stock/view')
    //             .then((response) =>{ this.stocks = response.data
    //                 console.log(response.data)
    //             })
    //             .catch( error => { console.log( error ) })
    // },
    methods:{
        view: function(input,filter){
            if(input === '' && filter === ''){
                axios
                    .get(`http://localhost:3000/stock/view`)
                    .then((response) =>{ this.stocks = response.data
                        console.log('ini all====', response.data)
                    })
                    .catch( error => { console.log( error ) })
            }else if(filter === '' && input !== ''){
                    axios
                        .get(`http://localhost:3000/stock/view${input}`)
                        .then((response) =>{ this.stocks = response.data
                            console.log('ini khusus====',response.data)
                        })
                        .catch( error => { console.log( error ) })
            }else if(filter !== '' && input === ''){
                    axios
                        .get(`http://localhost:3000/stock/view`)
                        .then((response) =>{ 
                            let allItem = response.data
                            let filtered = []
                            for(let i = 0;i < allItem.length;i++){
                                if(allItem[i].name.indexOf(filter) !== -1){
                                    filtered.push(allItem[i])
                                }
                            }
                            this.stocks = filtered
                        })
                        .catch( error => { console.log( error ) })
                
            }
        },
        addToCart: function(item){
            let filteredStock = this.carts.findIndex(cart=>cart.name === item.name && cart.category === item.category)
            if(filteredStock !== -1){
                if(this.carts[filteredStock].stock > 0){
                    this.carts[filteredStock].qty++
                    this.carts[filteredStock].stock--
                }
            }else{
                this.carts.push(item)                       
            }
        },
        moneyConversion: function(input){
            let total = ''
            let str = String(input).split('').reverse().join('')
            for(let i = str.length-1;i >= 0;i--){
                total+=str[i]
                if(i % 3 === 0 && i !== 0){
                    total+='.'
                }
            }
            return total
        },
        totalPrice: function(){
            let total = 0
            for(let i = 0;i < this.carts.length;i++){
                let insert = this.carts[i].price * this.carts[i].qty
                total+=insert
            }
            return total
        },
        loginOrRegister(key){
            preventDefault(key);
            
            console.log('masuk form',key)
            if(key === "register"){
                this.registerForm = false
            }else if(key === "login"){
                this.registerForm = true
            }
            console.log(this.registerForm)
        },
        register(){
            axios
            .post(`http://localhost:3000/user/register`, {
                firstName: this.registerFirstName,
                lastName: this.registerLastName,
                email: this.registerEmail,
                password: this.registerPassword
            })
            .then(response => { console.log(response)})
            .catch(err => {
            console.log(err)
            })
        }
    }
})    