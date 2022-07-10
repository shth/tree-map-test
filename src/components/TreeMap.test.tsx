import React from "react";
import { render } from "@testing-library/react";
import TreeMap from "./TreeMap";

let consoleErrorFn: jest.SpyInstance;

beforeAll(() => {
  consoleErrorFn = jest.spyOn(console, "error").mockImplementation(() => jest.fn());
});

afterAll(() => {
  consoleErrorFn.mockRestore();
});

test("Tree map will error when presented with invalid json", () => {
  const invalidJSON = "{foo}";
  expect(() => render(<TreeMap data={invalidJSON} />)).toThrowError(/unexpected token/i);
});

test("Tree map will error when item name is not string", () => {
  const rows = 1;

  const stringNameJson = '[{"name": "foo", "weight": 1}]';
  expect(() => render(<TreeMap data={stringNameJson} rows={rows} />)).not.toThrow();
  const numberNameJson = '[{ "name": 123, "weight": 1 }]';
  expect(() => render(<TreeMap data={numberNameJson} rows={rows} />)).toThrowError(
    /must be a string/i
  );
  const booleanNameJson = '[{ "name": true, "weight": 1 }]';
  expect(() => render(<TreeMap data={booleanNameJson} rows={rows} />)).toThrowError(
    /must be a string/i
  );
  const arrayNameJson = '[{ "name": true, "weight": 1 }]';
  expect(() => render(<TreeMap data={arrayNameJson} rows={rows} />)).toThrowError(
    /must be a string/i
  );
  const objectNameJson = '[{ "name": true, "weight": 1 }]';
  expect(() => render(<TreeMap data={objectNameJson} rows={rows} />)).toThrowError(
    /must be a string/i
  );
});

test("Tree map will error when row number exceed array length", () => {
  const json = '[{"name": "foo", "weight": 1}]';
  const rowNumber = 2;
  expect(() => render(<TreeMap data={json} row={rowNumber} />)).toThrowError(/array length/i);
});

test("Tree map will error when weight is not integer", () => {
  const rowNumber = 2;
  const json = '[{"name": "foo", "weight": 1}]';
  expect(() => render(<TreeMap data={json} row={rowNumber} />)).toThrowError(/array length/i);
  const floatWeightJson = '[{"name": "foo", "weight": 1.12}]';
  expect(() => render(<TreeMap data={floatWeightJson} row={rowNumber} />)).toThrowError(
    /must be integer/i
  );
  const stringWeightJson = '[{"name": "foo", "weight": "1"}]';
  expect(() => render(<TreeMap data={stringWeightJson} row={rowNumber} />)).toThrowError(
    /must be integer/i
  );
  const arrayWeightJson = '[{"name": "foo", "weight": []}]';
  expect(() => render(<TreeMap data={arrayWeightJson} row={rowNumber} />)).toThrowError(
    /must be integer/i
  );
  const objectWeightJson = '[{"name": "foo", "weight": {}}]';
  expect(() => render(<TreeMap data={objectWeightJson} row={rowNumber} />)).toThrowError(
    /must be integer/i
  );
});

test("Tree map will error when number of items exceend the maximum", () => {
  const json = `
[
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1},
{"name": "foo", "weight": 1}
]
`;
  const rowNumber = 2;
  expect(() => render(<TreeMap data={json} row={rowNumber} />)).toThrowError(/cannot exceed 50/i);
});
