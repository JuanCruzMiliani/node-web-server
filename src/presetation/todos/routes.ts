import { Router } from "express";
import { TodosController } from './controler';


export class TodoRoutes {
    static get routes():Router {
        //!Aca definimos las rutas específicas para los todos. En este caso, solo tenemos una ruta GET para obtener todos los todos, pero podríamos agregar más rutas para crear, actualizar o eliminar todos.

        const router = Router()
        
        const todosController = new TodosController();
        router.get('/', (req, res) => todosController.getTodos(req, res))
        router.get('/:id', (req, res) => todosController.getTodoById(req, res))
        
        router.post('/', (req, res) => todosController.createTodo(req, res))
        
        router.put('/:id',  todosController.updateTodo)
        
        router.delete('/:id',  todosController.deleteTodo)
        
        //router.get('/api/todos', todosController.getTodos) !-> tmb se puede hacer asi

        return router;
    }
}