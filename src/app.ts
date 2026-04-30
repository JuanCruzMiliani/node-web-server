import { env } from "node:process";
import { envs } from "./config/envs";
import { Server } from "./presetation/server";
import { AppRoutes } from "./presetation/routes";

(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes, //!le paso las rutas al servidor para que sepa qué rutas manejar. El router es un objeto que define las rutas y los controladores asociados a cada ruta. Es una forma de organizar las rutas de la aplicación y mantener el código limpio y modular.
    });
    server.start(); 
}