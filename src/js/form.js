
(function() {

  jQuery(document).on('click', '.form__input, .form__textarea', function(){

    jQuery('.form__submit').removeClass('form__submit--sending').removeClass('form__submit--error').removeClass('form__submit--success');
    var lang = $('form').data('lang');
    if(lang == 'pt_br')
      $('.form__submit').val('Enviar');
    else
      $('.form__submit').val('Send');

  });

  jQuery(document).on('click', '.form__submit--js', function(){

    var dados = jQuery('form').serialize();
    var lang = $('form').data('lang');

    jQuery.ajax({

      type: $('form').attr('method'),
      url: $('form').attr('action'),
  		data: dados,
  		dataType: 'json',
  		beforeSend: function(){
        jQuery('.form__submit').removeClass('form__submit--error').addClass('form__submit--sending');
        if(lang == 'pt_br')
          $('.form__submit').val('Enviando');
        else
          $('.form__submit').val('Sending');
  		},
      error: function(data){
        console.log('Error...');
      },
  		success: function(data){

  			console.log(data);

  			switch(data.status)
  			{
  				case '0':
  				  jQuery('.form__submit').removeClass('form__submit--sending').addClass('form__submit--error');
            if(lang == 'pt_br')
              $('.form__submit').val('Erro');
            else
              $('.form__submit').val('Error');
  				break;

  				case '1':
  				  jQuery('.form__submit').removeClass('form__submit--sending').addClass('form__submit--success');
            if(lang == 'pt_br')
              $('.form__submit').val('Enviado');
            else
              $('.form__submit').val('Sended');
  				  jQuery('form')[0].reset();
  				break;
  			}

  		},

  	});

  	return false;

  });

})(jQuery);
