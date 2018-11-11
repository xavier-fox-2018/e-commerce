var app = new Vue({
  el : '#app',
  data : {
    isLogin : false,
    totalBought : 1,
    page : 'home',
    header: 'WeCommerce',
    user : {
      email: ''
    },
    detailItem : {},
    currentCategory : '',
    categories : [],
    cart : [],
    products : [],
    totalItems : 0,
    totalPrice : 0
  },
  created () {
    this.getCategories();
    this.changeCategory("5be2bed8cb9b98492b9b4312")
    if (localStorage.getItem('token')) {
      this.isLogin = true;
      this.getCarts();  
    }
  },
  computed : {
    getUserEmail : function () {
      return localStorage.getItem('email');
    }
  },
  
  methods : {
    changeCategory: function (param) {
      this.currentCategory = param;
      this.getProducts();
    },
    checkCategory: function (param) {
      if (this.currentCategory == param) {
        return true;
      } else {
        return false;
      }
    },
    setDetail: function (item) {
      this.detailItem = item
      console.log(this.detailItem);
    },
    addToCart: function (item) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/carts/',
        headers : {
          token : localStorage.getItem('token')
        },
        data: {
          item_id : item._id
        }
      })
      .then(data => {
        console.log(data);
        this.getCarts();
      })
      .catch(err => console.log(err))
    },
    checkStock: function (total, item) {
      if (item.stok >= total && total > 0) {
        return false;
      } else return true;
    },
    getProducts: function () {
      axios
        .get('http://localhost:3000/items')
        .then(response => {
          this.products = response.data;
          console.log(this.products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCarts: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/carts/',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(cartList => {
        this.cart = cartList.data;
        this.totalItems = this.cart.cartItems.length;
        for(let i = 0 ; i < this.totalItems; i++) {
          this.totalPrice += this.cart.cartItems[i].subTotal;
        }
      })
      .catch(err => console.log(err))
    },
    getCategories() {
      axios
        .get('http://localhost:3000/categories')
        .then(response => {
          this.categories = response.data
          console.log(this.categories)
        })
        .catch(err => {
          console.log(err);
        }) 
    },
    register () {
      console.log(this.user)
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/',
        data: {
          name : this.user.name,
          email : this.user.email,
          address : this.user.address,
          password : this.user.password
        }
      })
      .then(data => {
        console.log(data)
        location.reload();
      })
      .catch(err => console.log(err))
    },

    login () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email : this.user.email,
          password : this.user.password
        }
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAdmin', response.data.admin);
        localStorage.setItem('email', this.user.email)
        this.isLogin = true;
        this.getCarts();
        console.log(response.data);
        if (response.data.admin == true) {
          window.location.href = "admin.html"
        }
        
      })
      .catch(err => console.log(err))
    },

    logout () {
      this.isLogin = false;
      localStorage.clear();
      location.reload();
    }
  }
})