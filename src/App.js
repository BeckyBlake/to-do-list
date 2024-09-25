import "./App.css";
import CreateNewTask from "./components/CreateNewTask";
import { db } from "./firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import edit from "./edit.svg";
import Modal from "./components/Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState();

  const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;

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

  const deleteTask = async (id) => {
    setTasks((prev) => [...prev]);
    console.log(id);
    const docRef = doc(db, "tasks", id);

    await deleteDoc(docRef)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        console.log("successfully deleted");
      })
      .catch((error) => {
        console.log("Error deleting value", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <h1>Current Assignments</h1>
      <div>
        <h2>Add New Assignment</h2>
        <CreateNewTask
          course={""}
          task={""}
          date={""}
          edit={false}
          fetchTasks={fetchTasks}
        />
      </div>
      <div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Assignment</th>
              <th>Due Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                style={{
                  backgroundColor:
                    new Date(task.dueDate).getTime() <= tomorrow
                      ? "#FFC7CE"
                      : "",
                }}
              >
                <td>{task.class}</td>
                <td>{task.assignment}</td>
                <td>{task.dueDate}</td>
                <td>
                  <button
                    className="btn"
                    style={{ padding: "4px" }}
                    onClick={() => {
                      setOpen(true);
                      setEditing(task);
                    }}
                  >
                    <img src={edit} style={{ width: "10px" }} alt="logo" />
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    style={{ padding: "4px" }}
                    onClick={() => deleteTask(task.id)}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={open}
          onClose={handleClose}
          curTask={editing}
          fetchTasks={fetchTasks}
        ></Modal>
      </div>
    </div>
  );
}

export default App;
