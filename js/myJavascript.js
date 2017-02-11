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

var menuImpresoras = 0;

function ImpresoraMenu(){
  if (menuImpresoras == 0) {
      document.getElementById('menuImpresoras2').style.display ="block";
      menuImpresoras = 1;
  }
  else {
    document.getElementById('menuImpresoras2').style.display ="none";
    menuImpresoras = 0;
  }
}

function busquedaPrestamo(){
  var buscarNomina = document.getElementById('buscarNominaPrestamo').value;
  $.ajax({
    url: 'backend/buscarPrestamo.php?nomina='+ buscarNomina,
    success: function(respuesta)
    {
      var prestamo = $.parseJSON(respuesta);
      if(prestamo != "NULL"){
      $('#headTablaPrestamos').html('');
      $('#bodyTablaPrestamos').html('');

    var n=0;
      $('#headTablaPrestamos').append(
        '<tr>'+
        '<th class="col-md-2 centrar">Nomina</th>'+
        '<th class="col-md-2 centrar">Drirector de Departamento</th>'+
        '<th class="col-md-2 centrar">Nombre</th>'+
        '<th class="col-md-2 centrar">Tipo de movimiento</th>'+
        '<th class="col-md-2 centrar">Numero de Activo</th>'+
        '<th class="col-md-1 centrar">Departamento</th>'+
        '<th class="col-md-1 centrar">Modelo</th>'+
        '<th class="col-md-1 centrar">Marca</th>'+
        '<th class="col-md-1 centrar">Numero de serie</th>'+
        '<th class="col-md-1 centrar">Fecha del prestamo</th>'+
        '<th class="col-md-1 centrar">Dias transcurridos</th>'+
        '<th class="col-md-1 centrar">Carta activo fijo</th>'+
        '<th class="col-md-1 centrar">Eliminar</th>'+
        '</tr>'
      );


      var hoyPHP = prestamo[9];
      //se obtiene la fecha que esta en la base de datos
      var yearPHPstring = hoyPHP.slice(0,4);
      var yearPHP = parseInt(yearPHPstring);
      var monthPHPstring = hoyPHP.slice(5,7);
      var monthPHP = parseInt(monthPHPstring);
      var dayPHPstring = hoyPHP.slice(8,10);
      var dayPHP = parseInt(dayPHPstring);
      //se obtiene la fecha de hoy en javascript
      var date = new Date();
      var yearJava = date.getFullYear();
      var monthJava = date.getMonth();
      monthJava = monthJava +1;
      var dayJava = date.getDate();

      //funcion que devuelve el último día de un mes y año dados
      function ultimoDia(mes,ano){

      if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
         var ultimo_dia = 31;
         return ultimo_dia;
      }

      if (mes == 4 || mes == 6 || mes == 9 || mes == 11 ) {

         var ultimo_dia = 30;
         return ultimo_dia;
      }

      if (mes == 2 ) {
        var bisiesto = false ;

        var resBisiesto1 = ano % 4;
        var resBisiesto2 = ano % 100;
        var resBisiesto3 = ano % 400;

        if (resBisiesto1 == 0) {
          if (resBisiesto2 == 0) {
                if (resBisiesto3 == 0) {
                  bisiesto = true ;
                }
                else {
                  bisiesto = false ;
                }
          }
          else {
            bisiesto = true ;
          }
        }
        else {
         bisiesto = false ;
        }

        if (bisiesto == true) {
          //es bisiesto
          var ultimo_dia = 29;
          return ultimo_dia;
        }
        else {
          //no es bisiesto
          var ultimo_dia = 28;
          return ultimo_dia;
        }
      }

      }

      var ultimoDia2 = ultimoDia(monthPHP,yearPHP);
      var diasPrestado = 0;
     while (dayPHP != dayJava || monthPHP != monthJava ) {

       if (dayPHP == ultimoDia2) {
         if (monthPHP == 12) {
           monthPHP = 01;
           dayPHP = 01;
           yearPHP = yearPHP + 1;
           ultimoDia2 = ultimoDia(monthPHP,yearPHP);
         }
         else {
           monthPHP = monthPHP + 1;
           dayPHP = 01;
           ultimoDia2 = ultimoDia(monthPHP,yearPHP);
         }
       }
       dayPHP = dayPHP + 1;
       diasPrestado++;
     }
      diasPrestado++;

      var nomina = prestamo[0];
      $('#bodyTablaPrestamos').append(
        '<tr>'+
        '<td class="col-md-2 centrar">'+prestamo[2]+'</td>'+
        '<td class="col-md-2 centrar">'+prestamo[3]+'</td>'+
        '<td class="col-md-2 centrar">'+prestamo[1]+'</td>'+
        '<td class="col-md-2 centrar">'+prestamo[4]+'</td>'+
        '<td class="col-md-2 centrar">'+prestamo[5]+'</td>'+
        '<td class="col-md-2 centrar">'+prestamo[0]+'</td>'+
        '<td class="col-md-2 centrar">'+prestamo[6]+'</td>'+
        '<td class="col-md-2 centrar">'+prestamo[7]+'</td>'+
        '<td class="col-md-2 centrar">'+prestamo[8]+'</td>'+
        '<td class="col-md-2 centrar">'+prestamo[9]+'</td>'+
        '<td class="col-md-2 centrar">'+diasPrestado+'</td>'+
        '<td class="col-md-2 centrar"><a href="pdf/Registros/'+prestamo[0]+'.jpg" target="_blank"><button  class="btnIcono"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></a></td>'+
        "<td class='col-md-2 centrar'><button onclick = 'eliminarRegPrestamos("+nomina+");' class='btnIcono'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></td>"+
        '</tr>');
     }
     else {
       alert("El prestamo con numero de nomina : " + buscarNomina +" no se encuentra");
       areaPrestamos();
     }
    }
  });
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
               document.getElementById("input1Carta").value = "";
               document.getElementById("input2Carta").value = "";
               document.getElementById("input3Carta").value = "";
               document.getElementById("lblDrirector").value = "ServiciosDeApoyo";
               document.getElementById("movimiento1").checked = false;
               document.getElementById("movimiento2").checked = false;
               document.getElementById("movimiento3").checked = false;
               document.getElementById("movimiento4").checked = false;
               document.getElementById("nActivo").value = "";
               document.getElementById("iptMarca").value = "";
               document.getElementById("iptModelo").value = "";
               document.getElementById("iptNumeroS").value = "";
               document.getElementById("uploadImage").value = "";
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
  var menu2 = document.getElementById("menu-color");
  var elem2 = document.getElementById("ventanaSistemas");
 var opacidad = 1;
 var altura = 0;
 var margen =0;
 var id = setInterval(frame1,30);
 function frame1(){
  login.style.display = "block";
  elem.style.display = "block";
  if(altura == -50){
  menu.style.display = "none";
  menu2.style.display = "none";
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
  menu2.style.marginTop = margen + '%';
  elem2.style.marginTop = altura + "%";
  elem2.style.opacity = opacidad ;
  }
 }
}


