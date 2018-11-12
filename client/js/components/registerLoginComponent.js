let registerLoginViewTemplate = `<transition name="fade">
<div v-if="!user & displayLoginRegister" class="container-fluid py-4  bg-info">
    <div class="container">
        <div class="row">
            <div class="col-4 mx-auto">
                <form>
                    <div class="form-group">
                        <label for="registerName">Name</label>
                        <input type="text" v-model="registerModel.name" class="form-control" placeholder="Name" aria-describedby="regName">
                    </div>
                    <div class="form-group">
                        <label for="registerEmail">Email</label>
                        <input type="email" class="form-control" v-model="registerModel.email" id="registerEmail" autocomplete="email" placeholder="you@example.com">
                    </div>
                    <div class="form-group">
                        <label for="registerPassword">Password</label>
                        <input type="password" v-model="registerModel.password" autocomplete="current-password"  class="form-control" placeholder="Password" aria-describedby="regPass">
                    </div>
                    <input name="registerBtn"  @click.prevent="register" id="registerBtn" class="btn btn-warning pull-right" type="submit" value="Register">
                </form>
            </div>
            <div class="col-4 mx-auto">
                <form>
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" class="form-control" v-model="loginModel.email" id="loginEmail" autocomplete="email" placeholder="your@example.com">
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" v-model="loginModel.password" autocomplete="current-password"  class="form-control" placeholder="Password" aria-describedby="logPass">
                    </div>
                    <input name="loginBtn"  @click.prevent="login" id="loginBtn" class="btn btn-success pull-right" type="submit" value="Login">
                </form>
            </div>
        </div>
    </div>
</div>
</transition>`

Vue.component('registerLoginView', {
    name : 'registerLogin',
    template : registerLoginViewTemplate,
    props: ['user','displayLoginRegister','registerModel','register','loginModel','login'],
    data () {
        return {
            
        }
    }
})