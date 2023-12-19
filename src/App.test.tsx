import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders App component", async () => {
    render(<App />);
    const enableButton = screen.getByText('enable');

    expect(enableButton).toBeDefined();
  });
});