import React, { act } from "react";
import "@testing-library/jest-dom";
import { AppContextProvider, useAppContext } from "../context/appContext";
import { render, renderHook, screen } from "@testing-library/react";
import PasswordsList from "./PasswordsList";

describe("Component - PasswordsList", () => {
  const wrapper: React.FC = ({ children }: any) => (
    <AppContextProvider>{children}</AppContextProvider>
  );
  it("Should render list including all passwords from context array", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      const password = result.current.generatePassword({
        length: 5,
        comment: "test",
      });
      result.current.addPassword(password);
      result.current.addPassword(password);
    });

    const { container } = render(<PasswordsList />, { wrapper });
    let elements = container.querySelectorAll(".passwords-list__element");
    expect(elements).toHaveLength(2);
  });
});
