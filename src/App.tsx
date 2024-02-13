import './index.css';
import TaskBar from "./components/TaskBar";
import GrantProjectCardGroup from './components/GrantProjectCardGroup';

function App() {

  return (
    <>
      <div><TaskBar /></div>
      <div className="flex flex-wrap"><GrantProjectCardGroup /></div>
    </>
  )
}

export default App;