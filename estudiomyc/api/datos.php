<?php
// Requerimos el archivo de la clase Modelo
require_once('modelos.php');

$mensaje = '';

if(isset($_GET['tabla'])) {
    $tabla = new ModeloABM($_GET['tabla']);

    if(isset($_GET['id'])) {
        $tabla->set_criterio("id=".$_GET['id']);
    }

    if(isset($_GET['accion'])) {
        if($_GET['accion'] == 'insertar' || $_GET['accion'] == 'actualizar') {
            $valores = $_POST;
        }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = validarEntrada($_POST['accion']);

    switch ($accion) {
        case 'agregar':
            $codigo = validarEntrada($_POST['codigo']);
            $tipoPersona = validarEntrada($_POST['tipoPersona']);
            // Agrega validación para los demás campos según sea necesario
            // Ejemplo:
            $tipoDni = validarEntrada($_POST['tipoDni']);
            // Otros campos...

            agregarCliente($codigo, $tipoPersona, $tipoDni, $apellidoRsocial, $nombres, $domicilioCalle, $domicilioNro, $domicilioPiso, $telefonoCaract, $telefonoNro, $email, $localidad, $cpostal, $fnacimiento, $falta, $fbaja);
            echo json_encode(["success" => "Cliente agregado correctamente."]);
            break;
        
        case 'actualizar':
            $id = validarEntrada($_POST['id']);
            $codigo = validarEntrada($_POST['codigo']);
            // Realiza lo mismo para todos los campos
            actualizarCliente($id, $codigo, $tipoPersona, $tipoDni, $apellidoRsocial, $nombres, $domicilioCalle, $domicilioNro, $domicilioPiso, $telefonoCaract, $telefonoNro, $email, $localidad, $cpostal, $fnacimiento, $falta, $fbaja);
            echo json_encode(["success" => "Cliente actualizado correctamente."]);
            break;

        case 'eliminar':
            $id = validarEntrada($_POST['id']);
            eliminarCliente($id);
            echo json_encode(["success" => "Cliente eliminado correctamente."]);
            break;

        case 'obtener':
            $clientes = obtenerClientes();
            echo json_encode($clientes);
            break;

        default:
            echo json_encode(["error" => "Acción no válida."]);
            break;
    }
}
?>
