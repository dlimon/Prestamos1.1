<?php
require('../baseDatos/usaurio.php');
$numero = isset($_GET["i"]) ? $_GET["i"]:'0';
$consulta = 'SELECT * FROM `usuarios` WHERE id = '.$numero ;
$resultado = $mysqli->query($consulta);
$arreglo = mysqli_fetch_row($resultado);
echo json_encode($arreglo);
?>
