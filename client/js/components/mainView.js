let mainViewTemplate = `<transition name="fade">
    <div v-if="viewMode == 'main'" class="container">
        <div v-if="viewMode == 'main' && !displayCart" class="container">
        <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                    <img class="d-block mx-auto img-fluid" src="img/motorcycle.jpg" alt="First slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block img-fluid" src="img/motorcycle2.jpg" alt="Second slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block img-fluid" src="img/motorcycle3.jpg" alt="Third slide">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>

    <div class="row">

        <div class="col-lg-3 mb-3">
            <br>
            <form class="form-inline" >
                <input v-if="searcOptionKey != 'price'" @focus="searchInput = '' ; getItems()" class="form-control inputSearchCall" @keyup="search(searcOptionKey, searchInput)" v-model="searchInput" style="width: 65%" type="text" placeholder="Search">
                <input v-if="searcOptionKey == 'price'" @focus="searchInput = '' ; getItems()" class="form-control inputSearchCall" @keyup="search(searcOptionKey, searchInput)" v-model.number="searchInput" style="width: 65%" type="number" placeholder="Search by Price">
                <!-- <button @click.prevent="search('name', searchInput)" class="btn btn-success" type="submit">Search</button> -->
                <div class="form-group">
                  <select class="form-control" v-model="searcOptionKey" onchange="$('.inputSearchCall').focus()">
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="description"> Desc</option>
                  </select>
                </div>

                <span v-if="searcOptionKey == 'price'" class="p-1"><small> <i> *get items where price lower than equal to search input  </i> </small></span>
            </form>
            <br>
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active" @click.prevent="getItems">All Categories</a>
                <a href="#" class="list-group-item list-group-item-action" @click.prevent="searchByCategory(category)" v-for="(category,index) in categories">  {{category}} </a>
                
            </div>

        </div>
        <!-- /.col-lg-3 -->

        <div class="col-lg-9"> <br>

            <!-- articles / items -->
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4" v-if="item.stock > 0" v-for="(item,index) in items " :key="item._id">
                    <div class="card border-info mb-3">
                        <a href="#"><img class="cardImg card-img-top centered" height="200" :src="item.img ? item.img : 'img/bikePlaceholder.png'" alt=""></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                <a href="#">{{item.name}}</a>
                            </h4>
                            <h5> {{ getRpFormat(item.price) }} </h5>
                            <p class="card-text"> {{item.description}} </p>
                        </div>
                        <div v-if="user" class="card-footer">
                            <!-- <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small> -->
                            Available <span class="badge badge-info">{{ item.stock }}</span>
                            <span  v-if="user && itemQtyinCartItems[item._id]" class="badge badge-warning">{{ itemQtyinCartItems[item._id].quantity }} In Your Cart</span> 
                            <span v-if="user.role != 'admin' ">
                            <button  v-if="user && itemQtyinCartItems[item._id] ? itemQtyinCartItems[item._id].quantity < item.stock : true" @click.prevent="addToCart(item)" class="btn btn-success pull-right">
                                <i class="fa fa-cart-plus fa-lg  "></i>
                            </button>   
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- articles / items end -->

        </div>
        <!-- /.col-lg-9 -->

    </div>
    <!-- /.row -->

</div>
</transition>`

Vue.component('mainView', {
    name : 'mainView',
    template : mainViewTemplate,
    props: ['user','viewMode','search','getItems','searchByCategory','categories','items','getRpFormat','itemQtyinCartItems','addToCart','displayCart'],
    data () {
        return {
            searchInput : '',
            searcOptionKey : 'name'
        }
    }
})