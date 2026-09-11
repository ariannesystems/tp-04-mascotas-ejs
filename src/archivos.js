//Importamos los modulos necesarios para el manejo de I/O
const fs = require("node:fs/promises");

/* ==============Funcion de lectura de archivo JSON =================*/
async function leerArchivoJSON( ruta )
{
    try {
        const textoJSON = await fs.readFile( ruta, "utf8" );

        //Me devuelve en formato objeto
        return JSON.parse(textoJSON);
    } 
    catch (error) {
        console.error((`No se pudo leer el archivo JSON: ${error.message}`));
        throw error;
    }
}

//Exportamos las funciones
module.exports = { leerArchivoJSON };