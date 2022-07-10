import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders row number field", () => {
  render(<App />);
  const input = screen.getByLabelText(/row number/i);
  expect(input).toBeInTheDocument();
  expect(input.tagName).toEqual("INPUT");
});

test("Row number field only accept integer", () => {
  render(<App />);
  const input = screen.getByLabelText<HTMLInputElement>(/row number/i);

  fireEvent.change(input, { target: { value: "foo" } });
  expect(input.value).not.toEqual("foo");
  fireEvent.change(input, { target: { value: 5 } });
  expect(input.value).toBe("5");
  fireEvent.change(input, { target: { value: 1.23 } });
  expect(input.value).not.toEqual("1.23");
});

test("renders data field", () => {
  render(<App />);
  const textArea = screen.getByLabelText(/data/i);
  expect(textArea).toBeInTheDocument();
  expect(textArea.tagName).toEqual("TEXTAREA");
});

test("renders tree map", () => {
  render(<App />);
  const treeMap = screen.getByTestId("treeMap");
  expect(treeMap).toBeInTheDocument();
});
