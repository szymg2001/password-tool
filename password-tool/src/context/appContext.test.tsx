import React, { act } from "react";
import { AppContextProvider, useAppContext } from "./appContext";
import { renderHook } from "@testing-library/react";

describe("appContext", () => {
  const wrapper: React.FC = ({ children }: any) => (
    <AppContextProvider>{children}</AppContextProvider>
  );
  it("Should generate new password correctly", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const newPassword = result.current.generatePassword({
      length: 12,
      comment: "Not set",
    });

    expect(newPassword.value).toHaveLength(12);
    expect(newPassword.date).toBeDefined();
  });

  it("Should add and remove passwords from context array", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    //Generate new password
    let newPassword = result.current.generatePassword({
      length: 12,
      comment: "Not set",
    });

    //Add password
    act(() => {
      result.current.addPassword(newPassword);
    });

    expect(result.current.passwords).toHaveLength(1);

    //Remove password
    act(() => {
      result.current.removePassword(newPassword.value);
    });
    expect(result.current.passwords).toHaveLength(0);
  });

  it("Should select password correctly", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    let newPassword = result.current.generatePassword({
      length: 12,
      comment: "Not set",
    });
    act(() => {
      result.current.addPassword(newPassword);
    });

    act(() => {
      result.current.selectPassword(0);
    });

    expect(result.current.selected).toBe(0);
  });
});
