import React, { useState } from "react";
import "./App.css";
import TreeMap from "./components/TreeMap";

function App() {
  const [rows, setRows] = useState(3);
  const [jsonData, setJsonData] = useState([]);

  return (
    <div className="App">
      <div className="tree-map-container">
        <div>
          <div>
            <label>Row Number:</label>
          </div>
          <div>
            <input
              type="number"
              onChange={(e) => {
                const result = parseInt(e.target.value);

                if (isNaN(result)) {
                  return;
                }

                return setRows(result);
              }}
            ></input>
          </div>
          <div>
            <label>Data:</label>
          </div>
          <div>
            <textarea
              onChange={(e) => {
                try {
                  const json = JSON.parse(e.target.value);
                  setJsonData(json);
                } catch (e) {
                  console.log(e);
                }

                return;
              }}
            ></textarea>
          </div>
        </div>
        <div>
          <label>Result: </label>
          <ErrorBoundary key={jsonData}>
            <TreeMap rows={rows} data={jsonData}></TreeMap>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default App;
