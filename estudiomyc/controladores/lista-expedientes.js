import { seleccionarExpedientes, insertarExpedientes, actualizarExpedientes, eliminarExpedientes } from "../modelos/expedientes.js";

/* Objetos del DOM */
const listadoExpedientes = document.querySelector("#listado-expedientes");
const alertaExpedientes = document.querySelector('#alerta-expedientes');
const formularioExpedientes = document.querySelector('#formulario-expedientes');
const formularioModalExpedientes = new bootstrap.Modal(document.querySelector('#formularioModalExpedientes'));
const btnNuevoExpedientes = document.querySelector('#btnNuevoExpedientes');

// Inputs
const inputCodigoExpedientes = document.querySelector('#codigoExpedientes');
const inputNombreExpedientes = document.querySelector('#nombreExpedientes');
const inputDescripcionExpedientes = document.querySelector('#descripcionExpedientes');

// Variables
let opcionExpedientes = '';
let idExpedientes;
let mensajeAlertaExpedientes;
let expedientes = [];
let expedientesFiltrados = [];

/**
 * Esta función se ejecuta cuando todo el contenido está cargado
 */
document.addEventListener('DOMContentLoaded', async () => {
    expedientes = await obtenerExpedientes();
    mostrarExpedientes();
});

/**
 * Obtiene los expedientes
 */
async function obtenerExpedientes() {
    return await seleccionarExpedientes();
}

/**
 * Muestra los expedientes
 */
function mostrarExpedientes() {
    listadoExpedientes.innerHTML = '';
    expedientesFiltrados.forEach(expediente => {
        listadoExpedientes.innerHTML += `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${expediente.codigo} - ${expediente.nombre}</h5>
                        <p class="card-text">${expediente.descripcion}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn-editar btn btn-primary">Editar</button>
                        <button class="btn-borrar btn btn-danger">Borrar</button>
                        <input type="hidden" class="id-expediente" value="${expediente.id}">
                    </div>
                </div>
            </div>
        `;
    });
}

/**
 * Ejecuta el evento clic del botón Nuevo
 */
btnNuevoExpedientes.addEventListener('click', () => {
    // Limpiamos los inputs
    inputCodigoExpedientes.value = '';
    inputNombreExpedientes.value = '';
    inputDescripcionExpedientes.value = '';

    // Mostrar el formulario modal
    formularioModalExpedientes.show();
    opcionExpedientes = 'insertar';
});

/**
 * Ejecuta el evento submit del formulario
 */
formularioExpedientes.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir acción por defecto

    const datos = new FormData(formularioExpedientes); // Guardar datos del formulario

    switch (opcionExpedientes) {
        case 'insertar':
            mensajeAlertaExpedientes = 'Expediente guardado';
            insertarExpedientes(datos);
            break;
        case 'actualizar':
            mensajeAlertaExpedientes = 'Expediente actualizado';
            actualizarExpedientes(datos, idExpedientes);
            break;
    }
    insertarAlerta(mensajeAlertaExpedientes, 'success');
    mostrarExpedientes();
});

/**
 * Inserta una alerta en la página
 * @param {string} mensaje - Mensaje de alerta
 * @param {string} clase - Clase de Bootstrap para el estilo de la alerta
 */
function insertarAlerta(mensaje, clase) {
    alertaExpedientes.innerHTML = '';
    alertaExpedientes.innerHTML += `
        <div class="alert alert-${clase} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

/**
 * Manejo de eventos de los botones de edición y eliminación
 */
listadoExpedientes.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-editar')) {
        const expediente = e.target.closest('.card-footer');
        idExpedientes = expediente.querySelector('.id-expediente').value;
        const { codigo, nombre, descripcion } = expedientes.find(expediente => expediente.id == idExpedientes);
        inputCodigoExpedientes.value = codigo;
        inputNombreExpedientes.value = nombre;
        inputDescripcionExpedientes.value = descripcion;
        opcionExpedientes = 'actualizar';
        formularioModalExpedientes.show();
    }

    if (e.target.classList.contains('btn-borrar')) {
        const expediente = e.target.closest('.card-footer');
        idExpedientes = expediente.querySelector('.id-expediente').value;
        eliminarExpedientes(idExpedientes); // Cambiar según el modelo correspondiente para eliminar expedientes
        insertarAlerta('Expediente eliminado', 'danger');
        mostrarExpedientes();
    }
});
