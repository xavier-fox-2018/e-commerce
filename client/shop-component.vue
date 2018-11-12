    Vue.component('shop',{
      props: {
        'items': Array
      },
      data: function () {
        return { 
        }
      },
      methods: {
        calcAvg: function (ratings) {
          let total = 0;
          ratings.forEach(rating => total+= rating);
          return (total / ratings.length).toFixed(1)
        }
      },
      template: `
        <div id="vue">
          <div class="container-fluid">
            <div class="row">
            <template v-for="item in items">
              <div class="items" >
                  <div class="item">
                      <img v-bind:src="item.imageUrl">
                      <div class="item-body">
                        <span><strong>{{item.name}} - </strong><em>{{item.price}} / night</em></span>
                        <p class="item-text" > Rating: {{item.ratings}}</p>
                        <p class="item-text" > {{item.description}}</p>
                        <a class="btn btn-outline-primary pointer" @click="$emit('add-cart-item', item._id)" :id=item._id > Add To Cart</a>
                      </div>         
                  </div>
              </div>
            </template>
          </div>
        </div>        
      </div>        
      `
  })
      
          


