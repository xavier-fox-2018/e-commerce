let navbarComponentTemplate = `<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
        <a class="navbar-brand" href="/"> <i class="fa fa-bicycle fa-lg"></i> {{websitename}} </a>
        <a v-if="!user" class="nav-link" href="" @click.prevent="toggleLoginRegister()">
            <div class="text-light">
                <i class="fa fa-sign-in fa-lg"></i>
                Login / Register
            </div>
        </a>
        <a v-if="user" class="nav-link" href="" @click.prevent="changeViewMode('accountProfile','main')">
            <div class="text-light">
                <i v-if="!user.avatar" class="fa fa-lg fa-user-circle-o" aria-hidden="true"></i>
                <img v-if="user.avatar" :src="user.avatar" alt="ava" width="20px" height="20px">
                {{user.email}} 
            </div>
        </a>
        <a v-if="user && user.role == 'admin'" class="nav-link" href="" @click.prevent="changeViewMode('adminView','main')">
            <div class="text-light">
                <i v-if="viewMode == 'adminView'" class="fa fa-unlock-alt fa-lg mx-1"></i>
                <i v-if="viewMode != 'adminView'" class="fa fa-lock fa-lg mx-1"></i>
                Admin Mode
            </div>
        </a>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="" @click.prevent="changeViewMode('main','main')"> 
                        <i class="fa fa-home fa-lg"></i>
                        Home 
                    </a>
                </li>
                <li v-if="user && user.role != 'admin'" @click.prevent="toggleDisplayCart() ; changeViewMode('main')" class="nav-item active">
                    <a class="nav-link" href="">
                        <i class="fa fa-lg fa-cart-plus"></i>
                        Cart
                        <span class="badge badge-pill badge-light"> {{ totalQtyOfCart }} </span>
                    </a>
                </li>
                <li v-if="user" class="nav-item active">
                    <a class="nav-link" href="" @click.prevent="changeViewMode('transactions','main')">
                        <i class="fa fa-lg fa-history"></i>
                        Transactions
                    </a>
                </li>
                <li v-if="user && user.role=='admin' " class="nav-item active">
                    <a class="nav-link" href="" @click.prevent="changeViewMode('report','main') ">
                        <i class="fa fa-sticky-note fa-lg"></i>
                        Report
                    </a>
                </li>
                <li class="nav-item active" v-if="user">
                    <a class="nav-link" @click.prevent="logout" href="">
                        <i class="fa fa-sign-out fa-lg"></i>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>`

Vue.component('navbarComponent', {
    name : 'navbar',
    template : navbarComponentTemplate,
    props: ['user','viewMode','totalQtyOfCart','toggleDisplayCart','changeViewMode','logout','toggleLoginRegister','getReport'],
    data () {
        return {
            websitename : 'H8ikeStore'
        }
    }
})