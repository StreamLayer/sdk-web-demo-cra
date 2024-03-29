import { render, screen } from "@testing-library/react";

import 'intersection-observer'

import App from "./App";

describe("App", () => {
  it("renders App component", async () => {
    render(<App />);
    const disableButton = screen.getByText('Close event');

    expect(disableButton).toBeDefined();
  });
});