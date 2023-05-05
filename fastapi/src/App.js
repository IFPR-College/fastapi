import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [nameTask, setNameTask] = useState("");
  const [dateTask, setDateTask] = useState("");

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    axios.get("http://127.0.0.1:8000/list").then((response) => {
      setTasks(response.data);
    });
  }

  async function sendData(event) {
    event.preventDefault();
    const data = {
      taskName: nameTask,
      taskDate: dateTask,
    };
    try {
      await axios.post("http://127.0.0.1:8000/task", data).then((response) => {
        getList();
        setDateTask("");
        setNameTask("");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tasks.map((item, index) => (
          <ul key={`ul-${item}-${index}`}>
            <input type="checkbox" />
            <li key={`task-${index}`}>
              {item.taskName} - {item.taskDate}
            </li>
          </ul>
        ))}
      </ul>
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
      </form>
    </div>
  );
}

export default App;
