import React, { ReactNode } from "react";

type genRules = {
  smallLetters?: boolean;
  largeLetters?: boolean;
  numbers?: boolean;
  symbols?: boolean;
  length: number;
};
type value = { generatePassword(arg: genRules): string };

const appContext = React.createContext<value>({} as value);

export function useAppContext() {
  return React.useContext(appContext);
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  let passwords: string[] = [];

  const generatePassword = ({
    smallLetters = false,
    largeLetters = false,
    numbers = false,
    symbols = false,
    length,
  }: genRules): string => {
    let sm = "qwertyuiopasdfghjklzxcvbnm";
    let lg = "QWERTYUIOPASDFGHJKLZXCVBNM";
    let nb = "1234567890";
    let symb = "!@#$%^&*";

    let generateFromString = "";
    let result = "";

    largeLetters && (generateFromString += lg);
    numbers && (generateFromString += nb);
    symbols && (generateFromString += symb);
    smallLetters ||
      (generateFromString.length === 0 && (generateFromString += sm));

    for (let i = 0; i < length; i++) {
      result +=
        generateFromString[
          Math.floor(Math.random() * generateFromString.length)
        ];
    }

    return result;
  };

  let values: value = { generatePassword };
  return <appContext.Provider value={values}>{children}</appContext.Provider>;
}
