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

// progressively grow the row width until it can fit all the items
function calculateMaxWidth(
  rows: number,
  sorted: TreeMapItem[],
  totalWidth: number,
  carry?: number
): number {
  if (sorted.length == 1) {
    return sorted[0].weight;
  }

  let maxWidth = sorted[0].weight;
  const currentWidth = (carry ?? 0) + maxWidth;

  if (currentWidth * rows < totalWidth && sorted.length > 1) {
    maxWidth += calculateMaxWidth(rows, sorted.slice(1), totalWidth, currentWidth);
  }

  return maxWidth;
}

function getTreeMap(array: TreeMapItem[], rows: number) {
  if (!array.length || rows <= 0) {
    return [];
  }

  const sorted = array.sort((a, b) => b.weight - a.weight);
  const totalWidth = sorted.reduce((result, item) => result + item.weight, 0);
  const maxWidth = calculateMaxWidth(rows, sorted, totalWidth);

  const levels: Level[] = new Array(rows).fill(null).map((_, i) => {
    return {
      level: i,
      maxWidth,
      remainingWidth: maxWidth,
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
      Data: {props.data}
      Row: {props.rows}
    </div>
  );
}

export default TreeMap;
