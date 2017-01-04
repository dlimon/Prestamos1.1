<?php
  //Realizamos la conexion a la base de datos
$mysqli = '';
define('DB_HOST','localhost');
//Obtenemos valores ingresados por el usuario (su usuario y contraseña)
define('DB_USER','prestamos');
define('DB_PASSWORD','UTM25mundo');
define('DB_DATABASE' , 'prestamos');
//si el usuario y contraseña son correctos sigue la ejecucion
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);
?>