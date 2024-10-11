import { seleccionarJuzgados, insertarJuzgados, actualizarJuzgados, eliminarJuzgados } from "../modelos/juzgados.js";

/* Objetos del DOM */
const listadoJuzgados = document.querySelector("#listado-juzgados");
const alertaJuzgados = document.querySelector('#alerta-juzgados');
const formularioJuzgados = document.querySelector('#formulario-juzgados');
const formularioModalJuzgados = new bootstrap.Modal(document.querySelector('#formularioModalJuzgados'));
const btnNuevoJuzgados = document.querySelector('#btnNuevoJuzgados');

// Inputs
const inputCodigoJuzgados = document.querySelector('#codigoJuzgados');
const inputNombreJuzgados = document.querySelector('#nombreJuzgados');
const inputDescripcionJuzgados = document.querySelector('#descripcionJuzgados');

// Variables
let opcionJuzgados = '';
let idJuzgados;
let mensajeAlertaJuzgados;
let juzgados = [];
let juzgadosFiltrados = [];

/**
 * Esta función se ejecuta cuando todo el contenido está cargado
 */
document.addEventListener('DOMContentLoaded', async () => {
    juzgados = await obtenerJuzgados();
    mostrarJuzgados();
});

/**
 * Obtiene los juzgados
 */
async function obtenerJuzgados() {
    return await seleccionarJuzgados();
}

/**
 * Muestra los juzgados
 */
function mostrarJuzgados() {
    listadoJuzgados.innerHTML = '';
    juzgadosFiltrados.forEach(juzgado => {
        listadoJuzgados.innerHTML += `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${juzgado.codigo} - ${juzgado.nombre}</h5>
                        <p class="card-text">${juzgado.descripcion}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn-editar btn btn-primary">Editar</button>
                        <button class="btn-borrar btn btn-danger">Borrar</button>
                        <input type="hidden" class="id-juzgado" value="${juzgado.id}">
                    </div>
                </div>
            </div>
        `;
    });
}

/**
 * Ejecuta el evento clic del botón Nuevo
 */
btnNuevoJuzgados.addEventListener('click', () => {
    // Limpiamos los inputs
    inputCodigoJuzgados.value = '';
    inputNombreJuzgados.value = '';
    inputDescripcionJuzgados.value = '';

    // Mostrar el formulario modal
    formularioModalJuzgados.show();
    opcionJuzgados = 'insertar';
});

/**
 * Ejecuta el evento submit del formulario
 */
formularioJuzgados.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir acción por defecto

    const datos = new FormData(formularioJuzgados); // Guardar datos del formulario

    switch (opcionJuzgados) {
        case 'insertar':
            mensajeAlertaJuzgados = 'Juzgado guardado';
            insertarJuzgados(datos);
            break;
        case 'actualizar':
            mensajeAlertaJuzgados = 'Juzgado actualizado';
            actualizarJuzgados(datos, idJuzgados);
            break;
    }
    insertarAlerta(mensajeAlertaJuzgados, 'success');
    mostrarJuzgados();
});

/**
 * Inserta una alerta en la página
 * @param {string} mensaje - Mensaje de alerta
 * @param {string} clase - Clase de Bootstrap para el estilo de la alerta
 */
function insertarAlerta(mensaje, clase) {
    alertaJuzgados.innerHTML = '';
    alertaJuzgados.innerHTML += `
        <div class="alert alert-${clase} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

/**
 * Manejo de eventos de los botones de edición y eliminación
 */
listadoJuzgados.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-editar')) {
        const juzgado = e.target.closest('.card-footer');
        idJuzgados = juzgado.querySelector('.id-juzgado').value;
        const { codigo, nombre, descripcion } = juzgados.find(juzgado => juzgado.id == idJuzgados);
        inputCodigoJuzgados.value = codigo;
        inputNombreJuzgados.value = nombre;
        inputDescripcionJuzgados.value = descripcion;
        opcionJuzgados = 'actualizar';
        formularioModalJuzgados.show();
    }

    if (e.target.classList.contains('btn-borrar')) {
        const juzgado = e.target.closest('.card-footer');
        idJuzgados = juzgado.querySelector('.id-juzgado').value;
        eliminarJuzgados(idJuzgados); // Cambiar según el modelo correspondiente para eliminar juzgados
        insertarAlerta('Juzgado eliminado', 'danger');
        mostrarJuzgados();
    }
});
