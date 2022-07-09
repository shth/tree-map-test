import React from "react";

type TreeMapItem = {
  name: string;
  weight: number;
  value: number;
};

type Level = {
  level: number;
  maxWidth: number;
  remainingWidth: number;
  items: TreeMapItem[];
};

// take as many rows as specified
function calculateRowMaxWidth(rows: number, totalWidth: number): number {
  return Math.floor(totalWidth / rows);
}

function getTreeMap(array: TreeMapItem[], rows: number) {
  if (!array.length || rows <= 0) {
    return [];
  }

  const sorted = array.sort((a, b) => b.weight - a.weight);
  const totalWidth = sorted.reduce((result, item) => result + item.weight, 0);
  const rowMaxWidth = calculateRowMaxWidth(rows, totalWidth);

  const levels: Level[] = new Array(rows).fill(null).map((_, i) => {
    return {
      level: i,
      maxWidth: rowMaxWidth,
      remainingWidth: rowMaxWidth,
      items: [],
    };
  });

  sorted.forEach((item) => {
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      if (item.weight <= level.remainingWidth) {
        level.items.push(item);
        level.remainingWidth -= item.weight;
        return;
      }
    }
  });

  return levels;
}

function TreeMap(props: any) {
  // TODO: implement packing algorithm
  // https://cgi.csc.liv.ac.uk/~epa/surveyhtml.html
  return (
    <div style={{ width: 800, height: 800, backgroundColor: "white", color: "black" }}>
      {getTreeMap(props.data, parseInt(props.rows)).map((level) => {
        return (
          <div style={{ display: "flex" }}>
            {level.items.map((item) => {
              return (
                <div
                  style={{
                    textAlign: "center",
                    width: `${(item.weight / level.maxWidth) * 100}%`,
                    height: `${(1 / props.rows) * 100}%`,
                    backgroundColor: item.value >= 0 ? "green" : "red",
                    border: "solid 1px black",
                  }}
                >
                  <div>{item.name}</div>
                  <div>{`${item.value * 100}%`}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default TreeMap;
