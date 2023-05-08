import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [nameTask, setNameTask] = useState("");
  const [dateTask, setDateTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    axios.get("http://127.0.0.1:8000/list").then((response) => {
      setTasks(response.data);
    });
  }

  async function sendData(event) {
    setErrorMessage("");
    event.preventDefault();
    const data = {
      taskName: nameTask,
      taskDate: dateTask,
      completed: false
    };
    try {
      if (nameTask !== "" && dateTask !== "") {
        await axios
          .post("http://127.0.0.1:8000/task", data)
          .then((response) => {
            getList();
            setDateTask("");
            setNameTask("");
          });
      } else {
        setErrorMessage("Ops! ocorreu um erro");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleTaskComplete(index) {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  function renderList() {
    return tasks.map((item, index) => (
      <li key={`li-${index}`}>
        <input
          type="checkbox"
          id="check"
          checked={item.completed ? true : false}
          onClick={() => handleTaskComplete(index)}
        />
        <span
          style={{
            textDecoration: item.completed ? "line-through" : "none"
          }}
        >
          {item.taskName} - {item.taskDate}
        </span>
      </li>
    ));
  }

  return (
    <div id="container">
      <div id="content">
      <h1>Lista de Tarefas</h1>
      <ul>{renderList()}</ul>
      <form id="form">
        <label htmlFor="task">Nova Tarefa:</label>
        <input
          type="text"
          id="task"
          value={nameTask}
          onChange={(value) => setNameTask(value.target.value)}
          autoComplete="off"
        />
        <label htmlFor="date">Data:</label>
        <input
          type="date"
          id="date"
          value={dateTask}
          onChange={(value) => setDateTask(value.target.value)}
        />
        <button type="submit" onClick={sendData}>
          Adicionar
        </button>
        <p>{errorMessage}</p>
      </form>
      </div>
      
    </div>
  );
}

export default App;
