import logo from "./logo.svg";
import "./App.css";
import CreateNewTask from "./components/CreateNewTask";

function App() {
  return (
    <div className="App">
      <h1>Current Assignments</h1>
      <CreateNewTask />
    </div>
  );
}

export default App;
