var y = '';
var timer = '';
var intervalo2;
var intervalo1;
var points = 0;

nav = 0;
tiroInimigo = 0;
dificult = 10;
var ammo = 0;
var bateria = 0;

var ammoid = 0;
var bateriaid = 0;
var explosionId = 0;


menu();



function menu(){
	$('#timeText').html();
	$('#timeText').append('<div id="menu-game"><h1>Code Wars</h1><span id="play">Jogar</span><span id="tutorial">Instruções</span><span id="conf">Configurações</span></div>');

	$('#play').click(function(){		
		 ga('send', 'event', 'Jogou',' jogar', 'Code Wars');
		$('#menu-game').remove();
		//$('#timeText').append('<img src="img/star.png"  draggable="false" id="logo"  alt="">');
		//$('#timeText').append('<div class="task" id="task"></div>');
		
		//$('#logo').hide(6000,function(){			
		//	$("#controls").show();
		//	TimeLine();
		//});

		game();		
	});

	$('#tutorial').click(function(){
		
	});

	$('#conf').click(function(){
		$('#menu-game').html('');
		$('#menu-game').append('<span>Volume:<span> ');
		$('#menu-game').append('<span class="voltar">Voltar<span> ');
	});
	
	$('.voltar').click(function(){
		$('#menu-game').html('');
		$('#menu-game').append('<div id="menu-game"><span id="play">Jogar</span><span id="tutorial">Instruções</span><span id="conf">Configurações</span></div>');
	});
	

}






$("#controls .volume").click(function(){
	if($(this).hasClass("glyphicon-volume-up")){
		$(this).removeClass( "glyphicon-volume-up");
		$(this).addClass("glyphicon-volume-off");
		document.getElementById("song").volume = 0;
	}else{
		$(this).removeClass("glyphicon-volume-off");
		$(this).addClass("glyphicon-volume-up");
		document.getElementById("song").volume = 1;
	}
});



function TimeLine(){
	$('.task').scrollTop(0);
	$('.task').hide();
	$('.task').html("<br><br><br><br><br><br><br><br><br>");

	$('.task').html($('.task').html() + "<h1>Episódio I</h1><h2>Um novo começo</h2>");
	$('.task').html($('.task').html() + "<p>A muito tempo,após a crição do protocolo HTTP as forças da NetScape e a Microsoft estavam travando uma grande guerra que estava abalando todos os pilares da web, esse período ficou conhecido como a grande guerra dos navegadores, durante esse período conturbado nasce uma criança predestinda a dominar a arte da programação.</p>");


	animation();

}

function animation(){
	document.getElementById("song").play();
	$('.task').html($('.task').html() + "<br><br><br><br><br><br><br><br><br><br>");
	$('.task').show();
	timer = setInterval(function(){
	$('.task').scrollTop($('.task').scrollTop() + 1);


	var top = 18;
	var maxTop = $('.task').scrollTop() - $('.task').outerHeight();


	if(top == maxTop){
		document.getElementById("song").pause();
		document.getElementById("song").currentTime = 0;
		clearInterval(timer);
		game();
	}
	},40);
}


function game(){
	map();
	drawPlacar();
}



function drawPlacar(){
	ammo = 50;
	bateria = 200;
	points = 0;
	
	$('.timeline').html("Pontuação : <span class='points'>0</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Munição : <span class='ammo'>50</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Bateria : <span class='bateria'>200</span> ");
	
}




function map(){
	$('.task').remove();
	$('#game').remove();

	jsnav();
	ia();	
}

function jsnav(){

	tiros = 0;
	$('#timeText').append('<div id="jsnav"></div>');

	
	var posicao  =  parseInt($('#timeText').css('width')) - 100;
	$("#jsnav").css('right', posicao.toString() + 'px');
	
	var top = parseInt($("#jsnav").css('top'));
	$(document).keydown(function(e){
		if (e.which == 38) {
			if(parseInt($("#jsnav").css('top')) > 30){
				$("#jsnav").css('top','-=10');			
			}
			return false;
		} else if (e.which == 40) {
			if((parseInt($("#timeText").css('height')) - 50) > parseInt($("#jsnav").css('top'))){
				$("#jsnav").css('top','+=10');
			}
			return false;
		} else if (e.keyCode == 32){
			if(ammo > 0){
				tiros++;
				shoot(tiros);
				ammo--;
				getAmmo();				
			}
			return false;
		}else if (e.keyCode == 27){
			Pause();			
		}
		
	});
}

