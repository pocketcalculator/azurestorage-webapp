import './index.css';
import TaskBar from "./components/TaskBar";
import GrantProjectGroup from "./components/GrantProjectGroup";

function App() {

  return (
    <>
      <div><TaskBar /></div>
      <div className="flex flex-wrap"><GrantProjectGroup /></div>
    </>
  )
}

export default App;