const urlExpedientes = './api/datos.php?tabla=expedientes';

/**
 * Función asíncrona para seleccionar expedientes
 */
export async function seleccionarExpedientes() {
    let res = await fetch(urlExpedientes + '&accion=seleccionar');
    let datos = await res.json();
    if (res.status !== 200) {
        throw Error('Los datos no se encontraron');
    }
    console.log(datos);
    return datos;
}

/**
 * Inserta los datos en la Base de Datos
 * @param datos Los datos a insertar
 */
export function insertarExpedientes(datos) {
    fetch(`${urlExpedientes}&accion=insertar`, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}

/**
 * Actualiza los datos en la Base de Datos
 * @param datos los datos a actualizar
 * @param id el id del expediente
 */
export const actualizarExpedientes = (datos, id) => {
    fetch(`${urlExpedientes}&accion=actualizar&id=${id}`, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}

/**
 * Elimina los datos de la Base de Datos
 * @param id el id del expediente a eliminar
 */
export const eliminarExpedientes = (id) => {
    fetch(`${urlExpedientes}&accion=eliminar&id=${id}`, {})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        });
}
