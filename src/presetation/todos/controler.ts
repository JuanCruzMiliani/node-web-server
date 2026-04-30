import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: new Date() },
];

export class TodosController {
  //* DI
  constructor() {}

  //!Aca van a ir los metodos que manejan la logica de los todos, como crear un todo, obtener todos los todos, actualizar un todo, eliminar un todo, etc. Estos metodos van a ser llamados por los controladores de las rutas cuando se acceda a las rutas correspondientes.

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos); //esto transforma el array de objetos en formato JSON y lo envía como respuesta al cliente que hizo la solicitud a la ruta /api/todos.
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id; //con el + convertimos el string a number, ya que los id son numeros. Si no se hace esto, el filtro no va a funcionar porque va a comparar un string con un numero y nunca va a ser igual.
    if (isNaN(id))
      // Verifico q el id del url sea un numero
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = todos.find((todo) => todo.id === id);

    return todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Text property is required" });
    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null,
    };
    todos.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;
    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    todo.text = text;
    completedAt === null
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    todos.splice(todo.id-1, 1)

    res.json(todo)
  };
    
}
