Vue.component('admin-menu', {
    template: `
    <!--Main layout-->
    <main class="pt-5 mx-lg-5">
        <div class="container-fluid mt-5">

            <!--Grid row-->
            <div class="row wow fadeIn">

                <!--Grid column-->
                <div class="col-md-6 mb-4">

                    <!--Card-->
                    <div class="card">
                        <a class="btn btn-danger" @click="getAllTransactions">Get All transactions</a>
                        
                        <!--Card content-->
                        <div class="card-body">
                        
                            <!-- Grid row -->
                            <div class="row d-flex justify-content-center mb-3">
                                <div class="col-sm-3 col-md-2 col-lg-2 mt-1">
                                    <strong>Filter</strong>
                                </div>

                                <!-- Grid column -->
                                <div class="col-sm-4 col-md-4 col-lg-4">
                                    <!-- Default input -->
                                    <input v-model="startDate" type="date" class="form-control" placeholder="Start Date">
                                    </div>
                                    <!-- Grid column -->
                                    
                                    -

                                    <!-- Grid column -->
                                    <div class="col-sm-4 col-md-4 col-lg-4">
                                    <!-- Default input -->
                                    <input v-model="endDate" type="date" class="form-control" placeholder="End Date">
                                </div>
                                <!-- Grid column -->
                            </div>
                            <!-- Grid row -->

                            <!-- Table  -->
                            <table class="table table-hover">
                                <!-- Table head -->
                                <thead class="blue-grey lighten-4">
                                    <tr>
                                        <th>Transaction Id</th>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <!-- Table head -->

                                <!-- Table body -->
                                <tbody>
                                    <tr v-for="transaction,index in filteredData" :key="index" @click="getTransactionDetail(transaction)" style="cursor:pointer" data-toggle="modal" data-target="#transactionDetailModal">
                                        <th scope="row">{{transaction._id}}</th>
                                        <td>{{transaction.createdAt}}</td>
                                        <td>{{transaction.user.name}}</td>
                                        <td>$ {{transaction.total_price}}</td>
                                    </tr>
                                </tbody>
                                <!-- Table body -->
                            </table>
                            <!-- Table  -->

                        </div>

                    </div>
                    <!--/.Card-->

                </div>
                <!--Grid column-->

                <!-- Modal -->
                <div class="modal fade" id="transactionDetailModal" tabindex="-1" role="dialog" aria-labelledby="transactionDetailModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Transaction Detail</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!-- {{transactiondetail}} -->

                            Transaction ID : {{transactiondetail._id}}
                            <br>
                            Date : {{transactiondetail.createdAt}}
                            <br>
                            Name : {{userdetail.name}}
                            <br>
                            <ul>
                                <strong>Item, Quantity, Sub_Total </strong>
                                <li v-for="item in transactiondetail.item_list">
                                    {{item.item.name}} , qty : {{item.qty}} , sub_total :  {{item.sub_total}}
                                </li>
                            <ul>
                            <br>
                            <p class="text-right">TOTAL : {{transactiondetail.total_price}}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
                <!-- Modal -->

                <!-- Modal -->
                <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editUserModalLabel">Edit User</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!-- Default input -->
                            <div class="form-group">
                              <label for="editUserName">Name</label>
                              <input v-model="editUserName" type="text" class="form-control" id="editUserName" placeholder="User Name">
                            </div>
                            <!-- Default input -->
                            <div class="form-group">
                              <label for="editUserEmail">Email</label>
                              <input v-model="editUserEmail" type="text" class="form-control" id="editUserEmail" placeholder="User Email">
                            </div>

                            <label class="mt-2">Is Admin</label>
                            <select class="browser-default custom-select" v-model="editUserIsAdmin">
                                <option :value="true">True</option>
                                <option :value="false">False</option>
                            </select>
                            
                        </div>
                        <div class="modal-footer d-flex justify-content-around">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" @click="deleteUser">Delete User</button>
                            <button type="button" class="btn btn-primary" @click="updateUser">Update User</button>
                        </div>
                        </div>
                    </div>
                </div>
                <!-- Modal -->

                <!--Grid column-->
                <div class="col-md-6 mb-4">

                    <!--Card-->
                    <div class="card">
                        <button class="btn btn-danger" @click="getAllUsers">Get All Users</button>

                        <!--Card content-->
                        <div class="card-body">

                            <!-- Table  -->
                            <table class="table table-hover">
                                <!-- Table head -->
                                <thead class="blue lighten-4">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Admin</th>
                                    </tr>
                                </thead>
                                <!-- Table head -->

                                <!-- Table body -->
                                <tbody style="cursor:pointer">
                                    <tr v-for="user in users" data-toggle="modal" data-target="#editUserModal" @click="editUser(user)">
                                        <th scope="row">1</th>
                                        <td>{{user.name}}</td>
                                        <td>{{user.email}}</td>
                                        <td>{{user.is_admin}}</td>
                                    </tr>
                                </tbody>
                                <!-- Table body -->
                            </table>
                            <!-- Table  -->

                        </div>

                    </div>
                    <!--/.Card-->

                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-md-6 mb-4">

                    <!--Card-->
                    <div class="card">
                        <button class="btn btn-danger" @click="getAllItems">Get Items Sold</button>

                        <!--Card content-->
                        <div class="card-body">

                            <!-- Table  -->
                            <table class="table table-hover">
                                <!-- Table head -->
                                <thead class="blue lighten-4">
                                    <tr>
                                        <th>#</th>
                                        <th>Item</th>
                                        <th>Sold</th>
                                    </tr>
                                </thead>
                                <!-- Table head -->

                                <!-- Table body -->
                                <tbody>
                                    <tr v-for="item in items">
                                        <th scope="row" >1</th>
                                        <td>{{item.name}}</td>
                                        <td>0</td>
                                    </tr>
                                </tbody>
                                <!-- Table body -->
                            </table>
                            <!-- Table  -->

                        </div>

                    </div>
                    <!--/.Card-->

                </div>
                <!--Grid column-->

            </div>
            <!--Grid row-->

            

        </div>
    </main>
    <!--Main layout-->
    `,
    data : function(){
        return {
            config : {
                port : `http://localhost:3000`
            },
            transactions : '',
            transactiondetail : '',
            userdetail : '',

            items : '',
            users : '',

            startDate : null,
            endDate : null,
            data: {
                all: ''
            },

            editUserId : '',
            editUserName : '',
            editUserEmail : '',
            editUserIsAdmin : '',
        }
    },
    methods : {
        getAllTransactions : function(){
            axios({
                method : 'GET',
                url : `${this.config.port}/transactions`
            })
            .then(response=>{
                // console.log(response.data)
                this.transactions = response.data
                this.selecteduser = response.data.user

                this.data.all = response.data
                // console.log('this data all',this.data.all)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getAllItems : function(){
            axios({
                method : 'GET',
                url : `${this.config.port}/items`
            })
            .then(response=>{
                console.log(response.data)
                this.items = response.data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getAllUsers : function(){
            axios({
                method : 'GET',
                url : `${this.config.port}/users/all`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response=>{
                console.log(response.data)
                this.users = response.data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getTransactionDetail : function(transaction){
            axios({
                method : 'GET',
                url : `${this.config.port}/transactions/${transaction._id}`
            })
            .then(response=>{
                this.transactiondetail = response.data
                this.userdetail = response.data.user
            })
            .catch(err=>{
                console.log(err)
            })
        },
        editUser : function(user){
            // console.log(user.email)
            this.editUserId = user._id
            this.editUserName = user.name
            this.editUserEmail = user.email
            // console.log(this.editUserEmail)
            this.editUserIsAdmin = user.is_admin
        },
        updateUser : function(){

        },
        deleteUser : function(){

        }
    },
    computed : {
        filteredData() {
            let startDate = this.startDate;
            let endDate = this.endDate;
            return _.filter(this.data.all, (function (data) {
                if ((_.isNull(startDate) && _.isNull(endDate))) {
                    return true
                } else {
                    let date = data.createdAt.slice(0,10);
                    return (date >= startDate && date <= endDate);
                }
            }))
        }
    }
})