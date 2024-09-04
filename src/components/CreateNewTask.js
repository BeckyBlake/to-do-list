import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function CreateNewTask() {
  const [classname, setClassname] = useState();
  const [assignment, setAssignment] = useState();
  const [dueDate, setDueDate] = useState();

  const addTask = async (e) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        class: classname,
        assignment: assignment,
        dueDate: dueDate,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setClassname("");
    setAssignment("");
    setDueDate("");
    window.location.reload();
  };

  return (
    <div className="new-task-container">
      <h2>Add new task</h2>
      <div className="new-task">
        <div className="task-div">
          <label htmlFor="class-input">Class</label>
          <input
            id="class-input"
            type="text"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
          ></input>
        </div>
        <div className="task-div">
          <label htmlFor="assignment-input">Assignment</label>
          <input
            id="assignment-input"
            type="text"
            value={assignment}
            onChange={(e) => setAssignment(e.target.value)}
          ></input>
        </div>
        <div className="task-div">
          <label htmlFor="date-input">Due Date</label>
          <input
            id="date-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          ></input>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn" onClick={addTask}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewTask;
