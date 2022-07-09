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

  if (array.length > 50) {
    throw new Error("Number of items cannot exceed 50.");
  }

  if (rows > array.length) {
    throw new Error(
      `Number of rows cannot exceed number of items. Number of items: ${array.length}`
    );
  }

  const sorted = array.sort((a, b) => {
    return b.weight - a.weight;
  });

  const totalWidth = sorted.reduce((result, item) => {
    if (typeof item.name !== "string") {
      throw new Error(`Item name must be a string: ${JSON.stringify(item)}`);
    } else if (item.name.length > 50) {
      throw new Error(`Item name cannot exceed 50 characters: ${JSON.stringify(item)}`);
    } else if (typeof item.weight !== "number" || item.weight !== Math.floor(item.weight)) {
      throw new Error(`Item weight must be integer: ${JSON.stringify(item)}`);
    }

    return result + item.weight;
  }, 0);
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
  return (
    <div style={{ height: 800, backgroundColor: "white", color: "black" }}>
      {getTreeMap(JSON.parse(props.data), parseInt(props.rows)).map((level) => {
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
