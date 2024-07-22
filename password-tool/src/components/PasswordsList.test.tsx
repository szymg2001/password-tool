import React, { act } from "react";
import "@testing-library/jest-dom";
import { AppContextProvider, useAppContext } from "../context/appContext";
import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";
import PasswordsList from "./PasswordsList";

describe("Component - PasswordsList", () => {
  let result: { current: ReturnType<typeof useAppContext> };
  let container: HTMLElement;
  let elements: NodeListOf<Element>;

  beforeEach(() => {
    global.confirm = jest.fn(() => true);

    const wrapper: React.FC = ({ children }: any) => (
      <AppContextProvider>{children}</AppContextProvider>
    );

    const hookResult = renderHook(() => useAppContext(), { wrapper });
    result = hookResult.result;

    act(() => {
      let rules = { length: 10, comment: "test" };
      result.current.addPassword(result.current.generatePassword(rules));
      result.current.addPassword(result.current.generatePassword(rules));
      result.current.addPassword(result.current.generatePassword(rules));
    });

    const renderResult = render(<PasswordsList />, { wrapper });
    container = renderResult.container;
    elements = container.querySelectorAll(".passwords-list__element");
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("Should render list including all passwords from context array, select it on click and remove if delete button pressed", () => {
    expect(elements).toHaveLength(3);
  });
  it("Should remove password while Remove button pressed", () => {
    let firstElement = elements[0];

    let button = firstElement.querySelector(
      ".passwords-list__element__remove-button"
    );

    if (button) {
      fireEvent.click(button);
      expect(global.confirm).toHaveBeenCalled();
    } else {
      throw new Error("Button is null");
    }
  });
});
