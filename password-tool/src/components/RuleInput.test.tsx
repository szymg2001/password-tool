//@ts-ignore
import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import RuleInput from "./RuleInput";
import "@testing-library/jest-dom";

describe("Component - RuleInput", () => {
  it("Should render with the correct label", () => {
    render(<RuleInput label="Numbers" onCheck={jest.fn()} />);
    expect(screen.getByLabelText(/Numbers:/i)).toBeInTheDocument();
  });
  it("Should calls onCheck with correct value when checkbox is checked", () => {
    const onCheckMock = jest.fn();
    render(<RuleInput label="Numbers" onCheck={onCheckMock} />);

    const checkBox = screen.getByLabelText(/Numbers:/i);
    fireEvent.click(checkBox);

    expect(onCheckMock).toHaveBeenCalledWith("numbers", true);
    fireEvent.click(checkBox);
    expect(onCheckMock).toHaveBeenCalledWith("numbers", false);
  });
});
