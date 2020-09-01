// Bootstrap JS and CSS
import 'bootstrap';
import jquery from "jquery";
// import '@fortawesome/fontawesome-free/css/all.min.css';

import './../styles/main.scss';

console.log("Hello, 11ty")

window.$ = window.jQuery = jquery
$(document).ready(function() {
  $(window).on('scroll', function () {
    let srcPath = $("#header-logo").attr("src");
    if ($(window).scrollTop() >= 100) {
      $('.navbar').addClass('solid');
      $("#header-logo").attr("src", srcPath.replace('red', 'white'));
    } else {
      $('.navbar').removeClass('solid');
      if (document.getElementsByClassName('header-light').length > 0 ) {
        console.log(srcPath);
        $("#header-logo").attr("src", srcPath.replace('white', 'red'));
      }
    }
  })

  // if (document.getElementsByClassName('header-light').length > 0 ) {
  //   $('.navbar').removeClass('navbar-default');
  //   $('.navbar').addClass('navbar-lighter');
  // } else {
  //   $('.navbar').removeClass('navbar-lighter');
  //   $('.navbar').addClass('navbar-default');
  // }
});
