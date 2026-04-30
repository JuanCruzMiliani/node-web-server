import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router; //esto es para que el servidor sepa qué rutas manejar. El router es un objeto que define las rutas y los controladores asociados a cada ruta. Es una forma de organizar las rutas de la aplicación y mantener el código limpio y modular.
  public_path?: string;
}

export class Server {
  private app = express(); // creo una app express. Esta app es un objeto que representa mi servidor y me permite configurar rutas, middlewares, etc. Es el corazón de mi servidor.
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.routes = routes;
    this.publicPath = public_path;
  }

  async start() {
    //*Middlewares -> funcion q se ejejucuta cuando se hace una solicitud al servidor, antes de que se ejecute el controlador de la ruta. Es una forma de procesar la solicitud antes de que llegue al controlador, por ejemplo, para validar datos, autenticar usuarios, etc.
    this.app.use(express.json()); //!-> esto es un middleware que le dice a express que cualquier solicitud que tenga un cuerpo en formato JSON lo transforme en un objeto JavaScript y lo ponga en la propiedad req.body. Esto es útil para manejar solicitudes POST, PUT, etc., donde el cliente envía datos al servidor en formato JSON. Sin este middleware, req.body sería undefined y no podríamos acceder a los datos enviados por el cliente.
    this.app.use(express.urlencoded({ extended: true })); //!-> le dice a express que cualquier solicitud que tenga un cuerpo en formato URL-encoded lo transforme en un objeto JavaScript y lo ponga en la propiedad req.body. Esto es útil para manejar formularios HTML, donde los datos se envían en formato URL-encoded. El option {extended: true} permite que el cuerpo de la solicitud pueda contener objetos anidados, lo que es útil para manejar datos más complejos.

    //*Public Folder
    //!aca lo q hago es q le digo a express que cualquier archivo que este en la carpeta public lo sirva como un recurso estatico, es decir, si tengo un archivo llamado "style.css" dentro de la carpeta public, puedo acceder a el desde el navegador con la ruta http://localhost:PORT/style.css. Esto es útil para servir archivos como hojas de estilo, scripts, imágenes, etc., sin necesidad de crear rutas específicas para cada uno de ellos.
    this.app.use(express.static(this.publicPath));

    //*Rutas
    this.app.use(this.routes); //le digo a la app que use las rutas que le pase en el constructor. Esto es necesario para que el servidor sepa qué rutas manejar y qué controladores ejecutar cuando se accede a esas rutas.

    //!Cualquier ruta no definida va a pasar x aqui, entonces cae acá y devuelve el index.html. Esto es necesario para aplicaciones de una sola página (SPA) donde el frontend maneja las rutas. Si el usuario navega a una ruta que no existe en el servidor, el servidor devolverá el index.html, y luego el frontend se encargará de mostrar la página correcta según la ruta.
    this.app.get("*splat", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`,
      );
      res.sendFile(indexPath); //manda el archivo index.html como respuesta. El navegador lo recibe y el frontend se encarga de mostrar la página correcta según la URL.
    });

    //!arranca el servidor en el puerto indicado y cuando está listo ejecuta el callback que imprime el mensaje en consola.
    this.app.listen(this.port, () => {
      console.log(`Server Runnnig on PORT ${this.port}`);
    });
  }
}
