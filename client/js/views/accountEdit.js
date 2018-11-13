accountViewTemplate =`<transition name="fade">
<div v-if="user && viewMode=='accountProfile'"  class="col py-5  bg-dark">
<div class="col-5 mx-auto p-5 bg-light">
    <form>
        <h4> <b class="text-dark"> Account Profle  </b> </h4>
        <div class="form-group">
            <input type="email" v-model="editUserModel.email" disabled  class="form-control" placeholder="Email">
            <small><i>email can't be change</i></small>
        </div>
        <div class="input-group mb-3">
            <div class="custom-file">
                <input type="file" class="custom-file-input" accept="image/*" id="pictureFile" v-on:change="getImgInput($event)">
                <label class="custom-file-label" for="pictureFile">Avatar {{imgFileName}}</label>
            </div>
        </div>
        <div class="form-group">
            <input type="text" v-model="editUserModel.name" class="form-control" placeholder="Name" >
        </div>
        <div class="form-group">
            <input type="password" v-model="editUserModel.password"  class="form-control" placeholder="password">
            <small><i>let empty if u won't change password</i></small>
        </div>
        <button  @click.prevent="changeViewMode('main')"  class="btn btn-success"> Back </button>
        <input name="updateUserbtn"  @click.prevent="updateUser" id="updateUserbtn" class="btn btn-warning pull-right" type="submit" value="Update & Logout">
        
    </form>
</div>
</div>
</transition>`

Vue.component('account-view',{

    name : 'accountView',
    template : accountViewTemplate,
    props: ['user','viewMode','changeViewMode','editUserModel','updateUser','imgFileName','getImgInput'],
    data () {
        return {

        }
    },
    methods: {
        

    }

})