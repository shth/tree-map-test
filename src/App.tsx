import React, { useState } from "react";
import "./App.css";
import TreeMap from "./components/TreeMap";

function App() {
  const [rows, setRows] = useState("3");
  const [jsonData, setJsonData] = useState("{}");

  return (
    <div className="App">
      <div className="tree-map-container">
        <div>
          <div>
            <label>Data:</label>
          </div>
          <div>
            <textarea onChange={(e) => setJsonData(e.target.value)}></textarea>
          </div>
          <div>
            <label>Row Number:</label>
          </div>
          <div>
            <input type="number" onChange={(e) => setRows(e.target.value)}></input>
          </div>
        </div>
        <div>
          <label>Result: </label>
          <TreeMap rows={rows} data={jsonData}></TreeMap>
        </div>
      </div>
    </div>
  );
}

export default App;
