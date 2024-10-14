import { seleccionarClientes, insertarClientes, actualizarClientes, eliminarClientes } from "../modelos/clientes.js";

/* Objetos del DOM */
const listadoClientes = document.querySelector("#listado-clientes");
const alertaClientes = document.querySelector('#alerta-clientes');
const formularioClientes = document.querySelector('#formulario-clientes');
const formularioModalClientes = new bootstrap.Modal(document.querySelector('#formularioModalClientes'));
const btnNuevoClientes = document.querySelector('#btnNuevoClientes');

// Inputs
const inputCodigoClientes = document.querySelector('#codigoClientes');
const inputNombreClientes = document.querySelector('#nombreClientes');
const inputDescripcionClientes = document.querySelector('#descripcionClientes');

// Variables
let opcionClientes = '';
let idClientes;
let mensajeAlertaClientes;
let clientes = [];
let clientesFiltrados = [];

/**
 * Esta función se ejecuta cuando todo el contenido está cargado
 */
document.addEventListener('DOMContentLoaded', async () => {
    clientes = await obtenerClientes();
    mostrarClientes();
});

/**
 * Obtiene los clientes
 */
async function obtenerClientes() {
    return await seleccionarClientes();
}

/**
 * Muestra los clientes
 */
function mostrarClientes() {
    listadoClientes.innerHTML = '';
    clientesFiltrados.forEach(cliente => {
        listadoClientes.innerHTML += `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${cliente.codigo} - ${cliente.nombre}</h5>
                        <p class="card-text">${cliente.descripcion}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn-editar btn btn-primary">Editar</button>
                        <button class="btn-borrar btn btn-danger">Borrar</button>
                        <input type="hidden" class="id-cliente" value="${cliente.id}">
                    </div>
                </div>
            </div>
        `;
    });
}

/**
 * Ejecuta el evento clic del botón Nuevo
 */
btnNuevoClientes.addEventListener('click', () => {
    // Limpiamos los inputs
    inputCodigoClientes.value = '';
    inputNombreClientes.value = '';
    inputDescripcionClientes.value = '';

    // Mostrar el formulario modal
    formularioModalClientes.show();
    opcionClientes = 'insertar';
});

/**
 * Ejecuta el evento submit del formulario
 */
formularioClientes.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir acción por defecto

    const datos = new FormData(formularioClientes); // Guardar datos del formulario

    switch (opcionClientes) {
        case 'insertar':
            mensajeAlertaClientes = 'Cliente guardado';
            insertarClientes(datos);
            break;
        case 'actualizar':
            mensajeAlertaClientes = 'Cliente actualizado';
            actualizarClientes(datos, idClientes);
            break;
    }
    insertarAlerta(mensajeAlertaClientes, 'success');
    mostrarClientes();
});

/**
 * Inserta una alerta en la página
 * @param {string} mensaje - Mensaje de alerta
 * @param {string} clase - Clase de Bootstrap para el estilo de la alerta
 */
function insertarAlerta(mensaje, clase) {
    alertaClientes.innerHTML = '';
    alertaClientes.innerHTML += `
        <div class="alert alert-${clase} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

/**
 * Manejo de eventos de los botones de edición y eliminación
 */
listadoClientes.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-editar')) {
        const cliente = e.target.closest('.card-footer');
        idClientes = cliente.querySelector('.id-cliente').value;
        const { codigo, nombre, descripcion } = clientes.find(cliente => cliente.id == idClientes);
        inputCodigoClientes.value = codigo;
        inputNombreClientes.value = nombre;
        inputDescripcionClientes.value = descripcion;
        opcionClientes = 'actualizar';
        formularioModalClientes.show();
    }

    if (e.target.classList.contains('btn-borrar')) {
        const cliente = e.target.closest('.card-footer');
        idClientes = cliente.querySelector('.id-cliente').value;
        eliminarClientes(idClientes); // Cambiar según el modelo correspondiente para eliminar clientes
        insertarAlerta('Cliente eliminado', 'danger');
        mostrarClientes();
    }
});