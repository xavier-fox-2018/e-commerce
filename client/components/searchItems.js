Vue.component('search-item', {
    props: ['keyword', 'getitems', 'getonecategory', 'activecategoryid'],
    data() {
        return {
            searchKeyword: ''
        }
    },
    methods: {
        searchItem: function() {
            this.$emit('send-keyword', this.searchKeyword);
            // console.log(this.searchKeyword);
        }
    },
    watch: {
        searchKeyword() {
            if (this.searchKeyword.length === 0) {
                this.getonecategory(this.activecategoryid);
            } else {
                this.$emit('send-keyword', this.searchKeyword);
            }
        }
    },
    template: `<form @submit.prevent="searchItem()">
                    <div class="input-group mb-3">
                        <input v-model="searchKeyword" class="form-control" type="text" placeholder="Item Name">
                        <div class="input-group-append">
                            <span class="input-group-text">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary align-item-center btn-block">Search</button>
                </form>`
});