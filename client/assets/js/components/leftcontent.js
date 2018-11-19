Vue.component('left-content', {
    data: function(){
        return {
            host: 'https://ecom-server.ndiw.online',
            addItemName: '',
            addItemImage: '',
            addItemIsActive: '',
            addItemCategory: '',
            addItemStock: '',
            addItemPrice: '',
            addItemDescription: '',
            categoryName: '',
            notifFormItemOK: '',
            notifFormItemErr: '',
            modeEditItem: false,
            btnEditCategory: '',
            notifCategory:'',
            myTrx: []
        }
    },
    props: ['user', 'getCategory', 'categories', 'getAllItems', 'reportTrx', 'report', 'itemReport', 'itemrep'],
    methods: {
        modalAddItem(){
            this.notifFormItemOK = ''
            this.notifFormItemErr = ''
            this.modeEditItem = false
            this.getCategory()
            $('#modalAddItem').modal('show')
        },
        modalCategory(){
            this.getCategory()
            this.categoryName = ''
            $('#modalCategory').modal('show')
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
        onFileChange(event) {            
            // console.log(event.target.files);
            this.addItemImage = event.target.files[0]
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
        addItem(){
            let formData = new FormData()
            formData.append('name', this.addItemName)
            formData.append('category', this.addItemCategory)
            formData.append('stock', this.addItemStock)
            formData.append('price', this.addItemPrice)
            formData.append('description', this.addItemDescription)
            formData.append('image', this.addItemImage)

            axios.post(`${this.host}/items`, formData, {
                headers: {
                    token: localStorage.getItem('tokenEC')
                }
            })
            .then((result) => {
                // console.log(result.data.message);
                this.clearFormItem()
                this.notifFormItemOK = result.data.message
                this.getAllItems()
            }).catch((err) => {
                console.log(err.response);
                this.notifFormItemOK = ''
                this.notifFormItemErr = ''
                // this.notifFormItemErr = err.response.data.errmsg
                this.notifFormItemErr = err.response.data.message
            });
        },
        myHistoryTrx(){
            axios({
                method: 'GET',
                url: `${this.host}/transactions`,
                headers: {
                    token: localStorage.getItem('tokenEC')
                }
            })
            .then((result) => {
                console.log(result);
                this.myTrx = result.data
                $('#listMyTrx').modal('show')
            }).catch((err) => {
                console.log(err);
                
            });
        }


    },
    template: `
    
        <div>
            <div class="ui link cards">
                <div class="card">
                    <div class="image">
                    <img src="data:image/jpeg;base64,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">
                    </div>
                    <div class="content">
                    <div class="header">{{user.name}}</div>
                    <div class="meta">
                            <a>{{user.email}}</a>
                            </div>
                    <div class="meta">
                        <a v-if="user.isAdmin">Admin</a>
                        <a v-if="!user.isAdmin">User</a>
                    </div>
                    <div class="description">
                        Fake-Pay: Rp. 10.000.000
                    </div>
                    </div>
                    <div class="extra content center aligned">
                        <div class="ui grey button" style="margin:5px;" v-if="!user.isAdmin" @click="myHistoryTrx">History Transaction</div>
                        <button class="ui grey button" style="margin:5px;" @click="modalAddItem" v-if="user && user.isAdmin">Add Item</button>
                        <button class="ui grey button" style="margin:5px;" @click="modalCategory" v-if="user && user.isAdmin"> Category</button>
                        <button class="ui grey button" style="margin:5px;" @click="reportTrx"  v-if="user && user.isAdmin"> Report Transaction</button>
                        <button class="ui grey button" style="margin:5px;" @click="itemReport"  v-if="user && user.isAdmin"> Items Report</button>
                    </div>
                </div>
            </div>
        
            <!-- modal add item -->
            <div class="ui small modal" id="modalAddItem" v-if="user && user.isAdmin">
                <div class="ui header">
                    <h3 v-if="!modeEditItem">Add Item</h3>
                    <h3 v-if="modeEditItem">Edit Item</h3>
                </div>
                <div class="content">
                    <div class="ui form">
                        <div class="ui red message" v-if="notifFormItemErr" >{{notifFormItemErr}}</div>
                        <div class="ui green message" v-if="notifFormItemOK" >{{notifFormItemOK}}</div>
                        <div class="ui two fields">
                            <div class="thirteen wide field">
                                <label for="">Item Name</label>
                                <input type="text" v-model="addItemName">
                            </div>
                            <div class="three wide field">
                                <label for="">Status</label>
                                <select class="ui simple dropdown" v-model="addItemIsActive">
                                    <option class="item" value=true>Active</option>
                                    <option class="item" value=false>NonActive</option>
                                </select>
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
                    <div class="ui grey button" @click="addItem" v-if="!modeEditItem">Add Item</div>
                    <div class="ui grey button" @click="editItem(idEditItem)" v-if="modeEditItem">Edit Item</div>
                    <div class="ui cancel button">Close</div>
                </div>
            </div>
            <!--  -->

            <!-- modal add Category -->
            <div class="ui small modal" id="modalCategory" v-if="user && user.isAdmin">
                <div class="header" style="text-align: center">
                    <h2>Category</h2>
                </div>
                <div class="content">
                    <div class="ui form">
                        <div class=" ui field">
                            <h3>Add New Category</h3>
                        </div>
                        <div class="ui field">
                            <label for="">Name Category</label>
                            <input type="text" placeholder="category" v-model="categoryName">
                        </div>
                        <div class="ui field">
                            <div class="ui red message" v-if="notifCategory">{{ notifCategory }}</div>
                            <div class="ui grey button" v-if="!btnEditCategory" @click="addCategory">Add Category</div>
                            <div class="ui grey button" v-if="btnEditCategory" @click="cancelEditCategory">Cancel</div>
                            <div class="ui grey button" v-if="btnEditCategory" @click="editCategory(btnEditCategory)">Edit Category</div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="content">
                    <h3>List Category</h3>
                </div>
                <div class="content">
                    <div style="margin:3px;" v-for="category in categories">
                        <div class="ui image label" style="font-size: 16px;" >                                
                            {{ category.name }}
                            <i class="edit icon button" style="margin:0px 10px;" @click="getEditCategory(category._id, category.name)"></i>
                            <i class="delete icon" style="margin:0px 10px;" @click="deleteCategory(category._id)" ></i>
                        </div>
                    </div>
                </div>

            </div>

            <!-- modal list my trx -->
            <div class="ui large modal" id="listMyTrx">
                <div class="header">
                    <h3>My History Transactions</h3>
                </div>
                <div class="content">
                    <div class="ui container">
                        <table class="ui table" border="1px">
                            <tr class="center aligned">
                                <th>No & tgl Transaction</th>
                                <th>Items</th>
                                <th>Payment Type</th>
                                <th>Payment Total</th>
                                <th>Shipping Courir</th>
                            </tr>
                            <tr v-for="trx in myTrx">
                                <td class="center aligned">
                                    <p>{{trx._id}}</p>
                                    <p>{{trx.createdAt.slice(0,10)}}</p>
                                </td>
                                <td>
                                    <p v-for="item in trx.items">
                                        {{item.name}} x {{item.qty}} pcs x {{item.price}}
                                    </p>
                                </td>
                                <td class="center aligned">{{trx.paymentName}}</td>
                                <td class="center aligned">{{trx.paymentTotal}}</td>
                                <td class="center aligned">{{trx.shippingCourir}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    
    
    
    `
})