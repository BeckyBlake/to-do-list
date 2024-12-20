import { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function CreateNewTask(props) {
  const [classname, setClassname] = useState(props.course);
  const [assignment, setAssignment] = useState(props.task);
  const [dueDate, setDueDate] = useState(props.date);
  const [userId, setUserId] = useState(props.userId);

  const addTask = async (e) => {
    if (classname.trim() === "" || assignment.trim() === "" || dueDate === "") {
      console.log("bad");
      window.alert("Must add class, assignment, and due date.");
    } else {
      try {
        const docRef = await addDoc(collection(db, "tasks"), {
          class: classname.trim(),
          assignment: assignment.trim(),
          dueDate: dueDate,
          userId: userId,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setClassname("");
      setAssignment("");
      setDueDate("");
      props.fetchTasks();
      // window.location.reload();
    }
  };

  const updateTask = async (id) => {
    try {
      const docRef = doc(db, "tasks", id);

      await updateDoc(docRef, {
        class: classname.trim(),
        assignment: assignment.trim(),
        dueDate: dueDate,
        userId: userId,
      });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    setClassname("");
    setAssignment("");
    setDueDate("");
    props.fetchTasks();
    props.close();
    // window.location.reload();
  };

  return (
    <div className="new-task-container">
      <div className="new-task">
        <div className="form__item">
          <label htmlFor="class-input" className="form__label">
            Class
          </label>
          <input
            id="class-input"
            className="form__input"
            type="text"
            value={classname}
            placeholder="Class"
            onChange={(e) => setClassname(e.target.value)}
          ></input>
        </div>
        <div className="form__item">
          <label htmlFor="assignment-input" className="form__label">
            Assignment
          </label>
          <input
            id="assignment-input"
            className="form__input"
            type="text"
            value={assignment}
            placeholder="Assignment"
            onChange={(e) => setAssignment(e.target.value)}
          ></input>
        </div>
        <div className="form__item">
          <label htmlFor="date-input" className="form__label">
            Due Date
          </label>
          <input
            id="date-input"
            className="form__input form__input--small"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          ></input>
        </div>
        <div className="btn-container">
          <button
            type="submit"
            className="btn"
            onClick={() => {
              if (props.edit) {
                updateTask(props.editId);
              } else {
                addTask();
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewTask;
