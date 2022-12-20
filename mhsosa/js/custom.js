$(document).ready(function(){
    $(".navbar-toggler").click(function(){
      $("body").addClass("menu_Active");
    });
    $(".navbarNav_cross").click(function(){
      $("body").removeClass("menu_Active");
    });
    $('.st_1_itm_cn').matchHeight({byRow: true,});
    $('.st_1_in.owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        autoHeight: true,
        nav:false,
		autoplayTimeout: 6000,
        dots:true,   
        autoplay:true,         
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
});