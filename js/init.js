(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function () {
  $('.collapsible').collapsible();
});

$(document).ready(function () {
  $('.modal').modal();
});

$(document).ready(function () {
  $('.carousel').carousel();
});

$(function () { $('.carousel.carousel-slider').carousel({ full_width: true }); });

$('.carousel').carousel({
  padding: 200
});

autoplay();
function autoplay() {
  $('.carousel').carousel('next');
  setTimeout(autoplay, 4500);
}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});

$(document).ready(function () {
  $('.tabs').tabs();
});

$(document).ready(function () {
  $('.tooltipped').tooltip();
});