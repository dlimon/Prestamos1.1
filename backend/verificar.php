<?php
require('../baseDatos/usaurio.php');
$user = isset($_GET['user']) ? $_GET['user'] : 'error';
$password = isset($_GET['password']) ? $_GET['password'] : 'error';
$verificar = 0;
 $consulta = 'SELECT * FROM usuarios WHERE  usuario = "'.$user.'"';
          $resultado = $mysqli->query($consulta);
          $reg = mysqli_fetch_row($resultado);
if( $mysqli->connect_errno )
{
echo $verificar;
}
if($user == $reg[1])
{
	if( password_verify($password,"{$reg[2]}"))
	{
		$verificar = 1;
		echo $verificar;
	}
	else{
		echo $verificar;
	}
}
else{
echo $verificar;
}
mysqli_close($mysqli);
?>
