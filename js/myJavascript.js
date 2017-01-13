function movimiento12(){
  document.getElementById('movimiento1').checked = true;
  document.getElementById('movimiento2').checked = false;
  document.getElementById('movimiento3').checked = false;
  document.getElementById('movimiento4').checked = false;
}

function movimiento22(){
  document.getElementById('movimiento1').checked = false;
  document.getElementById('movimiento2').checked = true;
  document.getElementById('movimiento3').checked = false;
  document.getElementById('movimiento4').checked = false;
}

function movimiento32(){
  document.getElementById('movimiento1').checked = false;
  document.getElementById('movimiento2').checked = false;
  document.getElementById('movimiento3').checked = true;
  document.getElementById('movimiento4').checked = false;
}

function movimiento42(){
  document.getElementById('movimiento1').checked = false;
  document.getElementById('movimiento2').checked = false;
  document.getElementById('movimiento3').checked = false;
  document.getElementById('movimiento4').checked = true;
}

//se sube la carta de activo fijo
function subirActivoFijo(){


$("#idForm").submit(function(e) {
    e.preventDefault();
    var url = "backend/subirActivoFijo.php";
    var formData = new FormData($(this)[0]);
   $.ajax({
           type: "POST",
           url: url,
           data: formData,
           contentType: false,
           processData: false,
           success: function(data)
           {
               alert(data);
           }
         });
         document.getElementById("#idForm").reset();
  return false;
});
}


function cerrarSesion(){
  elem = document.getElementById("login");
  login = document.getElementById('login2');
  var menu = document.getElementById("menu");
  var elem2 = document.getElementById("ventanaSistemas");
 var opacidad = 1;
 var altura = 0;
 var margen =0;
 var id = setInterval(frame,30);
 function frame(){
  login.style.display = "block";
  elem.style.display = "block";
  if(altura == -50){
  menu.style.display = "none";
  elem2.style.display = "none";
  elem2.style.marginTop = "0%";
  elem2.style.opacity = 1;
     clearInterval(id);
  }
  else
  {
  opacidad = opacidad-0.014;
  altura = altura - 0.5;
  margen = margen - 1.3;
  menu.style.marginTop = margen + '%';
  elem2.style.marginTop = altura + "%";
  elem2.style.opacity = opacidad ;
  }
 }
}


function abrirVentanaSistemas(){
  var menu = document.getElementById("menu");
 var opacidad = 1;
 var altura = 0;
 var margen =0;
 var id = setInterval(frame,30);
 function frame(){
  if(altura == -50){
  menu.style.display = "none";
     clearInterval(id);
  }
  else
  {
  opacidad = opacidad-0.014;
  altura = altura - 0.5;
  margen = margen - 1.3;
  menu.style.marginTop = margen + '%';
  }
 }
  document.getElementById("ventanaSistemas").style.display="block";
}

function insertarUsuario(){

  var user = document.getElementById("userInsert").value;
  var password = document.getElementById("passwordInsert").value;
  var passconf = document.getElementById("confPassword").value;
  var privilegio = document.getElementById("privilegio").value;
  var letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
  if(user == '' || password == '' || passconf == ''){
    alert("campos vacios, no debe ver campos vacios");
  }
  else {
    if(password == passconf){

      //var userString = String(user);
      var patron = /^[a-zA-Z]*$/;
      if(!user.search(patron)){
        document.getElementById("btnAgregarUsuario").value = "Procesando petición...";
        $.ajax({
         url: "backend/insertUsuario.php?user="+user+"&password="+password+"&privilegio="+privilegio,
         data: user,
        success: function (response) {
         alert(response);
         document.getElementById("btnAgregarUsuario").value = "Agregar Usuarios";
         mostrarUsuarios();
        }
      });
       }
       else {
         alert("el nombre de usuario no deve contener caracteres especiales como (*,$,-,%)");
       }

    }
    else {
      alert("las contraseñas no concuerdan");
    }
  }
}
mostrarPrestamos();
function mostrarPrestamos(){
          $('#headTablaPrestamos').html('');
          $('#bodyTablaPrestamos').html('');
        var i=0;
          $('#headTablaPrestamos').append(
            '<tr>'+
            '<th class="col-md-2 centrar">Nomina</th>'+
            '<th class="col-md-2 centrar">Departamento</th>'+
            '<th class="col-md-2 centrar">Nombre</th>'+
            '<th class="col-md-2 centrar">Tipo de movimiento</th>'+
            '<th class="col-md-2 centrar">Numero de Activo</th>'+
            '<th class="col-md-1 centrar">Drirector de Departamento</th>'+
            '<th class="col-md-1 centrar">Modelo</th>'+
            '<th class="col-md-1 centrar">Marca</th>'+
            '<th class="col-md-1 centrar">Numero de serie</th>'+
            '</tr>'
          );
          while (i<10) {
            $.ajax({
            url: 'backend/tablaUsuarios.php?i='+i,
            success: function(arreglo)
              {
                var prestamo = $.parseJSON(arreglo);
                $('#bodyTablaUsuarios').append(
                  '<tr>'+
                  '<td class="col-md-2 centrar">'+prestamo[0]+'</td>'+
                  '<td class="col-md-2 centrar">'+prestamo[1]+'</td>'+
                  '<td class="col-md-2 centrar">'+prestamo[2]+'</td>'+
                  '<td class="col-md-2 centrar">'+prestamo[3]+'</td>'+
                  '<td class="col-md-2 centrar">'+prestamo[4]+'</td>'+
                  '<td class="col-md-2 centrar">'+prestamo[5]+'</td>'+
                  '<td class="col-md-2 centrar">'+prestamo[6]+'</td>'+
                  '<td class="col-md-2 centrar">'+prestamo[7]+'</td>'+
                  '<td class="col-md-2 centrar">'+prestamo[8]+'</td>'+
                  '</tr>');
              }
            });
               i++;
          }



}

