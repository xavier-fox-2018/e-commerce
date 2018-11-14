Vue.component('nav-bar', {
    data: function(){
        return {
            host: 'http://localhost:3000',
            regisName: '',
            regisEmail: '',
            regisPassword: '',
            loginEmail: '',
            loginPassword: '',
            notifRegFail: '',
            notifRegSuccess: '',
            notifLogSuccess: '',
            notifLogFail: '',
            keySearch: '',
            shippingPage: false,
            provinces: [],
            cities: [],
            services: [],
            shipProv: '',
            shipWeight: 1000,
            shipCity: '',
            shipExp: '',
            shipService: '',
            nameDest: '',
            addressDest: '',
            paymentName: 'fake-pay'
        }
    },
    props: ['user', 'getUserData', 'getAllItems', 'getItemCategory', 'searchItem', 'getCategory', 'categories', 'backFirst'],
    created() {
        this.getCategory()
    },
    methods: {
        modalRegister() {
            this.clearFormRegister()
            this.regisName = ''
            this.regisEmail = ''
            this.loginEmail = ''
            $('#formRegister').modal('show')
        },
        clearFormRegister() {
            this.notifLogSuccess = ''
            this.notifLogFail = ''
            this.notifRegFail = ''
            this.notifRegSuccess = ''
            this.regisPassword = ''
            this.loginPassword = ''
        },
        register() {
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
                    this.clearFormRegister()
                    this.notifRegSuccess = result.data.message
                }).catch((err) => {
                    this.clearFormRegister()
                    this.notifRegFail = err.response.data.message.slice(23)
                });
        },
        login() {
            axios({
                    method: 'POST',
                    url: `${this.host}/users/login`,
                    data: {
                        email: this.loginEmail,
                        password: this.loginPassword
                    }
                })
                .then((result) => {
                    localStorage.setItem('tokenEC', result.data.token)
                    this.getUserData()
                    this.clearFormRegister()
                    $('#formRegister').modal('hide')

                }).catch((err) => {
                    this.clearFormRegister()
                    this.notifLogFail = err.response.data.message
                });
        },
        logout() {
            localStorage.removeItem('tokenEC')
            this.getUserData()
            this.backFirst()
        },
        
        addToCart(idItem) {
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
                    this.getUserData()
                    this.getAllItems()
                }).catch((err) => {
                    console.log(err.response);
                });
        },
        removeFromCart(idItem) {
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
                    // console.log(result);
                    this.getUserData()
                    this.getAllItems()
                }).catch((err) => {
                    console.log(err.response);
                });
        }, 
        getCart() {
            this.shippingPage = false
            this.getUserData()
            $('#modalCart').modal('show')
        },
        shipping(){
            if(this.user.cart.length !== 0){
                this.shippingPage = true
                axios({
                    method: 'GET',
                    url: `${this.host}/shipping`
                })
                .then((result) => {
                    // console.log(result.data);
                    this.provinces = result.data
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        getShipCity(){
            axios({
                method: 'GET',
                url: `${this.host}/shipping/${this.shipProv}`
            })
            .then((result) => {
                this.cities = result.data
            }).catch((err) => {
                console.log(err);
            });
        },
        getShipService(){
            axios({
                method: 'POST',
                url: `${this.host}/shipping`,
                data: {
                    shipWeight: this.shipWeight,
                    shipCity: this.shipCity,
                    shipExp: this.shipExp
                }
            })
            .then((result) => {
                this.services = result.data
            }).catch((err) => {
                console.log(err);
                
            });
        },
        checkout(){
            axios({
                method: 'POST',
                url: `${this.host}/transactions`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                },
                data: {
                    shippingName: this.nameDest,
                    shippingAddress: this.addressDest,
                    shippingCourir: this.shipExp,
                    shippingCost: this.shipService,
                    paymentTotal: this.user.total + this.shipService,
                    paymentName: this.paymentName
                }
            })
            .then((result) => {
                this.getUserData()
                this.getAllItems()
                this.shippingPage = false
                $('#modalCart').modal('hide')
            }).catch((err) => {
                this.getUserData()
                this.getAllItems()
                console.log(err);
                this.shippingPage = false
                $('#modalCart').modal('hide')
                
            });
        }

    },
    template: `
        <div>
            <div class="ui fixed inverted menu" style="background-color: darkslategrey">
                <div class="ui container">
                    <div class="ui item ">
                        <h3>LOGO</h3>
                    </div>
                    <div class="ui two wide column item">
                        <div class="ui simple dropdown ">
                            Category
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <div class="item" @click="getAllItems">All</div>
                                <div class="item" v-for="category in categories" @click="getItemCategory(category._id)">{{ category.name }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="ui item">
                        <div class="ui icon input column">
                            <input type="text" class="ui input" placeholder="search item" v-model="keySearch" @keyup.enter="searchItem(keySearch)">
                            <i class="inverted circular search link icon"  @click="searchItem(keySearch)"></i>
                        </div>
                    </div>
                    
                    <div class="ui right item">
                        <div class="ui vertical animated button" tabindex="0" style="margin:0px 5px" v-if="user && !user.isAdmin" @click="getCart">
                            <div class="hidden content">Cart</div>
                            <div class="visible content">
                                <i class="shop icon"></i>
                                {{user.totalQty}}
                            </div>
                        </div>
                        <!-- <div class="ui blue button" tabindex="0" style="margin:0px 5px" >
                            <div class="hidden content" v-if="user">Transaction</div>
                        </div> -->
                        <button class="ui white button" style="margin:0px 5px" v-if="user" @click="logout">Logout</button>
                        <button class="ui white button" v-if="!user" @click="modalRegister">Register / Login</button>
                    </div>

                </div>
            </div>
        
            <!-- modal register -->
            <div id="formRegister" class="ui small modal">
                <div class="ui grid" style="padding: 30px;">
                    <div class="ui eight wide column">
                        <div class="ui form" style="padding: 20px; border-right: 1px solid grey;">
                            <h2 style="text-align:center;">Register</h2>
                            <div class="one field">
                                <div class="field">
                                    <label>Name</label>
                                    <div class="ui input left icon">
                                        <i class="pencil icon"></i>
                                        <input type="text" v-model="regisName" placeholder="Name">
                                    </div>
                                </div>
                            </div>
    
                            <div class="one field">
                                <div class="field">
                                    <label>Email</label>
                                    <div class="ui input left icon">
                                        <i class="pencil icon icon"></i>
                                        <input type="email" v-model="regisEmail" placeholder="Email">
                                    </div>
                                </div>
                            </div>
                            <div class="one field">
                                <div class="field">
                                    <label>password</label>
                                    <div class="ui input left icon">
                                        <i class="pencil icon icon"></i>
                                        <input type="password" v-model="regisPassword" placeholder="password">
                                    </div>
                                </div>
                            </div>
    
                            <div class="ui red message"  v-if="notifRegFail">{{notifRegFail}}</div>
                            <div class="ui green message" v-if="notifRegSuccess">{{notifRegSuccess}}</div>
                            
                            <div class="field centered" style="text-align: center">
                                <div class="ui green teal button"  @click="register">
                                    <i class="edit icon"></i>
                                    Register
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui eight wide column" >
                            
                        <div class="ui form" style="padding: 20px; ">
                            <h2 style="text-align: center;">Login</h2>
                            <div class="ui field" >
                                <label for="">Email</label>
                                <div class="ui input left icon">
                                    <i class="pencil icon icon"></i>
                                    <input type="text" v-model="loginEmail" placeholder="Email">
                                </div>
                            </div>
                            <div class="ui field">
                                <label for="">Password</label>
                                <div class="ui input left icon">
                                    <i class="pencil icon icon"></i>
                                    <input type="password" v-model="loginPassword" placeholder="password" @keyup.enter="login">
                                </div>
                            </div>
    
                            <div class="ui red message"  style="min-height:30px; color:red" v-if="notifLogFail">{{notifLogFail}}</div>
                            <div class="ui green message" style="min-height:30px; color:red" v-if="notifLogSuccess">{{notifLogSuccess}}</div>
    
                            <div class="field" style="text-align: center;">
                                <div class="ui green teal button" @click="login">
                                    <i class="edit icon"></i>
                                    Login
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- akhir modal regiser -->
    
            <!-- modal cart -->
            <div id="modalCart" class="ui large modal " style="padding:30px;" v-if="user">
                <div v-if="!shippingPage">
                    <div class="ui ordered steps" >
                        <div class="completed step">
                            <div class="content">
                            <div class="title">Shipping</div>
                            <div class="description">Choose your shipping options</div>
                            </div>
                        </div>
                        <div class="completed step">
                            <div class="content">
                            <div class="title">Billing</div>
                            <div class="description">Enter billing information</div>
                            </div>
                        </div>
                        <div class="active step">
                            <div class="content">
                            <div class="title">Confirm Order</div>
                            <div class="description">Verify order details</div>
                            </div>
                        </div>
                    </div>

                    <div class="header">
                        <h3>Cart</h3>
                    </div>
                    <div class="ui content">
                        <table class="ui celled table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-for="item in user.cart">
                                    <td data-label="Item Name">{{item.item.name}}</td>
                                    <td class="ui center aligned" data-label="Quantity">
                                        <div class="ui icon button" style="margin-right:20px;" @click="removeFromCart(item.item._id)" ><i class="minus icon"></i></div>
                                            {{item.qty}}
                                        <div class="ui icon button" style="margin-left:20px;" @click="addToCart(item.item._id)"><i class="plus icon"></i></div>
                                    </td>
                                    <td class="ui center aligned" data-label="Price">{{item.item.price}}</td>
                                    <td data-label="Total">{{item.qty * item.item.price}}</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colspan="3" class="center aligned">Total</th>
                                    <th>{{user.total}}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="actions">
                        <div class="ui right green button" @click="shipping">Next</div>
                    </div>
                </div>
                
                <div v-if="shippingPage">
                    <div class="header">
                        <h3>Shipping</h3>
                    </div>
                    <div class="content">
                        <div class="ui form">
                            <div class="field">
                                <label for="">Name Destinantion</label>
                                <input type="text" placeholder="input name" v-model="nameDest">
                            </div>
                            <div class="field">
                                <label for="">Address Destinantion</label>
                                <input type="text" placeholder="Input full address" v-model="addressDest">
                            </div>
                            <div class="field">
                                <label for="">Province Destination</label>
                                <select name="" id="" v-model="shipProv" @change="getShipCity">
                                    <option v-for="province in provinces" :value="province.province_id">{{province.province}}</option>
                                </select>
                            </div>
                            <div class="field">
                                <label for="">City Destination</label>
                                <select name="" id="" v-model="shipCity" >
                                    <option v-for="city in cities" :value="city.city_id" >{{city.type}} {{city.city_name}}</option>
                                </select>
                            </div>
                            <div class="field">
                                <label for="">Expedisi</label>
                                <select class="ui" name="" id="" v-model="shipExp" @change="getShipService">
                                    <option value="jne">JNE</option>
                                    <option value="tiki">TIKI</option>
                                    <option value="pos">POS INDONESIA</option>
                                </select>
                            </div>
                            <div class="field">
                                <label for="">Service</label>
                                <select name="" id="" v-model="shipService">
                                    <option v-for="service in services" :value="service.cost[0].value">Rp. {{service.cost[0].value}} - {{service.service}} - Estimate {{service.cost[0].etd}} hari</option>
                                </select>
                            </div>
    
                            <div class=" one field" v-if="shipService">
                                <table>
                                    <tr>
                                      <td>Shopping Cost</td>
                                        <td>:</td>
                                        <td>{{user.total}}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping Cost</td>
                                        <td>:</td>
                                        <td>{{shipService}}</td>
                                    </tr>
                                   <tr>
                                        <td>TOTAL</td>
                                        <td>:</td>
                                        <td>{{user.total + shipService}}</td>
                                    </tr>
                                </table>
                                <div class="ui grey button" @click="checkout">Checkout</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- akhir cart -->

        </div>
    `
})