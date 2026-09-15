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
            res.render("inicio", { titulo: "Mascotas en adopción" });
    });

    app.get("/mascotas", (req, res) => {
        res.render("mascotas/lista", {
            titulo: "Mascotas",
            mascotas,
        });
    });

    app.get("/productos/nuevo", (req, res) => {
        res.render("productos/nuevo", {
            titulo: "Nuevo producto",
            error: null,
            valores: {},
        });
    });

    app.get("/productos/:id", (req, res) => {
        const id = Number(req.params.id);
        const producto = productos.find((elemento) => elemento.id === id);

        if (!producto) {
            return res.status(404).render("no-encontrado", {
                titulo: "Producto no encontrado",
                mensaje: "No existe un producto con ese identificador.",
            });
        }

        res.render("productos/detalle", {
            titulo: producto.nombre,
            producto,
        });
    });

    app.post("/productos", (req, res) => {
        const { nombre, categoria, precio, descripcion } = req.body;
        const nombreLimpio = String(nombre ?? "").trim();
        const categoriaLimpia = String(categoria ?? "").trim();
        const descripcionLimpia = String(descripcion ?? "").trim();
        const precioNumerico = Number(precio);
        if (
            !nombreLimpio ||
            !categoriaLimpia ||
            !descripcionLimpia ||
            !Number.isFinite(precioNumerico) ||
            precioNumerico <= 0
        ) {
            return res.status(400).render("productos/nuevo", {
                titulo: "Nuevo producto",
                error: "Completá todos los campos con valores válidos.",
                valores: req.body,
            });
        }
        const ultimoId = productos.reduce(
            (mayorId, producto) => Math.max(mayorId, producto.id),
            0,
        );
        productos.push({
            id: ultimoId + 1,
            nombre: nombreLimpio,
            categoria: categoriaLimpia,
            precio: precioNumerico,
            descripcion: descripcionLimpia,
        });
        res.redirect("/productos");
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
