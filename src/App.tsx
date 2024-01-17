import { useEffect, useState } from 'react';
import TaskBar from "./components/TaskBar";
import GrantProjectGroup from "./components/GrantProjectGroup";
import BlobGroup from "./components/BlobGroup";

function App() {

  const [backendBlobData, setBackendBlobData] = useState([{}])

  useEffect(() => {
    fetch("/blob/upload").then(
      response => response.json()
    ).then(
      data => {
        setBackendBlobData(data);
      }
    )
  }, [])

  return (
    <>
      <div><TaskBar /></div>
      <div><GrantProjectGroup /></div>
      <div><BlobGroup /></div>
    </>
  )
}

export default App;