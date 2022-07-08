import React from "react";

function TreeMap(props: any) {
  // TODO: implement packing algorithm
  // https://cgi.csc.liv.ac.uk/~epa/surveyhtml.html
  return (
    <div style={{ width: 800, height: 800, backgroundColor: "white", color: "black" }}>
      Data: {props.data}
      Row: {props.rows}
    </div>
  );
}

export default TreeMap;
