import React, { useEffect, useState } from "react";
import "./App.css";
import Todos from "./components/todolist";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    console.log("useEffect triggered");
    // Simulate fetching data
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/todos");
        setTodoList(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);
  const handleDelete = async (id) => {
    console.log("delete clicked", id);
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      const updatedList = todoList.filter((todo) => todo._id !== id);
      setTodoList(updatedList);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleAdd = async () => {
    if (input === "") return;

    try {
      const response = await axios.post("http://localhost:5000/api/todos", {
        todo: input,
        isCompleted: false,
      });
      const newTodo = response.data.create_todo;
      console.log(newTodo);
      console.log(newTodo._id);
      console.log(typeof newTodo._id);
      setTodoList([...todoList, newTodo]);
      setInput(""); // Reset the input box
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <React.Fragment>
      <input value={input} className="text-center" type="text" onChange={handleChange} />
      <button className="btn btn-info" onClick={handleAdd}>
        Add
      </button>
      <ul>
        {todoList.map((todo) => (
          <Todos
            key={todo._id}
            todoKey={todo._id}
            todoText={todo.todo}
            onDelete={() => handleDelete(todo._id)}
          />
        ))}
      </ul>

    </React.Fragment>
  );
};

export default App;
