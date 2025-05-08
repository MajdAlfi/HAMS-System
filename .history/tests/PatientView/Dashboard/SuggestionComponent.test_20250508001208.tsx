import React from "react";
import { render, screen } from "@testing-library/react";
import SuggestionComponent from "../../../src/Components/PatientView/Dashboard/SuggestionComponent";
// src/setupTests.ts
import "@testing-library/jest-dom";
const MockItem = ({ label }: { label: string }) => <div>{label}</div>;

describe("SuggestionComponent", () => {
  it("renders all suggestion items with separators", () => {
    const items = [
      () => <MockItem label="Item 1" />,
      () => <MockItem label="Item 2" />,
      () => <MockItem label="Item 3" />,
    ];

    render(
      <SuggestionComponent
        items={items}
        renderItem={(Item, index) => <Item key={index} />}
        separator={<span data-testid="separator">|</span>}
      />
    );

    // Check items
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();

    // Check separator count (should be items.length - 1)
    expect(screen.getAllByTestId("separator")).toHaveLength(2);
  });
});
