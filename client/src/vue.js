Vue.component('todo-item', {
  props: ['category'],
  template: `<div class="row border py-3">
            <div class="container text-center">
            <p class="category" v-on:click="changeCategory(category)">
            {{category.name}}
            </p>
            </div>
            </div>`,
  methods: {
    changeCategory(value) {
      this.$emit('changeCategory', value);
    },
  }
});

Vue.component('categories-list', {
  props: ['name'],
  template: `<div class="row border py-3" v-bind:class="{ currentCategory : checkCategory(category.name)}">
                <div class="container text-center">
                  <p class="category" v-on:click="changeCategory(category)">
                    {{ name }}
                  </p>
                </div>
            </div>`
});

var app = new Vue({
  el : '#app',
  data : {
    isLogin : false,
    token : localStorage.getItem('token'),
    value : '',
    page : 'home',
    header: 'WeCommerce',
    user : {},
    updatedImageLink : '',
    detailItem : {
      imgURL : {
        name : 'update item image'
      }
    },
    currentCategory : "",

    category : {},
    categories : [],
    cart : [],
    items : [],
    item : {
      imgURL : {
        name : 'upload image'
      },
      name : '',
      stock : 0,
      price : 0,
      description : ''
    },
    updateItem : {
      imgURL : {
        name : ''
      },
      name : '',
      stock : 0,
      price : 0,
      description : '',
      category : '',
      _id : ''
    }
  },
  created () {
    this.getCategories();
    this.getItems();

    axios
      .get('http://localhost:3000/users/role', {
        headers : {
          token : this.token
        }
      })
      .then(data => {
        if(data.data === false) {
          window.location.href = "index.html"
        } else {
          this.isLogin = true
        }
      })
      .catch(err => {
        console.log(err);
        window.location.href = "index.html";
      })

    // const role = localStorage.getItem('isAdmin');
    // if (!role) {
    //   window.location.href = "index.html"
    // } else if (localStorage.getItem('token')) {
    //   this.isLogin = true;
    // }
  },
  computed : {

  },   
  methods : {
    getCategories: function () {
      axios
        .get('http://localhost:3000/categories')
        .then(response => {
          this.categories = response.data
        })
        .catch(err => {
          console.log(err);
        }) 
    },
    getItems: function () {
      axios
        .get('http://localhost:3000/items')
        .then(response => {
          this.items = response.data;
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeCategory: function (objCategory) {
      console.log("=====",objCategory);
      this.currentCategory = objCategory;
    },
    checkCategory: function (param) {
      if (this.currentCategory == param) {
        return true;
      } else {
        return false;
      }
    },
    checkUpdateCategory : function (updateId, id) {
      if (updateId == id) {
        console.log('benar')
        return true
      } else {
        return false
      }
    },
    logout () {
      this.isLogin = false;
      localStorage.clear();
      location.reload();
    },
    addCategory () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/categories/',
        headers : {
          token : localStorage.getItem('token')
        },
        data: {
          name : this.category.name
        }
      })
      .then(data => {
        console.log(data);
        this.getCategories();
      })
      .catch(err => console.log(err))
    },
    updateCategory () {
      axios.put(`http://localhost:3000/categories/${this.currentCategory._id}`, 
      {
        name : this.currentCategory.name
      },{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log(response);
        this.getCategories();
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteCategory () {
      axios.delete(`http://localhost:3000/categories/${this.currentCategory._id}`,
      {
        headers : {
          token : this.token
        }
      })
        .then(response => {
          console.log(response);
          this.getCategories();
        })
        .catch(err => {
          console.log(err);
        })
    },
    addItem () {
      console.log(this.item)
      let formData = new FormData();
      formData.append('image', this.item.imgURL);
      axios
        .post(`http://localhost:3000/items/upload`, formData, {
          headers : {
            token : this.token
          }
        })
        .then(res => {
          console.log(res)
          axios({
            method: 'post',
            url: 'http://localhost:3000/items',
            headers : {
              token : this.token
            },
            data: {
              name : this.item.name,
              description : this.item.description,
              price : this.item.price,
              stock : this.item.stock,
              category : this.value,
              url_img : res.data.link
            }
          })
          .then(data => {
            console.log(data)
            this.getItems();
          })
          .catch(err => console.log(err))
        })
        .catch(er => {
          console.log(er);
        })
    },
    getImageToUpload(link){
      this.item.imgURL = link.target.files[0];
    },
    deleteItem (objItem) {
      axios.delete(`http://localhost:3000/items/${objItem._id}`,
      {
        headers : {
          token : this.token
        }
      })
        .then(response => {
          console.log(response);
          this.getItems();
        })
        .catch(err => {
          console.log(err);
        })
    },
    getImageToUpdate(link){
      this.updateItem.imgURL = link.target.files[0];
      console.log(this.updateItem.imgURL)
    },
    editItem(item) {
      this.updateItem.name = item.name;
      this.updateItem.category = item.category;
      this.updateItem.stock = item.stock;
      this.updateItem.description = item.description;
      this.updateItem.price = item.price;
      this.updateItem._id = item._id; 
      console.log(this.updateItem)
    },
    updatingItem (id) {
      console.log(id);
      if(this.updateItem.imgURL.name === '') {
        axios({
          method : 'PUT',
          url : `http://localhost:3000/items/${id}`,
          data : {
            name : this.updateItem.name,
            price : this.updateItem.price,
            stock : this.updateItem.stock,
            category : this.value,
            description : this.updateItem.description
          },
          headers : {
            token : this.token
          }
        })
        .then(data => {
          console.log(data);
          this.getItems();

        })
        .catch(err => {
          console.log(err);
        })
        console.log('image kosong');
        
      } else {
        console.log('image isi');
        let formData = new FormData();
        formData.append('image', this.updateItem.imgURL);
        axios
          .post(`http://localhost:3000/items/upload`, formData, {
            headers : {
              token : this.token
            }
          })
          .then(res => {
            axios({
              method : 'PUT',
              url : `http://localhost:3000/items/${id}`,
              data : {
                name : this.updateItem.name,
                price : this.updateItem.price,
                stock : this.updateItem.stock,
                category : this.value,
                description : this.updateItem.description,
                url_img : res.data.link
              },
              headers : {
                token : this.token
              }
            })
            .then(data => {
              console.log(data);
              this.getItems();
            })
            .catch(err => {
              console.log(err);
            })
          })
          .catch(err => {
            res.status(500).json(err)
          })
        
        

      } 
    }
  }
})