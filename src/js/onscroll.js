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




$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('menu__item--active');
        })
        $(this).addClass('menu__item--active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center ul li a').removeClass("menu__item--active");
            currLink.addClass("menu__item--active");
        }
        else{
            currLink.removeClass("menu__item--active");
        }
    });
}
