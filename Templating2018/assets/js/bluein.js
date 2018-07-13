;$(document).ready(function(){
  "use strict";
  
  
  /**********************\
  // Loader template
  /************************/
  $(window).on('load', function() {
    $('#loader').fadeOut('fast', function() {
     $(this).remove();
    });
  });

  
  /**********************\
  // Mailchimp init  
  /************************/
  $(".newsletter").ajaxChimp({
    callback: newsletterCallback,
    url: "http://theme-valley.us14.list-manage.com/subscribe/post?u=00195c0c5d470b3a5759cd322&amp;id=a58d202046" 
  }); 
  function newsletterCallback(resp) {
    $("#mc-email").removeClass("error");
    if (resp.result === 'success') {
        $(".subscribe-message").html('<i class="fa fa-check"></i> We have sent you a confirmation email.').fadeIn().css("color", "#fff");
    } else {
        var msg = resp.msg.split("-")[1];
        $(".subscribe-message").html('<i class="fa fa-warning"></i> Please enter a valid email').fadeIn().css("color", "red");
        $("#mc-email").addClass("error");
    }
  }
  
  
  
  
      $(".form-join").on('submit', function(event) {


        event.preventDefault();
        event.stopImmediatePropagation();

        var name = $("#name").val(),
            email = $("#email").val(),
            phone = $("#phone").val(),
            choseOption = $("#chose_option option:selected").val();
        console.log(choseOption);

        if (name === "") {
            $(".contact-message").stop(true).html('<i class="fa fa-warning"></i> Name can\'t be empty.').css("color", "#ef4b4b");
        } else if(email === "") {
            $(".contact-message").stop(true).html('<i class="fa fa-warning"></i> Email field must be filled out.').css("color", "#ef4b4b");
        } else if (!isValidEmailAddress(email)) {
            $(".contact-message").stop(true).html('<i class="fa fa-warning"></i> E-mail address is not valid.').css("color", "#ef4b4b");
        } else if (phone === "") {
            $(".contact-message").stop(true).html('<i class="fa fa-warning"></i> What is your phone number ?').css("color", "#ef4b4b");
        } else {        
            $.ajax({
                type: "POST",
                url: "form-process.php",
                data: {
                  email: email,
                  name : name,
                  phone : phone,
                  choseOption: choseOption,
                },
                success: function() {
                    $(".contact-message").html('<i class="fa fa-check"></i> Thank you for your message!').css("color", "#72c02c");
                    $('#name').val('');
                    $('#email').val('');
                    $('#phone').val('');
                }
            });
        }
    });
  
      function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };
      
  /**********************\
   // nice select init
  /************************/
  $('select').niceSelect();
  
  
  /**********************\
  // form validator  
  /************************/
   $('form').validator();
  
  /**********************\
  // Theme scripts  
  /************************/
  $('.main-nav .nav-link').on('click', function(){
    $('.navbar-collapse').removeClass("show");
  });

  
  /**********************\
  // Smooth Scrolling
  /************************/
  $('.scrolling').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 75
    }, 1000);
    event.preventDefault();
  });


  /**********************\
  /// Fix nav top 
  /************************/
  $(window).on('scroll', function() {
      if ($(this).scrollTop() > 5) {
          $('.site-header').addClass('navbar-fixed-top');
      } else {
          $('.site-header').removeClass('navbar-fixed-top');
      }
  });
  
  

  /**********************\
  /// Scroll to top
  /************************/
      $(window).scroll(function() {
      
       if ($(this).scrollTop() > (($('#news').offset().top - 300)+ ($('#news').outerHeight()) - ($(window).height()))){
         
        $('.scroll-top').addClass('active');
         
       }else {
          $('.scroll-top').removeClass('active');
       }
      
    });
      $('.scroll-top').on('click', function() {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
  }); 
  
  /**********************\
  // Intro slider init
  /************************/
  $('.intro-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true
  });
  

  
  /**********************\
  // Testmonial slider init
  /************************/
  $('.author-quote').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.author-list'
  });
  $('.author-list').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.author-quote',
    centerMode: true,
    focusOnSelect: true,
    centerPadding: '0',
  });
  
  
  /**********************\
  // Screenshot slider init
  /************************/
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    effect: 'coverflow',
    parallax:true,
    spaceBetween:-10,
    loop:true,
    grabCursor: true,
    paginationClickable: true,
    centeredSlides: false,
    slidesPerView: 3,
    coverflow: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows : true
    }
  });

  
/**********************\
// parallax init
/************************/
$('.parallax-bg, #page-intro').parallax("50%", 0.5);
  

  

  
/**********************\
// wow init
/************************/
new WOW().init();
  

  
/**********************\
// screenshots-gallery
/************************/
  $('.screenshots-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function(element) {
        return element.find('img');
      }
    }

  });

  $('.popup-video').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function(element) {
        return element.find('img');
      }
    }
  });
  
  
  
  // handle theme colors
  $('.switcher-trigger').click(function(){
     $('.switcher-wrap').toggleClass('active');
   });
  
   $(function () {
      var setColor = function (color) {
          $('#theme-color').attr("href", "assets/css/color/" + color + ".css");
      }
      $('.color-switcher ul').on('click', 'li', function () {
          var color = $(this).attr("data-color");
          setColor(color);
          $('.color-switcher ul li').removeClass('active');
          $(this).addClass('active');
      });


  });
    

  
});

