<?php
require('../baseDatos/usaurio.php');
$nomina = isset($_GET["nomina"]) ? $_GET["nomina"]:'3114025';
//Se hace la busqueda en la base de datos
$consulta = "SELECT * FROM `activo_fijo` WHERE `Nomina` = ".$nomina;
$resultado = $mysqli->query($consulta);
$totalFilas = mysqli_num_rows($resultado);
if ($totalFilas==0) {
  $arreglo = mysqli_fetch_row($resultado);
  mysqli_close($mysqli);
  echo json_encode("NULL");
}
else {
  $arreglo = mysqli_fetch_row($resultado);
  mysqli_close($mysqli);
  echo json_encode($arreglo);
}
?>
