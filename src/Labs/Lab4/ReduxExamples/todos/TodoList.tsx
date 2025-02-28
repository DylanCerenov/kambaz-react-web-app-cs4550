import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { ListGroup, Button, FormControl } from "react-bootstrap";
export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });
  const addTodo = (todo: any) => {
    const newTodos = [
      ...todos,
      { ...todo, id: new Date().getTime().toString() },
    ];
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };
  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const updateTodo = (todo: any) => {
    const newTodos = todos.map((item) => (item.id === todo.id ? todo : item));
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup className="w-25">
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          addTodo={addTodo}
          updateTodo={updateTodo}
        />
        {todos.map((todo) => (
          <TodoItem todo={todo} deleteTodo={deleteTodo} setTodo={setTodo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