function vbnav(id){

	$('#timeText').append('<div class="vbnav" id="vbnav' + id +'"></div>');
	
	var y = Math.random() * 200;	
	y = Math.round(y);
	
	$('#vbnav' + id).css('top', y.toString() + 'px');
	$('#vbnav' + id).css('right', '10px');


}

function ia(){
	intervalo1 =  setInterval(function(){ 		
		getBateria();
		
		
		var x = Math.random() * dificult;		
		x = Math.round(x);
		if(x == 1){
			nav++;
			vbnav(nav);			
		}
		
		$('.vbnav').each(function(){
			var position  = parseInt($(this).css('right')) + 10;
			$(this).css('right', position.toString() + 'px');				
			if(parseInt($(this).css('right')) >=  parseInt($('#timeText').css('width')) - 30){
				destroi($(this),1);
			}
			
			
			var enemyshot = Math.random() * 10;		
			enemyshot = Math.round(enemyshot);
			if(enemyshot == 1){
				tiroInimigo++;
				EnemyShot($(this),tiroInimigo);
			}	

			var enemyMove = Math.random() * 2;		
			enemyMove = Math.round(enemyMove);
			if(enemyMove == 1){
				if(parseInt($(this).css('top')) < parseInt($('#timeText').css('height')) - 30){
					var position  = parseInt($(this).css('top')) + 10;
					$(this).css('top', position.toString() + 'px');	
				}else{
					var position  = parseInt($(this).css('top')) - 10;
					$(this).css('top', position.toString() + 'px');	
				}
		
			}else if(enemyMove == 2){
				if(parseInt($(this).css('top')) > 30){
					var position  = parseInt($(this).css('top')) - 10;
					$(this).css('top', position.toString() + 'px');	
				}else{
					var position  = parseInt($(this).css('top')) + 10;
					$(this).css('top', position.toString() + 'px');	
				}
			}	
			
		});
		
		
		
		$('.ammobox').each(function(){
			var position  = parseInt($(this).css('right')) + 10;
			$(this).css('right', position.toString() + 'px');				
			if(parseInt($(this).css('right')) >=  parseInt($('#timeText').css('width')) - 30){
				destroi($(this),3);
			}
			
			var y1 = parseInt($("#jsnav").css('top'));
			var y2 = parseInt($("#jsnav").css('top')) + parseInt($("#jsnav").css('height'));
			
			
			var x1 = parseInt($("#jsnav").css('right'));
			var x2 = parseInt($("#jsnav").css('right')) + parseInt($("#jsnav").css('width'));
						
			if((parseInt($(this).css('top')) > y1) && (parseInt($(this).css('top')) < y2)){
				if((parseInt($(this).css('right')) > x1) && (parseInt($(this).css('right')) < x2)){
					setAmmo(30);
					$(this).remove();
				}				
			}
		
		});
		
		$('.batery').each(function(){
			var position  = parseInt($(this).css('right')) + 10;
			$(this).css('right', position.toString() + 'px');				
			if(parseInt($(this).css('right')) >=  parseInt($('#timeText').css('width')) - 30){
				destroi($(this),3);
			}
			
			var y1 = parseInt($("#jsnav").css('top'));
			var y2 = parseInt($("#jsnav").css('top')) + parseInt($("#jsnav").css('height'));
			
			
			var x1 = parseInt($("#jsnav").css('right'));
			var x2 = parseInt($("#jsnav").css('right')) + parseInt($("#jsnav").css('width'));
						
			if(((parseInt($(this).css('top')) > y1) && (parseInt($(this).css('top')) < y2))){
				if((parseInt($(this).css('right')) > x1) && (parseInt($(this).css('right')) < x2)){
					setBatery(50);
					$(this).remove();
				}				
			}
		});
		
		var a = Math.random() * 15;		
		a = Math.round(a);
		if(a == 1){
			ammoid++;
			dropammo(ammoid);			
		}else if(a == 2){
			bateriaid++;
			dropBatery(bateriaid);
		}		
	}, 300);
	
	
	 intervalo2 =  setInterval(function(){ 		
		$('.shoot').each(function(){
			var position  = parseInt($(this).css('right')) - 10 ;
			
			if(position < 30){
				destroi($(this),3);	
			}else{			
				$(this).css('right', position.toString() + 'px');	
				OBJtiro = $(this);
				$('.vbnav').each(function(){
					var y1 = parseInt($(this).css('top'));
					var y2 = parseInt($(this).css('top')) + parseInt($(this).css('height'));
					
					
					var x1 = parseInt($(this).css('right'));
					var x2 = parseInt($(this).css('right')) + parseInt($("#jsnav").css('width'));
								
					if((parseInt(OBJtiro.css('top')) > y1) && (parseInt(OBJtiro.css('top')) < y2)){
						if((parseInt(OBJtiro.css('right')) > x1) && (parseInt(OBJtiro.css('right')) < x2)){
							destroi($(this),2,true);	
							destroi(OBJtiro,3);	
						}				
					}									
				});			
			}
		});
		
		$('.enemy-shoot').each(function(){
			var position  = parseInt($(this).css('right')) + 10 ;
			$(this).css('right', position.toString() + 'px');	
			if(parseInt($(this).css('right')) >=  parseInt($('#timeText').css('width')) - 30){
				destroi($(this),3);
			}
			
			var y1 = parseInt($("#jsnav").css('top'));
			var y2 = parseInt($("#jsnav").css('top')) + parseInt($("#jsnav").css('height'));
			
			
			var x1 = parseInt($("#jsnav").css('right'));
			var x2 = parseInt($("#jsnav").css('right')) + parseInt($("#jsnav").css('width'));
						
			if((parseInt($(this).css('top')) > y1) && (parseInt($(this).css('top')) < y2)){
				if((parseInt($(this).css('right')) > x1) && (parseInt($(this).css('right')) < x2)){
					die('Sua nave foi destruida');	
				}				
			}			
		});
	}, 100);
}


