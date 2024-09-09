import React from "react";
import CreateNewTask from "./CreateNewTask";

const Modal = ({ isOpen, onClose, curTask }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          height: "50%",
          width: "50%",
          margin: "auto",
          padding: "2%",
          border: "2px solid #000",
          borderRadius: "10px",
          boxShadow: "2px solid black",
        }}
      >
        <CreateNewTask
          course={curTask.class}
          task={curTask.assignment}
          date={curTask.dueDate}
          edit={true}
          editId={curTask.id}
        />
        <button
          className="btn"
          onClick={onClose}
          style={{
            position: "relative",
            marginLeft: "90%",
          }}
        >
          Cancel
        </button>

        {/* <button onClick={onClose} className="btn">
          Done Editing
        </button> */}
      </div>
    </div>
  );
};

export default Modal;