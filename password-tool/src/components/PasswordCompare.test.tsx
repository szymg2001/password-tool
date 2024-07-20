import React from "react";
import PasswordCompare from "./PasswordCompare";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Component - PasswordCompare", () => {
  it("Should correctly generate 2 compare lines", () => {
    let showPasswords = true;
    let input = "asd";
    let password = "dsa";
    let indexes = [0, 2];

    let { container, rerender } = render(
      <PasswordCompare
        showPasswords={showPasswords}
        input={input}
        password={password}
        indexes={indexes}
      />
    );

    const elements = container.querySelectorAll(
      ".password-compare__single-line"
    );

    expect(elements.length).toBe(2);
    expect(elements[0]).toHaveTextContent("asd");
    expect(elements[1]).toHaveTextContent("dsa");

    showPasswords = false;
    rerender(
      <PasswordCompare
        showPasswords={showPasswords}
        input={input}
        password={password}
        indexes={indexes}
      />
    );

    expect(elements[0]).toHaveTextContent("***");
    expect(elements[1]).toHaveTextContent("***");
  });
});
