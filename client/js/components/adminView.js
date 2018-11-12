let adminViewTemplate = `<transition name="fade">
<div v-if="viewMode == 'adminView'" class="container-fluid py-4  bg-info">

    <div class="row py-3 px-3">
        <transition name="fade">
        <div v-if="!editItemModel._id" class="col-3 mx-auto">
            <form>
                <h4> <b class="text-light"> Add New Item  </b> </h4>
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" accept="image/*" id="pictureFile" v-on:change="getImgInput($event)">
                        <label class="custom-file-label" for="pictureFile">img {{imgFileName}}</label>
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" v-model="addItemModel.name" class="form-control" placeholder="Item Name" >
                </div>
                <div class="form-group">
                    
                    <input type="text" v-model="addItemModel.description"  class="form-control" placeholder="Description">
                </div>
                <div class="form-group form-inline d-flex justify-content-between">
                    <label class="font-weight-bold" >Price</label>
                    <input type="number" v-model.number="addItemModel.price"  class="form-control" placeholder="Price" >
                </div>
                <div class="form-group form-inline d-flex justify-content-between">
                    <label class=" font-weight-bold" >Stock</label>
                    <input type="number" v-model.number="addItemModel.stock"  class="form-control" placeholder="Stock" >
                </div>
                <div class="form-group">
                    <input type="string" v-model.number="addItemModel.categories"  class="form-control" placeholder="categories" >
                    <small> <i> categories : comma separated for multiple input </i> </small>
                </div>
                <input name="registerBtn"  @click.prevent="addNewItem('items')" id="registerBtn" class="btn btn-warning pull-right" type="submit" value="Add Item">
            </form>
        </div>
        </transition>

        <div class="col-8 mx-auto">
            
            <h4> <b class="text-light"> Data Items  </b> </h4>
            <table class="table table-light table-hover">
                <thead class="thead-default">
                    <tr class="table-warning">
                        <th>No</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Categories</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody v-if="items"> 
                    <tr v-for="(onitem,index) in items" >
                        <td scope="row"> {{index + 1}} </td>

                        <td> {{onitem.name}} </td>
                        <td> {{onitem.description.slice(0,20)}} </td>
                        <td> {{onitem.categories.join(', ')}} </td>
                        <td> {{ getRpFormat(onitem.price)}} </td>
                        <td> {{onitem.stock}} </td>

                        <td>
                            <a href="" class="mx-1" @click.prevent="displayEditItem(onitem)"> <i class="fa fa-edit fa-lg"></i> </a> 
                            <a href="" class="mx-1" @click.prevent="deleteItem(onitem._id)"> <i class="fa fa-remove fa-lg"></i> </a>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>

        <transition name="fade" mode="out-in">
        <div v-if="editItemModel._id" class="col-3 mx-auto">
            <form>
                <h4> <b class="text-light"> Edit Item  </b> </h4>
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" accept="image/*" id="pictureFile" v-on:change="getImgInput($event)">
                        <label class="custom-file-label" for="pictureFile">img {{imgFileName}}</label>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text" >Upload</span>
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" v-model="editItemModel.name" class="form-control" placeholder="Item Name" >
                </div>
                <div class="form-group">
                    <input type="text" v-model="editItemModel.description"  class="form-control" placeholder="Description">
                </div>
                <div class="form-group">
                    <input type="number" v-model.number="editItemModel.price"  class="form-control" placeholder="Price" >
                </div>
                <div class="form-group">
                    <input type="number" v-model.number="editItemModel.stock"  class="form-control" placeholder="Stock" >
                </div>
                <div class="form-group">
                    <input type="string" v-model.number="editItemModel.categories"  class="form-control" placeholder="categories" >
                    <small> <i> categories : comma separated for multiple input </i> </small>
                </div>
                <input  @click.prevent="updateItem()" class="btn btn-warning pull-right mx-3" type="submit" value="Update">
                <input  @click.prevent="editItemModel = false" class="btn btn-dark pull-right" type="submit" value="cancel">
            </form>
        </div>
        </transition>

    </div>

</div>
</transition>`

Vue.component('adminView', {
    name: 'adminView',
    template: adminViewTemplate,
    props: ['user', 'viewMode', 'editItemModel', 'addItemModel', 'addNewItem', 'items','deleteItem',
            'getRpFormat', 'displayEditItem', 'updateItem','getImgInput','imgInput','imgFileName'],
    data() {
        return {

         
        }
    },
    methods: {
        

    }
})