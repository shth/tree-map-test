import React, { useState } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import TreeMap from "./components/TreeMap";

function App() {
  const [rows, setRows] = useState(3);
  const [jsonData, setJsonData] = useState("[]");

  return (
    <div className="App">
      <div className="tree-map-container">
        <div style={{ marginRight: 20 }}>
          <div>
            <label htmlFor="rowNumber">Row Number:</label>
          </div>
          <div>
            <input
              id="rowNumber"
              value={rows}
              type="number"
              style={{ width: "100%" }}
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
            <label htmlFor="data">Data:</label>
          </div>
          <div>
            <textarea
              id="data"
              style={{ width: "100%", minHeight: 200 }}
              onChange={(e) => {
                setJsonData(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div style={{ flexGrow: 2 }}>
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
