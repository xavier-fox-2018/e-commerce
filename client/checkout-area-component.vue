      Vue.component('checkout', {
        props: {
        'cart': Array
        },
        data: function () {
          return {
                }
        },
        computed: {
          cartHasItems: function (){
            return this.cart.length > 0
          },
         cartTotals: function (){
           let subtotal=0
           this.cart.forEach(item => subtotal +=Number(item.price))
           let tax= subtotal*0.1;
           let total=subtotal + tax;
           return {
             subtotal:subtotal,
             tax:tax,
             total:total
           }
         }
        },
        template: `
          <div class="container-fluid">
            <div class="row">
              <div class="detail-checkout col-12 col-lg-8 mb-4" >
                  <div class="mt-5">
                    <h2>My Cart</h2>
                    <hr>
                    <div class="checkout-table mt-4">
                      <table class="table-cart" >
                        <template v-if='cartHasItems'>
                          <thead>
                            <tr>
                              <th></th>
                              <th>Item</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody  v-for="item in cart">
                            <tr class="individual-item">
                              <td id="item-img">
                                {{item.picture}}
                              </td>
                              <td id="item-name">
                                  <h5>{{item.name}}</h5>
                              </td>
                              <td id="item-price">
                                <span>{{item.price}}</span>
                              </td>
                              <td id="item-quantity">
                                <span>{{item.quantity}}</span>
                              </td>
                              <span @click="$emit('minus-quantity', item._id)" :id=item._id>
                                <i class="fas fa-minus pointer chk-btn"></i>
                              </span>
                              <span @click="$emit('add-quantity', item._id)" :id=item._id>
                                <i class="fas fa-plus pointer chk-btn" ></i>
                              </span>
                            </tr>
                          </tbody>
                        </template>
                        <template v-else>
                              <tr >
                                <td rowspan="4">Cart is empty.</td>
                              </tr>
                        </template> 
                      </table>
                    </div>
                  </div> 
              </div>
              <div class="summary-checkout col-12 col-lg-4 mt-5">
              <template v-if='cartHasItems'>
                <h2>Cart Total</h2>
                <hr>
                <div id="summary-table">
                  <h3 id="Subtotal">Subtotal: {{cartTotals.subtotal}}</h3>
                  <h3 id="Tax">Tax:  {{cartTotals.tax}}</h3>
                  <hr>
                  <h2 id="Total">$ {{cartTotals.total}}</h2>
                  <button class="pointer btn-primary btn w-100 mt-4">Checkout</button>
                  <button class="pointer btn w-100 mt-1" @click="$emit('delete-cart')">delete Cart</button>

                </div>
              </template>
              </div>
            </div>
          </div>
          `
    })
