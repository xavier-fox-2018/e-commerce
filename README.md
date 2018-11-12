# e-commerce


Vue


<div id="app">

    <div class="container">
        <h1>{{ header }}</h1>


        <input />
    </div>

</div>






new Vue({
    el: '#app',
    data: {
        header: 'Hacktiv Restoran'
    },
    methods: {

    }
})


v-if
v-for
v-model
v-show


<button v-bind:disabled="food.stock === 0">