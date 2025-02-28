import { ListGroup, Button, FormControl } from "react-bootstrap";

export default function TodoForm({
  todo,
  setTodo,
  addTodo,
  updateTodo,
}: {
  todo: { id: string; title: string };
  setTodo: (todo: { id: string; title: string }) => void;
  addTodo: (todo: { id: string; title: string }) => void;
  updateTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroup.Item className="d-flex align-items-center justify-content-between">
      <FormControl
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        className="w-50"
      />
      <div className="d-flex">
        <Button
          onClick={() => updateTodo(todo)}
          id="wd-update-todo-click"
          className="btn btn-warning me-2"
        >
          {" "}
          Update{" "}
        </Button>
        <Button
          onClick={() => addTodo(todo)}
          id="wd-add-todo-click"
          className="btn btn-success"
        >
          {" "}
          Add{" "}
        </Button>
      </div>
    </ListGroup.Item>
  );
}
