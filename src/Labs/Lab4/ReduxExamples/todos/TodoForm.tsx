import { ListGroup, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="d-flex align-items-center justify-content-between">
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="w-50"
      />
      <div className="d-flex">
        <Button
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
          className="btn btn-warning me-2"
        >
          {" "}
          Update{" "}
        </Button>
        <Button
          onClick={() => dispatch(addTodo(todo))}
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
