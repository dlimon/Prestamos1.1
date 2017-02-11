<?php
require('../baseDatos/usaurio.php');
$numero = isset($_GET["i"]) ? $_GET["i"]:'0';
//SELECT MAX(id) FROM `activo_fijo`
$consulta = "SELECT `Nomina`,`DirectorDepartemento`,`Nombre`,`TipoMovimiento`,`NumeroActivo` ,`Departamento`,`Modelo`,`Marca`,`NumeroDeSerie`,`fechaPrestamo` FROM `activo_fijo` WHERE id = ".$numero ;
$resultado = $mysqli->query($consulta);
$arreglo = mysqli_fetch_row($resultado);
mysqli_close($mysqli);
echo json_encode($arreglo);
?>
