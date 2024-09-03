function CreateNewTask() {
  return (
    <div>
      <h2>Add new task</h2>
      <form>
        <div className="form-div">
          <label className="form-element">Class</label>
          <input className="form-element"></input>
        </div>
        <div className="form-div">
          <label className="form-element">Assignment</label>
          <input className="form-element"></input>
        </div>
        <div className="form-div">
          <label className="form-element">Due Date</label>
          <input className="form-element"></input>
        </div>
        <div className="form-div">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewTask;
