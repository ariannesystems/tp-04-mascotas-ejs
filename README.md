# Trabajo práctico 04

## Descripción

Este proyecto corresponde al Trabajo Práctico 04 del curso de Desarrollo Back-end con Node.js.

La aplicación consiste en un sitio web para consultar mascotas en adopción y agregar temporalmente nuevos registros mediante un formulario.

El proyecto utiliza Node.js, Express y EJS para generar páginas HTML renderizadas en el servidor. Los datos iniciales de las mascotas se cargan desde un archivo JSON ubicado en datos/mascotas.json.

La aplicación permite:

Acceder a una página inicial.
Consultar un catálogo de mascotas en adopción.
Ver el detalle de una mascota.
Mostrar una página HTML de error 404 cuando una mascota no existe.
Acceder a un formulario para agregar nuevas mascotas.
Validar los datos enviados mediante el formulario.
Conservar los valores ingresados cuando ocurre un error de validación.
Agregar nuevas mascotas temporalmente en memoria.
Redirigir al catálogo después de crear correctamente una mascota.
Utilizar un layout principal y parciales reutilizables.
Servicio de recursos estáticos como CSS, SVG y JavaScript.

Las nuevas mascotas creadas mediante el formulario no se guardan en el archivo JSON, por lo que solamente permanecen disponibles mientras el servidor está ejecutándose.

## Instalación

Para instalar y ejecutar el proyecto es necesario tener instalado Node.js y npm.

Primero se debe clonar o descargar el repositorio.

Luego, desde la carpeta raíz del proyecto, ejecutar:

npm install

Este comando instala las dependencias definidas en package.json.

Las principales dependencias utilizadas por el proyecto son:

express: permite crear el servidor web y definir las rutas.
ejs: permite generar HTML dinámicamente utilizando plantillas.
express-ejs-layouts: permite utilizar un layout principal compartido por las diferentes vistas.
La carpeta node_modules se genera automáticamente durante la instalación y no debe incluirse en el repositorio.

## Ejecución

Para iniciar la aplicación se utiliza: npm start

El comando ejecuta: node src/index.js

Una vez iniciado el servidor, se puede acceder a la aplicación desde el navegador utilizando la dirección local indicada por el servidor.
También se puede comprobar la sintaxis de los archivos principales mediante:

npm run check

Este comando verifica la sintaxis de: src/index.js y src/archivos.js

## Páginas y rutas

La aplicación implementa las rutas obligatorias indicadas en la consigna.

Página inicial: GET /
Es la página principal de la aplicación.

Listado de mascotas: GET /mascotas
Muestra el catálogo de mascotas.

Formulario de nueva mascota: GET /mascotas/nueva
Muestra el formulario utilizado para agregar una nueva mascota. La ruta /mascotas/nueva se declara antes de /mascotas/:id para evitar que nueva sea interpretado como un identificador de mascota.

Detalle de una mascota: GET /mascotas/:id
Permite consultar la información completa de una mascota utilizando su identificador. Cuando el identificador no existe, la aplicación responde con estado HTTP 404 y renderiza la vista: views/no-encontrado.ejs. La página de detalle también incluye un enlace para regresar al listado.

Creación de una mascota: POST /mascotas
Esta ruta recibe los datos enviados desde el formulario. El nuevo registro no se escribe en el archivo JSON.

## Estructura de vistas

Las vistas de la aplicación se encuentran dentro de la carpeta:

views/

```text
view/
├── layouts/
│   └── main.ejs
├── mascotas/
│   └── deatlle.ejs
|   └── lista.ejs
|   └── nuevo.ejs
├── partials/
│   └── encabezado.ejs
|   └── pie.ejs
├── inicio.ejs
└── no-encontrado.ejs
```

## Recursos estáticos

Los recursos estáticos se encuentran dentro de:

```text
public/
├── css/
│  └── estilos.css
├── img/
│   └── mascotas.svg
└── js
    └── app.js
```

## Formulario

El formulario se encuentra asociado a: GET /mascotas/nueva, y envía los datos mediante: POST /mascotas

La etiqueta <form> utiliza: <form action="/mascotas" method="post">

Cada control posee un id y un name.
Los campos solicitados son:

Nombre.
Especie.
Edad.
Estado.
Descripción.

Para el estado se utilizan los valores permitidos:
En adopción.
Reservada.
Adoptada.

La aplicación realiza una validación mínima antes de crear una nueva mascota.

## Persistencia de los datos

Los datos iniciales de las mascotas se encuentran almacenados en: datos/mascotas.json

Este archivo contiene al menos nueve registros iniciales. Cuando se inicia el servidor, estos datos son leídos y cargados en memoria.
Las mascotas creadas mediante el formulario se agregan solamente al arreglo que se encuentra en memoria.
No se modifica el archivo: datos/mascotas.json
Por este motivo, los nuevos registros no tienen persistencia permanente.

Explicar:

- diferencia entre layout, vista y parcial;
  Layout: estructura general que se comparte entre las páginas, como el encabezado, contenido y pie.
  Vista: contiene el contenido específico de cada página.
  Parcial: fragmento reutilizable, como el encabezado o pie de página.

- datos enviados a una vista mediante res.render;
  res.render() permite mostrar una vista EJS y enviarle datos desde el servidor para que sean utilizados al
  generar el HTML.

- función de express.static ;
  express.static permite que Express sirva archivos estáticos, como archivos CSS, imágenes y JavaScript, desde la
  carpeta public.

- función de express.urlencoded ;
  express.urlencoded permite recibir y procesar en req.body los datos enviados desde formularios HTML mediante
  POST. express.urlencoded() hace posible que los datos que el usuario escribe en el formulario lleguen correctamente
  al servidor y puedan ser leídos mediante req.body.

- recorrido POST, redirección y GET;
  El usuario envía el formulario mediante POST, el servidor procesa los datos y, si son correctos, realiza una
  redirección hacia una ruta GET, donde se muestra el resultado actualizado.

- motivo por el cual el nuevo registro desaparece al reiniciar
  El nuevo registro se guarda solamente en memoria y no en el archivo JSON. Al reiniciar el servidor, la memoria
  se pierde y se vuelven a cargar únicamente los datos originales del archivo JSON.