function destroi(objeto,tipo,explode){
	if(explode){
		var x = objeto.css('top');
		var y = objeto.css('right');
		objeto.remove();
		
		explosionId++;
		
		$('#timeText').append('<div class="explosion" id="explosion'+ explosionId +'"></div>');
		$('#explosion'+ explosionId).css('top',x);
		$('#explosion'+ explosionId).css('right',y);
		setTimeout(function (){
			$('#explosion'+ explosionId).remove();
		}, 800);
	}else{
		objeto.remove();
	}
	
	if(tipo == 1){
		getPoints(10);
	}else if(tipo == 2){
		getPoints(50);
	}
}


function getPoints(p){
	points = points + p;
	$('.points').text(points.toString());
}
function getAmmo(){
	$('.ammo').text(ammo.toString());
}

function setAmmo(munition){
	ammo = ammo + munition;
	getAmmo();	
}

function setBatery(b){
	bateria = bateria + b;
	getBateria();
}

function getBateria(){
	bateria--;
	if(bateria == 0){
		die('Você ficou sem bateria');
	}else{
		$('.bateria').text(bateria.toString());
	}
}


function shoot(id){
	$('#timeText').append('<div class="shoot" id="shoot'+ id+'"></div>');	
	
	var posicao = parseInt($("#jsnav").css('top')) + 10.5;
	$("#shoot"+ id.toString()).css('top', posicao.toString() + 'px');	
	
	var posicao  =  parseInt($('#timeText').css('width')) - 110;
	$("#shoot"+ id.toString()).css('right', posicao.toString() + 'px');	
}

function EnemyShot(objeto,id){
	$('#timeText').append('<div class="enemy-shoot" id="shootEnemy'+ id+'"></div>');
	var top = parseInt(objeto.css('top')) + 10.5;
	var right = parseInt(objeto.css('right')) + 20;
	$("#shootEnemy"+ id.toString()).css('top', top.toString() + 'px');
	$("#shootEnemy"+ id.toString()).css('right', right.toString() + 'px');
}

function dropammo(id){

	$('#timeText').append('<div class="ammobox" id="ammobox' + id +'"></div>');
	
	var y = Math.random() * 170;	
	y = Math.round(y) + 30;
	
	$('#ammobox' + id).css('top', y.toString() + 'px');
	$('#ammobox' + id).css('right', '10px');


}
function dropBatery(id){
	$('#timeText').append('<div class="batery" id="batery' + id +'"></div>');
	
	var y = Math.random() * 170;	
	y = Math.round(y) + 30;
	
	$('#batery' + id).css('top', y.toString() + 'px');
	$('#batery' + id).css('right', '10px');
}

function die(descricao){
		clearInterval(intervalo1);
		clearInterval(intervalo2);
		$('#timeText').html('<span class="end-game">Fim de jogo <br>'+ descricao +'<br> Você fez ' + points + ' pontos <br><br> <i class="fa fa-undo restart"></i></span>');
		$('.restart').click(function(){
			$('.end-game').remove();
			menu();
		});
}

function Pause(){
	clearInterval(intervalo1);
	clearInterval(intervalo2);
}