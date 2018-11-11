var app = new Vue({
  el : '#app',
  data : {
    isLogin : false,
    totalBought : 1,
    registerSuccess : false,
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
    totalPrice : 0,
    isCheckOut : false
  },
  created () {
    this.getCategories();
    this.changeCategory("5be81a70fb15db0e1e92c3e7")
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
    dismissNotif : function (param) {
      this.registerSuccess = false;
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
        url: 'http://35.220.229.99:3000/carts/',
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
        .get('http://35.220.229.99:3000/items')
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
        url: 'http://35.220.229.99:3000/carts/',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(cartList => {
        if(cartList.data != null) {
          this.cart = cartList.data;
          this.totalItems = this.cart.cartItems.length;
          this.totalPrice = 0;
          for(let i = 0 ; i < this.totalItems; i++) {
            this.totalPrice += this.cart.cartItems[i].subTotal;
          }
        } else {
          this.totalPrice = 0;
          this.cart = [];
          this.totalItems = 0;
        }
      })
      .catch(err => console.log(err))
    },
    getCategories() {
      axios
        .get('http://35.220.229.99:3000/categories')
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
        url: 'http://35.220.229.99:3000/users/',
        data: {
          name : this.user.name,
          email : this.user.email,
          address : this.user.address,
          password : this.user.password
        }
      })
      .then(data => {
        console.log(data)
        this.registerSuccess = true
      })
      .catch(err => console.log(err))
    },
    login () {
      axios({
        method: 'post',
        url: 'http://35.220.229.99:3000/users/login',
        data: {
          email : this.user.email,
          password : this.user.password
        }
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);
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
    checkout (cart) {
      axios.post('http://35.220.229.99:3000/transactions/', {
        cartItems : this.cart.cartItems,
        totalPrice : this.totalPrice
      }, {
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(function (response) {
        axios
          .delete(`http://35.220.229.99:3000/carts/${cart._id}`, {
            headers : {
              token : localStorage.getItem('token')
            }
          })
          .then(data => {
            console.log('checkout success');
            app.getCarts();
            app.isCheckOut = true;
          })
          .catch(err => {
            console.log(err);
            
          })
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    removeItemFromCart (itemId) {
      console.log(itemId);
      
      axios({
        method : 'patch',
        url : `http://35.220.229.99:3000/carts/${itemId}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(data => {
        console.log(data);
        this.getCarts();

      })
      .catch(err => {
        console.log(err);
      })
    },
    logout () {
      this.isLogin = false;
      localStorage.clear();
      location.reload();
    },
    dismiss() {
      this.isCheckOut = false
    }
  }
})