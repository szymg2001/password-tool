import React, { ReactNode } from "react";

type value = { test: string };

const appContext = React.createContext<value>({} as value);

export function useAppContext() {
  return React.useContext(appContext);
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  let test = "test";
  let values: value = { test };
  return <appContext.Provider value={values}>{children}</appContext.Provider>;
}
