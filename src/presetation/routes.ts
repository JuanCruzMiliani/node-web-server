import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

//!La analogía del restaurante: si express() es el restaurante, Router() son las distintas secciones — la sección de pizzas, la de pastas, la de postres. Cada una tiene su propio menú pero todas forman parte del mismo restaurante.

//!app es el jefe que recibe todas las llamadas. Cuando hay demasiadas llamadas, el jefe no puede atenderlas todas solo, entonces delega:

//! "Todo lo que sea de usuarios, que lo atienda Juan" → userRouter
//! "Todo lo que sea de productos, que lo atienda María" → productRouter

//! Cada uno (Juan, María) sabe manejar solo su área, pero todos trabajan para el mismo jefe (app).
//! Sin routers, el jefe tendría que saber hacer todo él solo — funciona, pero se vuelve un caos cuando el proyecto crece.

export class AppRoutes {
    static get routes():Router { //el get convierte el método en un getter, entonces lo usás sin paréntesis como si fuera una propiedad. sin ello lo podes llamar como getRoutes()

        const router = Router() //creo una función de Express que te devuelve un objeto enrutador. Este objeto te permite definir rutas específicas para tu aplicación, como GET, POST, PUT, DELETE, etc. Es una forma de organizar y modularizar las rutas de tu aplicación Express. En lugar de definir todas las rutas directamente en la instancia principal de Express (app), puedes usar un Router para agrupar rutas relacionadas y luego montarlas en la aplicación principal.

        //.use se usa para código que se ejecuta antes de llegar a la ruta y  delegar rutas a otros routers
        router.use('/api/todos', TodoRoutes.routes) //  "todo lo que llegue a /api/todos, mandáselo a TodoRoutes.routes para que lo maneje".
        //!TodoRoutes hay mas explicaciones
        
        //*Aca vamos a ver todas las rutas de la app, entonces cada vez que tengamos una nueva ruta, la agregamos acá.
        //!router.use('/api/user', TodoUsers.routes)
        //!router.use('/api/products', TodoProducts.routes)
        //!router.use('/api/clients', TodoClients.routes)
        //!router.use('/api/auth', TodoAuth.routes)
        

        return router;
    }
}