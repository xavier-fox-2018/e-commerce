


Vue.component('test-button', {
    template: `
    <!--Grid column-->
    <div class="col-md-6 mb-4">

    <!--Card-->
    <div class="card">
        <button class="btn btn-danger" @click="getAllUsers">Get All Users</button>

        <!--Card content-->
        <div class="card-body">

            <!-- Table  -->
            <table class="table table-hover">
                <!-- Table head -->
                <thead class="blue lighten-4">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <!-- Table head -->

                <!-- Table body -->
                <tbody style="cursor:pointer">
                    <tr v-for="user in users" data-toggle="modal" data-target="#editUserModal" @click="editUser(user)">
                        <th scope="row">1</th>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.is_admin}}</td>
                    </tr>
                </tbody>
                <!-- Table body -->
            </table>
            <!-- Table  -->

        </div>

    </div>
    <!--/.Card-->

    </div>
    <!--Grid column-->
    `,
    data : function () {
      return {
        message : 'Halo dari admin menu'
      }
    }
})