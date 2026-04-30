import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

//!SIN BD
// const todos = [
//   { id: 1, text: "Buy milk", completedAt: new Date() },
//   { id: 2, text: "Buy bread", completedAt: null },
//   { id: 3, text: "Buy butter", completedAt: new Date() },
// ];

export class TodosController {
  //* DI
  constructor() {}

  //!Aca van a ir los metodos que manejan la logica de los todos, como crear un todo, obtener todos los todos, actualizar un todo, eliminar un todo, etc. Estos metodos van a ser llamados por los controladores de las rutas cuando se acceda a las rutas correspondientes.

  public getTodos = async (req: Request, res: Response) => {
    //!CON BD
    const todos = await prisma.todo.findMany();
    //!SIN BD ES SOLO CON LA LINEA DE ABAJO
    return res.json(todos); //esto transforma el array de objetos en formato JSON y lo envía como respuesta al cliente que hizo la solicitud a la ruta /api/todos.
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id; //con el + convertimos el string a number, ya que los id son numeros. Si no se hace esto, el filtro no va a funcionar porque va a comparar un string con un numero y nunca va a ser igual.
    if (isNaN(id))
      // Verifico q el id del url sea un numero
      return res.status(400).json({ error: "ID argument is not a number" });
    //!COON BD
    const todo = await prisma.todo.findFirst({
      where: { id: id },
    });

    //!SIN BD
    // const todo = todos.find((todo) => todo.id === id);

    return todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    //!CON DTO
    const [err, createTodoDto] = CreateTodoDto.create(req.body);

    if (err) return res.status(400).json({ err });

    const newTodo = await prisma.todo.create({
      data: createTodoDto! 
    });

    //!SIN DTO
    //const { text } = req.body;

    // if (!text)
    //   return res.status(400).json({ error: "Text property is required" });

    //!CON BD Y SIN DTO
    // const newTodo = await prisma.todo.create({
    //   data: { text: text },
    // });

    //!SIN BD
    // const newTodo = {
    //   id: todos.length + 1,
    //   text: text,
    //   completedAt: null,
    // };
    // todos.push(newTodo);

    res.json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [err, updateTodoDto] = UpdateTodoDto.create({...req.body, id})
    if(err)
      return res.status(400).json({err});
    
    //!SIN DTO
    // if (isNaN(id))
    //   return res.status(400).json({ error: "ID argument is not a number" });

    //!CON BD
    const todo = await prisma.todo.findFirst({
      where: { id: id },
    });

    //!SIN BD
    //const todo = todos.find((todo) => todo.id === id);

    //!SIN DTO
    // if (!todo)
    //   return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;
    // if (!text)
    //   return res.status(400).json({ error: "Text property is required" });

    //!CON BD
    const updateTodo = await prisma.todo.update({
      where: { id: id },
      data: updateTodoDto!.values
      //!SIN DTO
      //data: {      
        // text,
        // completedAt: completedAt ? new Date(completedAt) : null,
      // },
    });

    //!SIN BD
    // todo.text = text;
    // completedAt === null
    //   ? (todo.completedAt = null)
    //   : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json(updateTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    //!CON BD
    const todo = await prisma.todo.findFirst({
      where: { id: id },
    });

    //!SIN BD
    //const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    //!CON BD
    const deleted = await prisma.todo.delete({
      where: { id: id },
    });

    //!SIN BD
    //todos.splice(todo.id - 1, 1);
    deleted
      ? res.json(deleted)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };
}
