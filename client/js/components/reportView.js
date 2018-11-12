reportViewTemplate =`<transition name="fade">
<div v-if="viewMode == 'report'" class="container-fluid bg-primary">
    <div class="row px-3">
        <div class="col-5 mx-auto bg-light py-5 px-5">
            <h3 class="text-center"> <b class="text-primary "> Items Report </b> </h3>
            <hr>
            <table class="table table-light table-hover">
                <thead class="thead-default">
                    <tr class="table-info">

                        <th>Date</th>
                        <th class="text-center">Items</th>
                        <th class="text-center">Quantity</th>
                    </tr>
                </thead>
                <tbody v-if="report">
                    <tr v-for="(item,index) in Object.keys(report)">
                        <td> {{item}} </td>
                        <td>
                            <ul v-for="(itemId,index) in Object.keys(report[item])">
                                {{report[item][itemId].name}}
                            </ul>
                        </td>
                        <td>
                            <ul class="text-center" v-for="(itemId,index) in Object.keys(report[item])">
                                {{report[item][itemId].quantity}}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</transition>`

Vue.component('report-view',{

    name : 'reportView',
    template : reportViewTemplate,
    props: ['viewMode','changeViewMode','report'],
    data () {
        return {
        //    report : this.report
        }
    },
    methods: {
        

    }

})