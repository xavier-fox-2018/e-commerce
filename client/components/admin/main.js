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
                        <input type="date" v-model="startDate">
                        <input type="date" v-model="endDate">

                        <!--Card content-->
                        <div class="card-body">

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

                <!--Grid column-->
                <div class="col-md-6 mb-4">

                    <!--Card-->
                    <div class="card">

                        <!--Card content-->
                        <div class="card-body">

                            <!-- Table  -->
                            <table class="table table-hover">
                                <!-- Table head -->
                                <thead class="blue lighten-4">
                                    <tr>
                                        <th>#</th>
                                        <th>Lorem</th>
                                        <th>Ipsum</th>
                                        <th>Dolor</th>
                                    </tr>
                                </thead>
                                <!-- Table head -->

                                <!-- Table body -->
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Cell 1</td>
                                        <td>Cell 2</td>
                                        <td>Cell 3</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Cell 4</td>
                                        <td>Cell 5</td>
                                        <td>Cell 6</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Cell 7</td>
                                        <td>Cell 8</td>
                                        <td>Cell 9</td>
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

            startDate : null,
            endDate : null,
            data: {
                all: ''
            }
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