transactionsViewTemplate =`<transition name="fade">
    <div v-show="viewMode == 'transactions'" class="container-fluid bg-primary">
        <div class="row px-3">
            <div class="col-8 mx-auto bg-light py-5 px-5">
                <h1 class="text-primary">Transactions</h1>
                <hr>
                <table id="transactionTable" class="table table-striped table-bordered bg-light " style="width:100%">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th v-if=" user && user.role == 'admin'">Customer</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(transaction,i) in transactions" :key="transaction._id">
                            <td>{{i+1}}</td>
                            <td> <span> {{ new Date(transaction.createdAt).toLocaleString() }} </span> </td>
                            <td>{{getRpFormat(transaction.total)}}</td>
                            <td>{{transaction.status}}</td>
                            <td v-if=" user && user.role == 'admin'">
                                {{ transaction.user.name }} <br>
                                {{ transaction.user.email }}
                            </td>
                            <td>
                                <button @click.prevent="getDetail(transaction)" class="btn btn-info"> <i class="fa fa-sticky-note-o" ></i> Detail </button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div>

            <transition name="fade" mode="out-in">

                <div v-if="displayTransactionDetail" class="col-4 mx-auto bg-light py-5 pr-5">
                        <h1 class="text-primary">Transaction Detail</h1>
                        <hr>
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6">
                            <address>
                                <strong> {{transactionDetail.user.name}} </strong><br>
                                {{transactionDetail.user.email}}<br>
                                customer id #{{transactionDetail.user._id}}<br>
                            </address>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 text-right">
                            <p><em>{{new Date(transactionDetail.createdAt).toLocaleString()}}</em></p>
                            <p><em>id #: {{transactionDetail._id}}</em></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="text-center mx-auto">
                            <h3>Items</h3>
                        </div>
                        </span>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Qty</th>
                                    <th class="text-center">Price</th>
                                    <th class="text-center">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in transactionDetail.items">
                                    <td class="col-md-9"><em>{{item.name}}</em></h4>
                                    </td>
                                    <td class="col-md-1" style="text-align: center"> {{item.quantity}} </td>
                                    <td class="col-md-1 text-center">{{getRpFormat(item.price)}}</td>
                                    <td class="col-md-1 text-center">{{getRpFormat(item.subtotal)}}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td class="text-right">
                                        <h4><strong>Total: </strong></h4>
                                    </td>
                                    <td class="text-center text-danger">
                                        <h4><strong>{{getRpFormat(transactionDetail.total)}}</strong></h4>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click="displayTransactionDetail = false" type="button" class="btn btn-success btn-lg btn-block">
                            Back   <span class="glyphicon glyphicon-chevron-right"></span>
                        </button>

                    </div>
                </div>

            </transition>

        </div>
    </div>
</transition>`

Vue.component('transactions-view',{

    name : 'transactionsView',
    template : transactionsViewTemplate,
    props: ['user','viewMode','getRpFormat','changeViewMode','transactions'],
    data () {
        return {
            displayTransactionDetail : false,
            transactionDetail : {
                _id: '',
                createdAt: "2018-11-11T09:11:17.834Z",
                items: [],
                status: '',
                total: 0,
                user: {
                    _id : '',
                    name : '',
                    email : ''
                },
            }
        }
    },
    methods: {
        
        getDetail(transactionObj) {
            this.transactionDetail = transactionObj
            this.displayTransactionDetail = true
        },

    }

})