function mostrarUsuarios(){
          $('#headTablaUsuarios').html('');
          $('#bodyTablaUsuarios').html('');
        var i=0;
          $('#headTablaUsuarios').append(
            '<tr>'+
            '<th class="col-md-2 centrar">Usuario</th>'+
            '<th class="col-md-2 centrar">contraseña</th>'+
            '<th class="col-md-2 centrar">Fecha de captura</th>'+
            '<th class="col-md-2 centrar">Hora de captura</th>'+
            '<th class="col-md-2 centrar">Privilegios</th>'+
            '<th class="col-md-1 centrar">Modificar</th>'+
            '<th class="col-md-1 centrar">Eliminar</th>'+
            '</tr>'
          );
          while (i<10) {
            $.ajax({
            url: 'backend/tablaUsuarios.php?i='+i,
            success: function(arreglo)
              {
                var usuario = $.parseJSON(arreglo);
                $('#bodyTablaUsuarios').append(
                  '<tr>'+
                  '<td class="col-md-2 centrar">'+usuario[1]+'</td>'+
                  '<td class="col-md-2 centrar">************</td>'+
                  '<td class="col-md-2 centrar">'+usuario[3]+'</td>'+
                  '<td class="col-md-2 centrar">'+usuario[4]+'</td>'+
                  '<td class="col-md-2 centrar">'+usuario[5]+'</td>'+
                  '<td class="col-md-1 centrar"><button class="btnIcono"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>'+
                  '<td class="col-md-1 centrar"><button class="btnIcono"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>'+
                  '</tr>');
              }
            });
               i++;
          }



}

function agregarArticulos(){
  document.getElementById("areaAgregarArticulos").style.display = 'block';
  document.getElementById("areaPrestamos").style.display = 'none';
  document.getElementById("areaAdministrarUsuario").style.display = 'none';
}

function prestamos(){
  document.getElementById("areaAgregarArticulos").style.display = 'none';
  document.getElementById("areaPrestamos").style.display = 'block';
  document.getElementById("areaAdministrarUsuario").style.display = 'none';
}

function AdministrarUsuarios(){
  document.getElementById("areaAgregarArticulos").style.display = 'none';
  document.getElementById("areaPrestamos").style.display = 'none';
  document.getElementById("areaAdministrarUsuario").style.display = 'block';
  mostrarUsuarios();
}

function verificar(){
	document.getElementById("btnVerificar").innerHTML="procesando...";
	document.getElementById("btnVerificar").disabled = true;
 var user = document.getElementById("user").value;
 var password = document.getElementById("textLogin").value;

 $.ajax({
  url: "backend/verificar.php?user="+user+"&password="+password,
  data: user,
 success: function (response) {
       if(response == 1)
       {
       	 		document.getElementById("btnVerificar").innerHTML="ingresar";
 		document.getElementById("btnVerificar").disabled = false;
          //document.getElementById("ventanaSistemas").style.display="block";
 var elem = document.getElementById("login");
  var login = document.getElementById('login2');
 var top = 19;
 var altura = 100;
 var margen =0;
 var id = setInterval(frame,30);
 function frame(){
 	if(altura == 0){
 		document.getElementById("btnVerificar").innerHTML="ingresar";
 		document.getElementById("btnVerificar").disabled = false;
 		login.style.display = "none";
 		login.style.marginTop = 0 + '%';
 		elem.style.display = "none";
 	 elem.style.paddingTop = "20%";
 	elem.style.height = "100%";
  menu.style.marginTop = '0%';
     clearInterval(id);
     document.getElementById("menu").style.display="block";
 	}
 	else
 	{
 	top--;
 	altura= altura-2;
 	margen = margen - 1;
 	login.style.marginTop = margen + '%';
 	elem.style.paddingTop = top + "%";
 	elem.style.height = altura + "%";
 	}
 }


       }
       else{
       	document.getElementById("btnVerificar").innerHTML="ingresar";
       	document.getElementById("btnVerificar").disabled = false;
       	alert('usuario o contrasena incorrectos');
       }
        }
});

}



function cerrarPrestamos(){
	elem = document.getElementById("login");
	login = document.getElementById('login2');
  var menu = document.getElementById("menu");
	var elem2 = document.getElementById("ventanaSistemas");
 var opacidad = 1;
 var altura = 0;
 var margen =0;
 var id = setInterval(frame,30);
 function frame(){
 	if(altura == -50){
  menu.style.marginTop = "0%";
 	elem2.style.display = "none";
 	elem2.style.marginTop = "0%";
 	elem2.style.opacity = 1;
     clearInterval(id);
 	}
 	else
 	{
    menu.style.display = "block";
 	opacidad = opacidad-0.014;
 	altura = altura - 0.5;
 	elem2.style.marginTop = altura + "%";
 	elem2.style.opacity = opacidad ;
 	}
 }
}
var background = document.getElementById('background');
position = 0;

/*var mover = setInterval(moverX,30);
function moverX(){
	if(position >= 100){
		position = 0;
		document.body.style.backgroundPosition = position + '%';
	}
	else{
		position = position + 0.02;
		document.body.style.backgroundPosition = position + '%';
	}
}*/
