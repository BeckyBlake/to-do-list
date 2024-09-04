import "./App.css";
import CreateNewTask from "./components/CreateNewTask";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    await getDocs(collection(db, "tasks")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const data = newData.sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      setTasks(data);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>Current Assignments</h1>
      <div>
        <CreateNewTask />
      </div>
      {/* <div className="task-display-div">
        <h4>Class</h4>
        <h4>Assignment</h4>
        <h4>Due Date</h4>
      </div> */}
      <div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Assignment</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr>
                <td>{task.class}</td>
                <td>{task.assignment}</td>
                <td>{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
