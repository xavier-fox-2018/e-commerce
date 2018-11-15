// register modal component
Vue.component('modal', {
    template: '#modal-template'
});

let app = new Vue({
    el: '#app',
    data: {
        showModal: false,
        content: "Welcome Admin..,<hr>"
    },
    methods: {
        
        contentCategory: function() {
            this.content = `<img src="./img/loading.gif" />`;
            axios({
                url: "http://localhost:3000/categories",
                method: "GET"
            })
                .then(function(response) {
                    app.content = `
                        <div style="text-align: left;">
                            
                        </div>
                        <table class="table">
                            <tr>
                                <td>No.</td>
                            </tr>
                        </table>
                    `;
                })
                .catch(function(error) {

                });
        },

        addCategory: function() {
            console.log("hahah")
        }

    }
});