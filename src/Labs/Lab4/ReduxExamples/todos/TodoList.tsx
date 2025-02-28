import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup className="w-25">
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
