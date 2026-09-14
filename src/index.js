const path = require("node:path");
const { leerArchivoJSON } = require("./archivos.js");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");


//Defino una constante para el puerto de escucha 3000
const PORT = 3000;

//Preparamos las rutas del archivo JSON a leer
const rutaDatoJSON = path.join(__dirname, "..", "datos", "mascotas.json");

//Funcion principal de inicio
async function main() {

    try {
            //Leo y transformo el archivo JSON    
            const mascotas = await leerArchivoJSON( rutaDatoJSON );

            //Crear una instancia de la aplicación express
            const app = express();

            //middleware global para parsear el cuerpo de las solicitudes como json
            app.use(express.json());

            //Le comunicamos a express que use el motor ejs para procesar las plantillas
            app.set("view engine", "ejs");

            //Le decimo en donde esta la carpeta de vista de los archivos ejs
            app.set("views", path.join(__dirname, "..", "views"));

            //Renderizo el inicio    
            app.get("/", (req, res) => {
                    res.render("inicio", { titulo: "Mascotas en adopción" });
            });
                                
           //Servidor escuchando listo para las peticiones
           app.listen(PORT, ()=>{
                console.log(`Servidor escuchando en http://localhost:${PORT}`);
           });

    } catch (error) {
            console.error(`Error en la aplicación: ${error.message}`);
            process.exitCode = 1;
    }
}
main();