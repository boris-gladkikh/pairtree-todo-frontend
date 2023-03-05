import axios from "axios";

const baseURL = "http://localhost:8000/tasks";

class ListService {
  fetchTodoList = async () => {
    try {
      let request = await axios.get(baseURL);
      if (request.status === 200) {
        return request.data.todoList;
      }
      throw new Error(request.data.message);
    } catch (err) {
      throw err;
    }
  };

  createTodoTask = async (payload) => {
    try {
      const request = await axios.post(baseURL, payload);
      if (request.status === 200) {
        return request.data.todoList;
      }
      throw new Error(request.data.message);
    } catch (err) {
      throw err;
    }
  };

  updateTodoList = async (item_id, payload) => {
    try {
      const request = await axios.put(`${baseURL}/${item_id}`, payload);
      if (request.status === 200) {
        return request.data.todoList;
      }
      throw new Error(request.data.message);
    } catch (err) {
      throw err;
    }
  };

  deleteTodoTask = async (item_id) => {
    try {
      const request = await axios.delete(`${baseURL}/${item_id}`);
      if (request.status === 200) {
        return request.data.todoList;
      }
      throw new Error(request.data.message);
    } catch (err) {
      throw err;
    }
  };

  deleteAllTasks = async () => {
    try {
      const request = await axios.delete(baseURL);
      if (request.status === 200) {
        return request.data.todoList;
      }
      throw new Error(request.data.message);
    } catch (err) {
      throw err;
    }

  }
}

const listService = new ListService();
export default listService;
