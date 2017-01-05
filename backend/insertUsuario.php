<?php
require('../baseDatos/usaurio.php');
$user = isset($_GET['user']) ? $_GET['user'] : 'error';
$password = isset($_GET['password']) ? $_GET['password'] : 'error';
$privilegio = isset($_GET['privilegio']) ? $_GET['privilegio'] : 'error';
$passwordcript = password_hash($password , PASSWORD_DEFAULT , ['cost' => 15 ] );
$consulta = 'SELECT MAX(id) AS id FROM usuarios';

$resultadoConsulta = $mysqli->query($consulta);
$idFinal = mysqli_fetch_row($resultadoConsulta);
$numeroFinal=$idFinal[0];
$numeroFinal = $numeroFinal + 1;
$hoy = date("Y-m-d");
$hora = date("h:i:s");

$insertar = "INSERT INTO `usuarios` (`id`, `usuario`, `password`, `fecha`, `hora`, `acceso`) VALUES ('".$numeroFinal."', '".$user."', '".$passwordcript."', '".$hoy."', '".$hora."', '".$privilegio."')";

       $mysqli->query($insertar);

if( $mysqli->connect_errno )
{
echo ("error en la conexion");
}

echo ("El usuario ha sido agregado con exito");
?>
