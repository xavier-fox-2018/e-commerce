let cartComponentTemplate = `<transition name="fade">
<div  v-if="user && displayCart && viewMode == 'main'" class="container bg-secondary">
    <div class="container bg-info">
        <div class="row p-4 bg-secondary">
        <table id="cart" class="table table-hover table-condensed">
            <thead>
                <tr>
                    <th style="width:40%" class="text-center">Products</th>
                    <th style="width:15%" class="text-center">Price</th>
                    <th style="width:15%" class="text-center">Quantity</th>
                    <th style="width:20%" class="text-center">Subtotal</th>
                    <th style="width:10%"></th>
                </tr>
            </thead>

            <tbody v-for="(cartItem,index) in cartItems" :key="cartItem._id">
                <tr>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-sm-3"><img width="100" height="100" :src="cartItem.img ? cartItem.img : 'img/bikePlaceholder.png'" alt="..." class="img-responsive" /></div>
                            <div class="col-sm-6">
                                <h4 class="nomargin">{{ cartItem.name }}</h4>
                                <p>{{ cartItem.description }}</p>
                                <p> Available Stock : {{ cartItem.stock }} </p>
                            </div>
                        </div>
                    </td>
                    <td data-th="align-middle Price" class="text-center align-middle">  {{ getRpFormat(cartItem.price) }}</td>
                    <td data-th="Quantity" class="text-center align-middle">
                        
                        <button @click.prevent="addToCart(cartItem)" v-if="cartItem.quantity < cartItem.stock" type="button" class="badge badge-light"><i class="fa fa-plus fa-lg"></i></button> 
                        <input type="number" class="form-control text-center " v-model.number="cartItem.quantity" disabled> 
                        <button @click.prevent="removeFromCart(cartItem)" type="button" class="badge badge-light"><i class="fa fa-minus fa-lg"></i></button>   
                         
                    </td>
                    <td data-th="Subtotal" class="text-center align-middle">{{ getRpFormat(cartItem.subtotal) }}</td>
                    <td class="align-middle actions " data-th="">
                        <button @click.prevent="removeFromCart(cartItem, true)" class="btn btn-danger btn-sm align-middle"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            </tbody>
            
            <tfoot>
                <tr>
                    <td><a href="#" class="btn btn-warning" @click.prevent="saveCartItems() ; toggleDisplayCart()"><i class="fa fa-angle-down fa-lg"></i>  Continue Shopping</a></td>
                    <td colspan="2" class="hidden-xs"></td>
                    <td class="hidden-xs text-center"><strong>Total {{ getRpFormat(total) }}</strong></td>
                    <td v-if="cartItems.length > 0" ><a href="" @click.prevent="checkout() ; changeViewMode('checkoutView','main') ; toggleDisplayCart()" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right fa-lg"></i></a></td>
                </tr>
            </tfoot>
        </table>
        </div>
    </div>
</div>
</transition>`

Vue.component('cartComponent', {
    name : 'cartComponent',
    template : cartComponentTemplate,
    props: ['user','displayCart','cartItems','getRpFormat','total','saveCartItems',
            'checkout','changeViewMode','toggleDisplayCart','removeFromCart','addToCart','viewMode'],
    data () {
        return {
            
        }
    }
})