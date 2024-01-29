import './index.css';
import TaskBar from "./components/TaskBar";
import GrantProjectGroup from "./components/GrantProjectGroup";
import BlobGroup from "./components/BlobGroup";

function App() {

  return (
    <>
      <div><TaskBar /></div>
      <div className="flex flex-wrap"><GrantProjectGroup /></div>
      <div><BlobGroup /></div>
    </>
  )
}

export default App;