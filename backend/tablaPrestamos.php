<?php
require('../baseDatos/usaurio.php');
$numero = isset($_GET["i"]) ? $_GET["i"]:'0';
$consulta = 'SELECT `Nomina`,`Departamento`,`Nombre`,`TipoMovimiento`,`NumeroActivo` ,`DirectorDepartemento`,`Modelo`,`Marca`,`NumeroDeSerie` FROM `activo_fijo`';
$resultado = $mysqli->query($consulta);
$arreglo = mysqli_fetch_row($resultado);
echo json_encode($arreglo);
?>
