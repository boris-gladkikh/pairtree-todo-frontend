import { Button, FormCheck } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import TodoForm from "./TodoForm";

const INIT_EDIT_TASK = {
  item_id: null,
  task: "",
  complete: false,
};

export default function ListTable({
  todoList,
  setToDoList,
  handleDelete,
  updateTask,
}) {
  const [edit, setEdit] = useState(INIT_EDIT_TASK);

  const handleEdit = (task) => {
    setEdit(task);
  };

  const displayList = todoList.map((task, idx) => (
    <tr key={task.task_id} className={task.complete ? "complete-bg-color" : ""}>
      <td>
        <FormCheck
          type="checkbox"
          id="task.complete"
          defaultChecked={task.complete}
          disabled
        />
      </td>
      <td>
        <p>{task.task}</p>
      </td>
      <td>
        <Button onClick={() => handleEdit(task, idx)} variant="info" size="sm">
          Edit
        </Button>
        <Button
          className="m-1"
          onClick={() => handleDelete(task.item_id)}
          variant="danger"
          size="sm"
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  if (!todoList.length) {
    return (
      <>
        <h5 className="text-white">Add a task with the buttons above!</h5>
      </>
    );
  }

  if (edit.item_id) {
    return (
      <>
        <TodoForm
          edit={edit}
          todoList={todoList}
          updateTask={updateTask}
          setEdit={setEdit}
        />
      </>
    );
  }

  return (
    <>
      <Table bordered striped size="sm">
        <thead>
          <tr>
            <th>Complete?</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{displayList}</tbody>
      </Table>
    </>
  );
}
