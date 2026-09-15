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

    //Leo y transformo el archivo JSON    
    const mascotas = await leerArchivoJSON( rutaDatoJSON );

    //Crear una instancia de la aplicación express
    const app = express();

    //Le comunicamos a express que use el motor ejs para procesar las plantillas
    app.set("view engine", "ejs");

    //Le decimo en donde esta la carpeta de vista de los archivos ejs
    app.set("views", path.join(__dirname, "..", "views"));

    app.use(expressLayouts);

    //Lectura de la vista principal HTML
    app.set("layout", "layouts/main");

    //Lectura de la ruta de los recursos estáticos
    app.use(express.static(path.join(__dirname, "..", "public")));

    //Traduce lo que viene en la peticion en html a objeto de javascript que entiende express
    app.use(express.urlencoded({ extended: false }));

    //Renderizo el inicio    
    app.get("/", (req, res) => {
            res.render("inicio", { titulo: "Encuentra a tu compañero ideal" });
    });

    //Extraigo el catalogo de mascotas, todas
    app.get("/mascotas", (req, res) => {
        res.render("mascotas/lista", {
            titulo: "Lista de mascotas",
            mascotas,
        });
    });

    app.get("/mascotas/nuevo", (req, res) => {
        res.render("mascotas/nuevo", {
            titulo: "Nueva mascota",
            error: null,
            valores: {},
        });
    });

    app.get("/mascotas/:id", (req, res) => {
        const id = Number(req.params.id);
        const mascota = mascotas.find((elemento) => elemento.id === id);

        if (!mascota) {
            return res.status(404).render("no-encontrado", {
                titulo: "Mascota no encontrada",
                mensaje: "No existe una mascota con ese identificador.",
            });
        }

        res.render("mascotas/detalle", {
            titulo: mascota.nombre,
            mascota,
        });
    });

    app.post("/mascotas", (req, res) => {

        const { nombre, especie, edad, descripcion, estado, imagen } = req.body;

        const nombreLimpio = String(nombre ?? "").trim();
        const especieLimpia = String(especie ?? "").trim();
        const edadNumerica = Number(edad )
        const descripcionLimpia = String(descripcion ?? "").trim();
        const estadoLimpia = String(estado ?? "").trim();
        const rutaImagenLimpia = String(imagen ?? "").trim();

        if (
            !nombreLimpio ||
            !especieLimpia ||
            !descripcionLimpia ||
            !estadoLimpia ||
            !rutaImagenLimpia ||
            !Number.isFinite(edadNumerica) ||
            edadNumerica <= 0
        ) {
            return res.status(400).render("mascotas/nuevo", {
                titulo: "Nueva mascota",
                error: "Completá todos los campos con valores válidos.",
                valores: req.body,
            });
        }

        //Generamos el siguiente id del json nueva propiedades
        const ultimoId = mascotas.reduce(
            (mayorId, mascota) => Math.max(mayorId, mascota.id),
            0,
        );
        mascotas.push({
            id: ultimoId + 1,
            nombre: nombreLimpio,
            especie: especieLimpia,
            edad: edadNumerica,
            descripcion: descripcionLimpia,
            estado: estadoLimpia,
            imagen: rutaImagenLimpia,
        });
        res.redirect("/mascotas");
    });

                        
    //Servidor escuchando listo para las peticiones
    app.listen(PORT, ()=>{
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
}
main().catch((error) => {
    console.error("No se pudo iniciar la aplicación:", error);
    process.exitCode = 1;
});
