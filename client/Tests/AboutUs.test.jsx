import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import AboutUs from "../src/Components/AboutUs";

describe("AboutUs", () => {
  //Test Case 1
  it("should render the AboutUs component", () => {
    render(<AboutUs />);
    const AboutElement = screen.getByRole("heading", { level: 1 });
    expect(AboutElement).toBeInTheDocument();
  });
  // Test Case 2
  it("should have the text About", () => {
    render(<AboutUs />);
    const text = screen.queryByText(/about/i);
    expect(text).toBeInTheDocument();
  });
});
