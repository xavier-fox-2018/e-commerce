Vue.component('right-content', {
    data: function(){
        return{
            host: 'https://ecom-server.ndiw.online',
            addItemName: '',
            addItemImage: '',
            addItemIsActive: '',
            addItemCategory: '',
            addItemStock: '',
            addItemPrice: '',
            addItemDescription: '',
            editImageStatus: '',
            idEditItem: '',
            notifFormItemOK: '',
            notifFormItemErr: '',
            detailName: '',
            detailId: '',
            detailCategory: '',
            detailPrice: '',
            detailStock: '',
            detailDescription: '',
            detailImage: '',
            filterDateStart: '',
            filterDateEnd: '',
            filterResult: [],
            trxDetail: {},
            trxDate: '',
            trxName: '',
            trxTtl: 0,
            itemReportYear: '',
            itemReportMount: '',
            itemReportResult: []
        }
    },
    props: ['getAllItems', 'getUserData', 'getCategory', 'categories', 'user', 'items', 'report', 'itemReport', 'itemrep'],
    methods: {
        modalEditItem(id){
            this.editImageStatus = false
            this.notifFormItemOK = ''
            this.notifFormItemErr = ''
            this.getCategory()
            axios({
                method: 'GET',
                url: `${this.host}/items/${id}`
            })
            .then((result) => {
                this.addItemName = result.data.name
                this.addItemCategory = result.data.category._id
                this.addItemStock = result.data.stock
                this.addItemPrice = result.data.price
                this.addItemDescription = result.data.description
                this.idEditItem = result.data._id
                $('#modalEditItem').modal('show')
            }).catch((err) => {
                console.log(err); 
            });
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
                this.detailId = result.data._id
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
        onFileChange(event) {            
            // console.log(event.target.files);
            this.addItemImage = event.target.files[0]
            this.editImageStatus = true
        },
        clearFormItem(){
            this.notifFormItemOK = ''
            this.notifFormItemErr = ''
            this.addItemName = ''
            this.addItemImage = ''
            this.addItemCategory = ''
            this.addItemStock = ''
            this.addItemPrice = ''
            this.addItemDescription = ''
        },
        editItem(id){
            if(this.editImageStatus){
                let formData = new FormData()
                formData.append('name', this.addItemName)
                formData.append('category', this.addItemCategory)
                formData.append('stock', this.addItemStock)
                formData.append('price', this.addItemPrice)
                formData.append('description', this.addItemDescription)
                formData.append('image', this.addItemImage)

                axios.put(`${this.host}/items/image/${id}`, formData, {
                    headers: {
                        token: localStorage.getItem('tokenEC')
                    }
                })
                .then((result) => {
                    // console.log(result.data.message);
                    this.clearFormItem()
                    this.notifFormItemOK = result.data.message
                    this.getAllItems()
                    $('#modalEditItem').modal('hide')
                }).catch((err) => {
                    console.log(err.response);
                    this.notifFormItemOK = ''
                    this.notifFormItemErr = ''
                    // this.notifFormItemErr = err.response.data.errmsg
                    this.notifFormItemErr = err.response.data.message
                });

            } else {
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
                    this.clearFormItem()
                    this.notifFormItemOK = result.data.message
                    this.getAllItems()
                    $('#modalAddItem').modal('hide')
                }).catch((err) => {
                    // console.log(err.response.data.message);
                    this.notifFormItemOK = ''
                    this.notifFormItemErr = ''
                    this.notifFormItemErr = err.response.data.message
                }); 
            }
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
                // console.log(result.data.message);
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
                this.getUserData()                
                this.getAllItems()
                // this.countTotal()
            }).catch((err) => {
                console.log(err.response);
            });
        },
        filter(){
            this.filterResult = []
            axios({
                method: 'GET',
                url: `${this.host}/transactions/${this.filterDateStart}/${this.filterDateEnd}`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                }
            })
            .then((result) => {
                this.filterResult = result.data
            }).catch((err) => {
                console.log(err);
                
            });
        },
        detailTrx(id){
            axios({
                method: 'GET',
                url: `${this.host}/transactions/${id}`,
                headers: {
                    token: localStorage.getItem('tokenEC') 
                }
            })
            .then((result) => {
                // console.log(result.data);
                // this.trxNo = result.data._id,
                this.trxDate = result.data.createdAt.slice(0, 10),
                this.trxName = result.data.customerId.name,
                // this.trxItems = result.data.items
                this.trxDetail = result.data
                this.trxTtl = 0
                this.trxDetail.items.forEach(item => {
                    this.trxTtl += item.subTotal
                });                
                $('#modalDetailtrx').modal('show')
            }).catch((err) => {
                console.log(err);
            });
        },
        filterItemReport(){
            axios({
                method: 'GET',
                url: `${this.host}/transactions/itemreport/${this.itemReportYear}/${this.itemReportMount}`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                }
            })
            .then((result) => {
                // console.log(result);
                this.itemReportResult = result.data
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    template: `
        <div>
            <div class="ui link cards" v-if="!report && !itemrep">
                <div class="card" v-for='item in items' >
                        <div class="image">
                            <img :src="item.image" style="height:300px">
                        </div>
                        <div class="content">
                            <div class="header" @click="getDetail(item._id)">{{item.name}}</div>
                            <div class="meta">
                                <a>{{item.category.name}}</a>
                            </div>
                            
                            <div class="description">
                                <h3>Price: Rp. {{item.price.toLocaleString()}}</h3>
                            </div>
                        </div>
                    <div class="extra content">
                        <span class="right floated">
                            Review                                
                        </span>
                        <span>
                            Stok: {{item.stock}}
                        </span>
                    </div>
                    <div class="extra content center aligned">
                        <div class="ui grey button" @click="modalEditItem(item._id)" v-if="user && user.isAdmin===true">Edit</div>
                        <div class="ui grey button" @click="deleteItem(item._id)" v-if="user && user.isAdmin===true">Delete</div>
                        <div class="ui grey button" @click="addToCart(item._id)" v-if="user && !user.isAdmin">Add Cart</div>
                    </div>
                </div>
            </div>
            
            <!-- report TRANSACTION page -->
            <div  v-if="user && user.isAdmin && report">   
                <div class="ui container center aligned">
                    <div class="ui form">
                        <div class="header">
                            <h2>Transaction</h2>
                        </div>
                        <div class="four fields center aligned" >
                            <div class="field"></div>
                            <div class="field">
                                <div class="ui input left icon">
                                    <i class="calendar icon"></i>
                                    <input type="date" v-model="filterDateStart">
                                </div>
                            </div>
                            to 
                            <div class="field">
                                <div class="ui input left icon">
                                    <i class="calendar icon"></i>
                                    <input type="date" v-model="filterDateEnd">
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui grey button" @click="filter">Filter</div>
                            </div>
                            
                        </div>
                        <div class="field">
                            <table class="ui table">
                                <tr>
                                    <th>Transaction No</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                                <tr v-for="result in filterResult">
                                    <td>{{result._id}}</td>
                                    <td>{{result.createdAt.slice(0,10)}}</td>
                                    <td>{{result.customerId.name}}</td>
                                    <td>Rp. {{ Number(result.paymentTotal).toLocaleString() }}</td>
                                    <td > <a href="#" @click="detailTrx(result._id)">detail</a> </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>            
            </div>

            <!-- Item Report Page  -->
            <div class="" v-if="user && user.isAdmin && itemrep">
                <div class="ui container">
                    <div class="ui form">
                        <div class="header">
                            <h3>Item Report</h3>
                        </div>
                        <div class="content">
                            <!-- <div class="ten wide column"> -->
                                <div class=" five fields">
                                    <div class="field">
                                        <label for="">month :</label>
                                        <select v-model="itemReportMount">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </div>
                                    <div class="field">
                                        <label for="">Year</label>
                                        <select v-model="itemReportYear">
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                        </select>
                                    </div>
                                    <div class="field">
                                    <label for=""></label>
                                        <div class="ui grey button" @click="filterItemReport">Filter</div>
                                    </div>
                                </div>
                            <!-- </div> -->
                            <div class="seven wide column">
                                <div class="field">
                                    <table class="ui table">
                                        <tr>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                        </tr>
                                        <tr v-for="result in itemReportResult">
                                            <td><a href="#" @click="getDetail(result.id)">{{result.name}}</a></td>
                                            <td>{{result.qty}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- modal detail product-->
            <div class="ui small modal" id="modalProduct">
                <div class="header">
                    <h3>Detail Product</h3>
                </div>
                <div class="content">
                    <div class="ui grid segment" style="height:250px;">
                        <div class="ui six wide column">
                            <div class="ui image">
                                <img :src="detailImage" alt="">
                            </div>
                        </div>
                        <div class="ui ten wide column">
                            <div class="ui content">
                                <div class=" ui header">
                                    <h2>{{detailName}}</h2>
                                </div>
                                <div class="meta">
                                    Category: {{detailCategory}}
                                </div>
                                <div class="field segment" >
                                    stock: {{detailStock}}
                                </div>
                                <div class="field" style="font-size:20px">
                                    Price: Rp. {{detailPrice.toLocaleString()}}
                                </div>
                            </div>
                            <div class="extra content">
                            </div>
                        </div>
                    </div>
                    <div class="ui grid" style="height: 250px;">
                        <div class="sixteen wide column">
                            <div class="ui top attached tabular menu">
                                <a class="item active" data-tab="first">Description</a>
                                <a class="item" data-tab="second">Review</a>
                            </div>
                            <div class="ui bottom attached tab segment active" data-tab="first">
                                {{detailDescription}}
                            </div>
                            <div class="ui bottom attached tab segment" data-tab="second">
                                review
                            </div>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <div class="ui grey deny button">Close</div>
                </div>
            </div>
            <!-- akhir modal detail product -->

            <!-- modal edit item -->
            <div class="ui small modal" id="modalEditItem" v-if="user && user.isAdmin">
                <div class="ui header">
                    <h3>Edit Item</h3>
                </div>
                <div class="content">
                    <div class="ui form">
                        <div class="ui red message" v-if="notifFormItemErr" >{{notifFormItemErr}}</div>
                        <div class="ui green message" v-if="notifFormItemOK" >{{notifFormItemOK}}</div>
                        <div class="ui one field">
                            <div class="sixteen wide field">
                                <label for="">Item Name</label>
                                <input type="text" v-model="addItemName">
                            </div>
                        </div>
                        <div class="ui three fields">
                            <div class="field">
                                <label for="">Category</label>
                                <select class="ui simple dropdown" v-model="addItemCategory">
                                    <option v-for="category in categories" class="item" :value="category._id">{{ category.name }}</option>
                                </select>
                            </div>
                            <div class="field">
                                <label for="">Stock</label>
                                <input type="text" placeholder="stock" v-model="addItemStock">
                            </div>
                            <div class="field">
                                <label for="">Price (Rp)</label>
                                <input type="text" placeholder="Price" v-model="addItemPrice">
                            </div>
                        </div>
                        <div class="ui one field">
                            <label for="">Product Image</label>
                            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" @change="onFileChange">
                        </div>
                        <div class="ui one field">
                            <label for="">Description</label>
                            <textarea rows="10" v-model="addItemDescription"></textarea>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <div class="ui grey button" @click="editItem(idEditItem)">Edit Item</div>
                    <div class="ui cancel button">Cancel</div>
                </div>
            </div>
            <!--  -->

            <!-- modal detail trx -->
            <div class="ui large modal" id="modalDetailtrx" style="padding:50px;">
                <div class="ui header">
                    Transaction No : {{trxDetail._id}}
                </div>
                <div class="content">
                    <div class="ui form">
                        <div class="four fields">
                            <div class="field">
                                <h4>DATE</h4>
                            </div
                            <div class="field">
                                <p>: {{trxDate}}</p>
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                NAMA : {{trxName}}
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                Payment Name  : {{trxDetail.paymentName}}              
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                Payment Status  : {{trxDetail.paymentStatus}}                           
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                Shipping Courir : {{trxDetail.shippingCourir}}                            
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                Shipping Address : {{trxDetail.shippingAddress}}                            
                            </div>
                        </div>
                        <div class="field">
                            <table class="ui table">
                                <tr>
                                    <th>Items</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                                <tr v-for="item in trxDetail.items">
                                    <td>{{item.name}}</td>
                                    <td>{{item.qty}}</td>
                                    <td>Rp. {{item.price.toLocaleString()}}</td>
                                    <td>Rp. {{item.subTotal.toLocaleString()}}</td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        TOTAL
                                    </td>
                                    <td>Rp. {{trxTtl.toLocaleString()}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
    
    
    