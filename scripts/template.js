		$('.divisor-verde').css('height', screen.height  - 400)

		$(".pc").hide();

		$( "#InicioTexto" ).show();
		$('.skillConteudo').hide();

			$('.skill').click(function(){
				scrollNaoAbilitado = true;
				$('#MascaraFundo').show();
				var id = $(this).attr("id");

				$('.skillConteudo').each(function(){
					if($(this).hasClass(id)){

						$('.skillConteudo').hide();

						$(this).show("fade",2000);
					}
				});

			});

			$(window).resize(function(){
				if($(window).width() <= 1000){


				}
			});

		var scrollNaoAbilitado = false;

		$('body').on({
	    'mousewheel': function(e) {
	        if(scrollNaoAbilitado){
					e.preventDefault();
	        e.stopPropagation();
				}
	    }
		});


		$('.exit').click(function(){
			scrollNaoAbilitado = false;
			$('#MascaraFundo').hide();
			$(this).parent().hide();
		});

		$(document).ready(function(){
		    //Esconde preloader
		    $(window).load(function(){
				$(window).scrollTop(0);
				$('#visor-sup').height($(window).height());
				$('#visor').height($(window).height());
				
		        $('#preloader').fadeOut(1500, function(){
					$('#preloader').remove();					
				});
		    });

		});



		$(window).scroll(function() {
			if($(window).scrollTop() > ($("#visor").height())){
				$('body > header').css("position","fixed");
			}else{
				$('body > header').css("position","relative");

			}
		});


		$('#circle').click(function(event){
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
			});