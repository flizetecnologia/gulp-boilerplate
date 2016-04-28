(function() {

	jQuery(document).ready(function(){
		jQuery('.external').attr('target', '_blank');
	});

	jQuery(document).on('click', '.menu__collapse--js', function(){
		var opened = $(this).hasClass('isOpen')
		if(opened === true) {
			jQuery(this).removeClass('isOpen');
			jQuery('.menu__nav').slideUp();
		} else {
			jQuery(this).addClass('isOpen');
			jQuery('.menu__nav').slideDown();
		}
	});

  jQuery(document).on('click', '.menu__anchor', function(){

        if(window.innerWidth < 1024) {
          jQuery('.menu__nav').slideUp();
          jQuery('.menu__collapse--js').removeClass('isOpen');
        }


    });


	jQuery(window).resize(function(){
			if(window.innerWidth > 1024) {
				jQuery('.menu__nav').show();
			} else {
				jQuery('.menu__nav').hide();
				jQuery('.menu__collapse--js').removeClass('isOpen');
			}

	});

  jQuery('.smooth').on('click', function (e) {

      e.preventDefault();

      var target = this.hash;
      $target = jQuery(target);

      jQuery('html, body').stop().animate({
          'scrollTop': $target.offset().top + 2
      }, 1000, 'swing', function () {
          window.location.hash = target;
      });

  });

})(jQuery);