function abrirVentanaSistemas(){
  areaPrestamos();
  document.getElementById("areaAgregarArticulos").style.display = 'none';
  document.getElementById("areaPrestamos").style.display = 'block';
  document.getElementById("areaAdministrarUsuario").style.display = 'none';
 var menu = document.getElementById("menu");
 var menu2 = document.getElementById("menu-color");
 var opacidad = 1;
 var altura = 0;
 var margen =0;
 var id = setInterval(frame,30);
 function frame(){
  if(altura == -50){
  menu.style.display = "none";
  menu2.style.display = "none";
  document.getElementById("ventanaSistemas").style.display="block";
     clearInterval(id);
  }
  else
  {
  opacidad = opacidad-0.014;
  altura = altura - 0.5;
  margen = margen - 1.3;
  menu2.style.marginTop = margen + '%';
  menu.style.marginTop = margen + '%';
  }
 }

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
         areaUsuarios();
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

function areaUsuarios(){
  var maxUsuario = 0;
    $.ajax({
    url: 'backend/maxUsuarios.php',
    success: function(max)
      {
        maxUsuario = $.parseJSON(max);
        mostrarUsuarios(maxUsuario);
      }
    });
}

function areaPrestamos(){
  var maxPrestamo = 0;
    $.ajax({
    url: 'backend/maxPrestamos.php',
    success: function(max)
      {
        maxPrestamo = $.parseJSON(max);
        mostrarPrestamos(maxPrestamo);
      }
    });
}

function eliminarRegPrestamos(nomina){
  var preguntaEliminar = confirm("Esta seguro que desea eliminar este regitro?\n AVISO : Si elimina el registro el activo fijo se eliminara tambien");
if (preguntaEliminar == true) {
      $.ajax({
      url: 'backend/eliminarRegPrestamos.php?nomina='+nomina,
      success: function(msg)
        {
         alert(msg);
         areaPrestamos();
        }
        });


}
else {
}

}

function mostrarPrestamos(maxPrestamo){
          $('#headTablaPrestamos').html('');
          $('#bodyTablaPrestamos').html('');

        var n=0;
          $('#headTablaPrestamos').append(
            '<tr>'+
            '<th class="col-md-2 centrar">Nomina</th>'+
            '<th class="col-md-2 centrar">Drirector de Departamento</th>'+
            '<th class="col-md-2 centrar">Nombre</th>'+
            '<th class="col-md-2 centrar">Tipo de movimiento</th>'+
            '<th class="col-md-2 centrar">Numero de Activo</th>'+
            '<th class="col-md-1 centrar">Departamento</th>'+
            '<th class="col-md-1 centrar">Modelo</th>'+
            '<th class="col-md-1 centrar">Marca</th>'+
            '<th class="col-md-1 centrar">Numero de serie</th>'+
            '<th class="col-md-1 centrar">Fecha del prestamo</th>'+
            '<th class="col-md-1 centrar">Dias transcurridos</th>'+
            '<th class="col-md-1 centrar">Carta activo fijo</th>'+
            '<th class="col-md-1 centrar">Eliminar</th>'+
            '</tr>'
          );
          while (n <= maxPrestamo) {
            $.ajax({
            url: 'backend/tablaPrestamos.php?i='+ n,
            success: function(arreglo)
              {
                var prestamo = $.parseJSON(arreglo);
                var hoyPHP = prestamo[9];
                //se obtiene la fecha que esta en la base de datos
                var yearPHPstring = hoyPHP.slice(0,4);
                var yearPHP = parseInt(yearPHPstring);
                var monthPHPstring = hoyPHP.slice(5,7);
                var monthPHP = parseInt(monthPHPstring);
                var dayPHPstring = hoyPHP.slice(8,10);
                var dayPHP = parseInt(dayPHPstring);
                //se obtiene la fecha de hoy en javascript
                var date = new Date();
                var yearJava = date.getFullYear();
                var monthJava = date.getMonth();
                monthJava = monthJava +1;
                var dayJava = date.getDate();

                //funcion que devuelve el último día de un mes y año dados
                function ultimoDia(mes,ano){

                if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
                   var ultimo_dia = 31;
                   return ultimo_dia;
                }

                if (mes == 4 || mes == 6 || mes == 9 || mes == 11 ) {

                   var ultimo_dia = 30;
                   return ultimo_dia;
                }

                if (mes == 2 ) {
                  var bisiesto = false ;

                  var resBisiesto1 = ano % 4;
                  var resBisiesto2 = ano % 100;
                  var resBisiesto3 = ano % 400;

                  if (resBisiesto1 == 0) {
                    if (resBisiesto2 == 0) {
                          if (resBisiesto3 == 0) {
                            bisiesto = true ;
                          }
                          else {
                            bisiesto = false ;
                          }
                    }
                    else {
                      bisiesto = true ;
                    }
                  }
                  else {
                   bisiesto = false ;
                  }

                  if (bisiesto == true) {
                    //es bisiesto
                    var ultimo_dia = 29;
                    return ultimo_dia;
                  }
                  else {
                    //no es bisiesto
                    var ultimo_dia = 28;
                    return ultimo_dia;
                  }
                }

                }

                var ultimoDia2 = ultimoDia(monthPHP,yearPHP);
                var diasPrestado = 0;
               while (dayPHP != dayJava || monthPHP != monthJava ) {

                 if (dayPHP == ultimoDia2) {
                   if (monthPHP == 12) {
                     monthPHP = 01;
                     dayPHP = 01;
                     yearPHP = yearPHP + 1;
                     ultimoDia2 = ultimoDia(monthPHP,yearPHP);
                   }
                   else {
                     monthPHP = monthPHP + 1;
                     dayPHP = 01;
                     ultimoDia2 = ultimoDia(monthPHP,yearPHP);
                   }
                 }
                 dayPHP = dayPHP + 1;
                 diasPrestado++;
               }
                diasPrestado++;

                var nomina = prestamo[0];
                $('#bodyTablaPrestamos').append(
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
                  '<td class="col-md-2 centrar">'+prestamo[9]+'</td>'+
                  '<td class="col-md-2 centrar">'+diasPrestado+'</td>'+
                  '<td class="col-md-2 centrar"><a href="pdf/Registros/'+prestamo[0]+'.jpg" target="_blank"><button  class="btnIcono"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></button></a></td>'+
                  "<td class='col-md-2 centrar'><button onclick = 'eliminarRegPrestamos("+nomina+");' class='btnIcono'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></td>"+
                  '</tr>');
              }
            });
               n++;
          }



}

function mostrarUsuarios(maxUsuario){
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
          while (i <= maxUsuario) {
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
  areaUsuarios();
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
     document.getElementById("menu-color").style.display="block";
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
  var menu2 = document.getElementById("menu-color");
	var elem2 = document.getElementById("ventanaSistemas");
 var opacidad = 1;
 var altura = 0;
 var margen =0;
 var id = setInterval(frame2,50);
 function frame2(){
 	if(altura == -50){
  menu.style.display = "block";
  menu.style.marginTop = "0%";
  menu2.style.display = "block";
  menu2.style.marginTop = "0%";
 	elem2.style.display = "none";
 	elem2.style.marginTop = "0%";
 	elem2.style.opacity = 1;
     clearInterval(id);
 	}
 	else
 	{
 	opacidad = opacidad-0.014;
 	altura = altura - 1;
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
