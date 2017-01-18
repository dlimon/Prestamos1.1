<?php
require('../baseDatos/usaurio.php');
$numero = isset($_GET["i"]) ? $_GET["i"]:'0';
//Se selecciona el mayor numero de la tabla
$consulta = "SELECT MAX(id) FROM `activo_fijo`";
$resultado = $mysqli->query($consulta);
$arreglo = mysqli_fetch_row($resultado);
mysqli_close($mysqli);
echo json_encode($arreglo);
?>
