(function() {

  jQuery(document).scroll(function(event){

    goHome();

  });
 
  function goHome() {

    var scrollTop = jQuery(window).scrollTop();
    var windowHeight = jQuery(window).height();
    windowHeight = windowHeight + 5;

    if(scrollTop > windowHeight) {
      jQuery('.gohome--js').fadeIn();
    } else {
      jQuery('.gohome--js').fadeOut();
    }

  }


})(jQuery);
