
var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	quica = new Quica();
	calacas = [new Calaca(), new Calaca(),
				new Calaca(),new Calaca(),
				new Calaca(),new Calaca()];
				   
	profeB = [new Calaca1(), new Calaca1(),new Calaca1()];
	run();	
	
	$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		quica.actualizar('arriba');
	if(event.which==40 || event.which==83)
		quica.actualizar('abajo');
	if(event.which==39 || event.which==68)
		quica.actualizar('derecha');
	if(event.which==37 || event.which==65)
		quica.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(jugando){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		quica.dibujar(contextoBuffer);
		for(i=0;i<calacas.length;i++){
			calacas[i].dibujar(contextoBuffer);
			calacas[i].actualizar();
			if(quica.colision(calacas[i].x,calacas[i].y)){
				quica.sprite = 2;
				quica.vida--;
				$('#pierde')[0].play();
			}
		}
		
		for(i=0;i<profeB.length;i++){
			profeB[i].dibujar(contextoBuffer);
			profeB[i].actualizar();
			if(quica.colision(profeB[i].x,profeB[i].y)){
				quica.sprite = 2;
				quica.puntos++;
				$('#premio')[0].play();
			}
		}
		
		if(quica.vida <= 0)
			jugando = false;
		
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#6f8589";
		quica.sprite = 3;
		quica.vida = 0;
		quica.dibujar(contextoBuffer);
		contextoBuffer.font = "50px Aharoni";
		contextoBuffer.fillText("GAME OVER", 100, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "20px Aharoni";
		contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	
}


