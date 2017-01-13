<?php
require('../baseDatos/usaurio.php');
$mensaje="";
$nomina="default";
$departamento = isset($_POST["Departamento"]) ? $_POST["Departamento"] : $mensaje = "!Aviso: campos vacios";
$nombreCompleto = isset($_POST["nombreCompleto"]) ? $_POST["nombreCompleto"] : $mensaje = "!Aviso: campos vacios";
$nomina = isset($_POST["nomina"]) ? $_POST["nomina"] : $mensaje = "!Aviso: campos vacios";
$DirectorDelDepartamento = isset($_POST["DirectorDelDepartamento"]) ? $_POST["DirectorDelDepartamento"] : $mensaje = "!Aviso: campos vacios";
$arregloMovimiento[0] = isset($_POST["asignacion"] )?$_POST["asignacion"]:"off" ;
$arregloMovimiento[1] = isset($_POST["reAsignacion"])?$_POST["reAsignacion"]:"off";
$arregloMovimiento[2] = isset($_POST["pretsamoTemporal"])?$_POST["pretsamoTemporal"]:"off";
$arregloMovimiento[3] = isset($_POST["devolucion"])?$_POST["devolucion"]:"off";
$i = 0 ;
$TipoMovimiento = "sinAsignar";
while($i < 4){
  if($arregloMovimiento[$i] != "off"){
    switch ($i) {
      case 0:
        $TipoMovimiento = "Asignación";
        break;

      case 1:
        $TipoMovimiento = "Re-Asignación";
        break;

      case 2:
        $TipoMovimiento = "Préstamo Temporal";
        break;

      case 3:
        $TipoMovimiento = "Devolución";
        break;

      default:
        die("!Aviso: no se selecciono un tipo de movimiento");
        break;
    }
  }
  $i++;
}

$i = 0;
$nActivo = isset($_POST["nActivo"]) ? $_POST["nActivo"] : $mensaje = "!Aviso: campos vacios";
$marca = isset($_POST["marca"]) ? $_POST["marca"] : $mensaje = "!Aviso: campos vacios";
$modelo = isset($_POST["modelo"]) ? $_POST["modelo"] : $mensaje = "!Aviso: campos vacios";
$numeroDeSerie = isset($_POST["numeroDeSerie"]) ? $_POST["numeroDeSerie"] : $mensaje = "!Aviso: campos vacios";
if($departamento == "" || $nombreCompleto == "" || $nomina == "" || $DirectorDelDepartamento == "" || $nActivo == ""  || $marca == "" || $modelo == "" || $numeroDeSerie == "" ){
  echo "!Aviso: Campos vacios, llene los campos vacios";
}
  else {
    if($TipoMovimiento == "sinAsignar"){
       echo "!Aviso: no se selecciono un tipo de movimiento";
    }
    else {
      if($_FILES['imageActivoFijo']['tmp_name']!="")
      {
      move_uploaded_file($_FILES['imageActivoFijo']["tmp_name"], "../pdf/Registros/".$nomina.".jpg");
      $insert = "INSERT INTO `activo_fijo` (`Departamento`, `Nombre`, `Nomina`, `DirectorDepartemento`, `TipoMovimiento`, `NumeroActivo`, `Marca`, `Modelo`, `NumeroDeSerie`)
       VALUES ('".$departamento."', '".$nombreCompleto."', '".$nomina."', '".$DirectorDelDepartamento."', '".$TipoMovimiento."', '".$nActivo."', '".$marca."', '".$modelo."', '".$numeroDeSerie."')";
       $mysqli->query($insert);
       echo "CARTA RESPONSIVA DE ACTIVO FIJO \n A nombre de : ".$nombreCompleto." \n Con numero de nomina : ".$nomina." \n capturado con exito! ";
      }
      else {
        echo "!Aviso :se deve subir la carta de activo fijo";
      }
    }
  }
mysqli_close($mysqli);
?>
