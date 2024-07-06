import { renderHook } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";
import { act } from "react";

const mockStorage: { [key: string]: string } = {};

Storage.prototype.getItem = jest.fn((key: string) => mockStorage[key]);
Storage.prototype.setItem = jest.fn(
  (key: string, value: string) => (mockStorage[key] = value)
);

beforeEach(() => {
  for (let key in mockStorage) {
    delete mockStorage[key];
  }
});

describe("localStorage", () => {
  it("Shoud apply defaultValue if there is no value in localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test", "defaultValue")
    );

    expect(result.current[0]).toBe("defaultValue");
  });

  it("Should get value from localStorage", () => {
    mockStorage["testKey"] = JSON.stringify("storedValue");

    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue")
    );
    expect(result.current[0]).toBe("storedValue");
  });

  it("Should update value in localStorage on change", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue")
    );

    act(() => {
      result.current[1]("New value");
    });

    expect(mockStorage["testKey"]).toBe(JSON.stringify("New value"));
  });
});
