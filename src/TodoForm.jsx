import { useState } from "react";
import { Form, Button, FormCheck } from "react-bootstrap";
function TodoForm({ updateTask, edit, setEdit, addTask }) {
  
  const init_task_data = {
    item_id: Math.floor(Math.random() * 10000),
    task: "",
    complete: false,
  };

  const [todo, setTodo] = useState(edit ? edit : init_task_data);


  const handleSubmit = (evt) => {
    evt.preventDefault();
    addTask(todo);
    setTodo(init_task_data);
  };

  const handleUpdate = (evt) => {
    evt.preventDefault();
    updateTask(todo);
    setEdit({
      item_id: null,
      task: "",
      complete: false,
    })
    setTodo(init_task_data);

  };

  const handleChange = (evt) => {
    let { name, value } = evt.target;

    setTodo((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Form
        name="contact-form"
        onSubmit={edit ? handleUpdate : handleSubmit}
        className="text-left mb-5 input-sm d-flex justify-content-center "
      >
        {edit && (
          <Form.Group>
            <FormCheck
              onChange={handleChange}
              className="inline mr-2"
              id="complete"
              name="complete"
              size="lg"
              type="switch"
              checked={todo.complete}
            />
          </Form.Group>
        )}
        <Form.Group className="w-50">
          <Form.Control
            required
            onChange={handleChange}
            id="task"
            name="task"
            type="text"
            value={todo.task}
            placeholder="Describe Task"
          />
        </Form.Group>
        <Button
          variant="success"
          size="sm"
          onClick={edit ? handleUpdate : handleSubmit}
        >
          {edit ? "Update Task" : "Add Task"}
        </Button>
      </Form>
    </div>
  );
}

export default TodoForm;
