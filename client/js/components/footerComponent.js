let footerTemplate = `<footer class="footer1">
<div class="footer">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="footer-desc text-center">
                    
                    <p>
                        <a href="" rel="home" title="Super Dev Resources">H8 Bike Store</a> is a popular online store for finding<br>awesome bike . </a>
                    </p>
                </div>
            </div>
            <div class="col">
                <ul class="social">
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                    <li><a href="#"><i class="fa fa-pinterest"></i></a></li>
                    <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                </ul>
            </div>

          
        </div> <!--/.row--> 
    </div> <!--/.container--> 
</div> <!--/.footer-->

<div class="footer-bottom">
    <div class="container">
        <div class="text-center"> Copyright © <a href="">Fathul Q</a>.  All right reserved.</div>
        
    </div>
</div> <!--/.footer-bottom--> 
</footer>`

Vue.component('footerComponent', {
    name : 'footerComponent',
    template : footerTemplate,
    props: [],
    data () {
        return {
            
        }
    }
})