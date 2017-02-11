<?php
require('../baseDatos/usaurio.php');
$nomina = isset($_GET["nomina"]) ? $_GET["nomina"]:'0';
$consultaMax = "SELECT MAX(id) FROM `activo_fijo`";
$obtenerMax = $mysqli->query($consultaMax);
$max = mysqli_fetch_array($obtenerMax);
$idmax = $max[0];
$consultaid = "SELECT id FROM `activo_fijo` WHERE `activo_fijo`.`Nomina` = " . $nomina;
$obtenerID = $mysqli->query($consultaid);
$id = mysqli_fetch_array($obtenerID);
$idActual = $id[0];
$delete = "DELETE FROM `activo_fijo` WHERE `activo_fijo`.`Nomina` = " . $nomina ;
unlink('../pdf/Registros/'.$nomina.'.jpg');
$mysqli->query($delete);
$newID = $id[0];
$newID = $newID + 1;
if($idmax == NULL){

}
else {
  while ($newID <= $idmax) {
    $reconstruir = "UPDATE `activo_fijo` SET `id` = '".$idActual."' WHERE `activo_fijo`.`id` = ".$newID;
    $mysqli->query($reconstruir);
    $idActual = $idActual + 1;
    $newID = $newID + 1;
  }
}
mysqli_close($mysqli);
echo "Activo con numero de nomina : ".$nomina."\n Fue eliminado con exito" ;
?>
