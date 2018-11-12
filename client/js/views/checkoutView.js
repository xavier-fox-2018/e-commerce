checkoutViewTemplate =`<transition name="fade">
<div  v-if="user && viewMode == 'checkoutView'" class="container bg-light">
<div class="row p-4 text-primary">
    <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart </span>
            <span class="badge badge-secondary badge-pill"> {{totalQtyOfCart}} </span>
        </h4>
        <ul class="list-group mb-3">

            <li class="list-group-item d-flex justify-content-between active">
                <span>Cart Id </span>
                <strong>#{{ cartId }}</strong>
            </li>

            <li v-for="(item,index) in checkoutModel.items" :key="item._id" class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0">{{item.name}}</h6>
                    <small class="text-muted">@ {{ getRpFormat(item.price) }} x {{item.quantity}} </small>
                </div>
                <span class="text-muted"> {{ getRpFormat(item.subtotal) }} </span>
            </li>
           
            <li class="list-group-item d-flex justify-content-between active">
                <span>Total </span>
                <strong>{{ getRpFormat(checkoutModel.total) }}</strong>
            </li>
        </ul>

 
    </div>
    <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation" novalidate="">

            <div class="mb-3">
                <label >Account Name </label>
                <input type="text" class="form-control" :value="user.name" disabled>
            </div>
            <div class="mb-3">
                <label >Account Email </label>
                <input type="text" class="form-control" :value="user.email" disabled>
            </div>

            <div class="mb-3">
                <label for="email">Notification Email <span class="text-muted">(Optional)</span></label>
                <input type="email" class="form-control" id="email" placeholder="you@example.com">
                <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                </div>
            </div>

            <div class="mb-3">
                <label for="address">Address</label>
                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="">
                <div class="invalid-feedback">
                    Please enter your shipping address.
                </div>
            </div>

            <hr class="mb-4">
                map is under construction :)
            <hr class="mb-4">

            <h4 class="mb-3">Payment</h4>

            <div class="d-block my-3">
                <div class="custom-control custom-radio">
                    <input id="transfer" name="paymentMethod" value="transfer" v-model="checkoutModel.status" type="radio" class="custom-control-input"  >
                    <label class="custom-control-label" for="transfer">Transfer</label>
                </div>
                <div class="custom-control custom-radio">
                    <input id="cod" name="paymentMethod" value="cash on delivery" v-model="checkoutModel.status" type="radio" class="custom-control-input" >
                    <label class="custom-control-label" for="cod">Cash On Deliery</label>
                </div>
                <div class="custom-control custom-radio">
                    <input id="credit" name="paymentMethod" value="credit" v-model="checkoutModel.status" type="radio" class="custom-control-input" >
                    <label class="custom-control-label" for="credit">Credit</label>
                </div>
            </div>
       
            <hr class="mb-4">
            <button class="btn btn-info btn-lg " @click.prevent="changeViewMode('main','checkoutView')"> Back & Contonue Shopping</button>
            <button class="btn btn-success btn-lg pull-right " @click.prevent="confirmCheckout()" >Confirm & Checkout</button>
        </form>
    </div>
</div>
</div>
</transition>`

Vue.component('checkout-view',{

    name : 'checkoutView',
    template : checkoutViewTemplate,
    props: ['user','viewMode','totalQtyOfCart','cartId','checkoutModel','getRpFormat','changeViewMode','confirmCheckout'],
    data () {
        return {
            
        }
    }

})