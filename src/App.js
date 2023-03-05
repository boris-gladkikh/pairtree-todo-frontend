import "./App.css";
import ListTable from "./ListTable";
import { useState, useEffect } from "react";
import listService from "./listService";
import { Button } from "react-bootstrap";
import ClearListConfirmDialog from "./ClearListConfirmDialog";
import TodoForm from "./TodoForm";

// const tempTodoList = [
//   {
//     item_id: 1,
//     task: "create API",
//     complete: true,
//   },
//   {
//     item_id: 2,
//     task: "Test all routes",
//     complete: false,
//   },
//   {
//     item_id: 3,
//     task: "build front-end",
//     complete: false,
//   },
//   {
//     item_id: 4,
//     task: "some ther task as well",
//     complete: false,
//   },
// ];

function App() {
  const [todoList, setTodoList] = useState([]);
  const [postToUpdate, setPostToUpdate] = useState(false);
  const [newPost, setNewPost] = useState(null);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [isClearing, setIsClearing] = useState(false);
  const [showClearModal, setShowClearModel] = useState(false);

  //fetch todoList from API
  useEffect(() => {
    async function fetchList () {
      const listResponse = await listService.fetchTodoList();
      setTodoList(listResponse);    
    }

    fetchList();
  }, []);


  //create new task in server
  useEffect(()=>{
    async function postListToApi(){
      const listResponse = await listService.createTodoTask(newPost);
      setTodoList(listResponse);
    }

    if(newPost) {
      postListToApi();
      setNewPost(null);

    }
  },[newPost]);

  //update todoList
  useEffect(() => {
    async function updateList() {
      const updatedList = await listService.updateTodoList(postToUpdate.item_id,postToUpdate);
      setTodoList(updatedList);
      console.log('this is updated list in app.js upddatedlist function',updatedList)
    }

    if (postToUpdate) {
      updateList();
      setPostToUpdate(null);
    }
  }, [postToUpdate]);

  //delete task from todolist
  useEffect(() => {
    async function deleteTask() {
      const listResponse = await listService.deleteTodoTask(postIdToDelete);
      console.log('listresponse in delete usue effec app.js', listResponse)
      setTodoList(listResponse);
    }
    
    if(postIdToDelete) {
      console.log('hitting this');
      deleteTask();
      setPostIdToDelete(null);
    }
  }, [postIdToDelete]);

  //delete entire todo list
  useEffect(() => {
    async function deleteList() {
      const listResponse = await listService.deleteAllTasks();
      setTodoList(listResponse);
    }
    if (isClearing) {
      deleteList();
      setIsClearing(false);
    }
  }, [isClearing]);

  const removeTask = (item_id) => {
    setPostIdToDelete(item_id);
  };

  const updateTask = (item) => {
    console.log('this is the item to update', item)
    setPostToUpdate(item);
  };


  const addTask = (item) => {
    setNewPost(item);
  }

  return (
    <div className="App">
      <div className="container">

        <div className="header">
          <h1>NOTED</h1>
          <h6>Your very own To-Do List!</h6>
        </div>

        <div className="m-5 pb-4">
          <TodoForm todoList={todoList} setTodoList={setTodoList} addTask={addTask}  />
        </div>
        <ListTable todoList={todoList} handleDelete={removeTask} updateTask={updateTask}  />
        {(todoList && todoList.length > 0) &&
        <Button
          className="m-1"
          variant="danger"
          onClick={() => setShowClearModel(true)}
        >
          Clear List
        </Button>
}
        <ClearListConfirmDialog
          showModal={showClearModal}
          handleClose={() => setShowClearModel(false)}
          handleDeleteAll={() => setIsClearing(true)}
        />
      </div>
    </div>
  );
}

export default App;
