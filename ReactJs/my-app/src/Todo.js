import React, { useState } from "react";
import "./App.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <form action="" onSubmit={addTask}>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            id="myInput"
            placeholder="New task..."
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>

      <ul id="myUL">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "checked" : ""}>
            <span onClick={() => toggleComplete(index)}>{task.text}</span>
            <span className="close" onClick={() => removeTask(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
