import React, { ReactNode } from "react";

type genRules = {
  smallLetters?: boolean;
  largeLetters?: boolean;
  numbers?: boolean;
  symbols?: boolean;
  length: number;
  comment?: string;
};

type password = {
  value: string;
  comment?: string;
  date: Date;
};

type value = {
  generatePassword(arg: genRules): password;
  addPassword(arg: password): void;
};

const appContext = React.createContext<value>({} as value);

export function useAppContext() {
  return React.useContext(appContext);
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  let passwords: password[] = [];

  const generatePassword = ({
    smallLetters = false,
    largeLetters = false,
    numbers = false,
    symbols = false,
    length,
    comment = "Not set",
  }: genRules): password => {
    let sm = "qwertyuiopasdfghjklzxcvbnm";
    let lg = "QWERTYUIOPASDFGHJKLZXCVBNM";
    let nb = "1234567890";
    let symb = "!@#$%^&*";

    let generateFromString = "";
    let result: password = { value: "", comment, date: new Date() };

    largeLetters && (generateFromString += lg);
    numbers && (generateFromString += nb);
    symbols && (generateFromString += symb);
    smallLetters ||
      (generateFromString.length === 0 && (generateFromString += sm));

    for (let i = 0; i < length; i++) {
      result.value +=
        generateFromString[
          Math.floor(Math.random() * generateFromString.length)
        ];
    }

    return result;
  };

  const addPassword = (password: password) => {
    passwords.push(password);
  };

  let values: value = { generatePassword, addPassword };
  return <appContext.Provider value={values}>{children}</appContext.Provider>;
}
