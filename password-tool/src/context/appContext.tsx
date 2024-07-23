import React, { ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type genRules = {
  smallLetters?: boolean;
  largeLetters?: boolean;
  numbers?: boolean;
  symbols?: boolean;
  length: number;
  comment: string;
};

export type password = {
  value: string;
  comment: string;
  date: Date;
};

type value = {
  passwords: password[];
  generatePassword(arg: genRules): password;
  addPassword(arg: password): void;
  removePassword(arg: string): void;
  selected: number;
  selectPassword(arg: number): void;
  clearList(): void;
};

const appContext = React.createContext<value>({} as value);

export function useAppContext() {
  return React.useContext(appContext);
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  let [passwords, setPasswords] = useLocalStorage<password[]>("passwords", []);
  let [selected, setSelected] = React.useState<number>(passwords.length - 1);

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
    if (smallLetters || generateFromString.length === 0)
      generateFromString += sm;

    for (let i = 0; i < length; i++) {
      result.value +=
        generateFromString[
          Math.floor(Math.random() * generateFromString.length)
        ];
    }

    return result;
  };

  const addPassword = (password: password) => {
    setPasswords((prev) => [...prev, password]);
  };

  const removePassword = (value: string) => {
    setPasswords(passwords.filter((el) => el.value !== value));
  };

  const selectPassword = (index: number) => {
    setSelected(index);
  };

  const clearList = () => {
    if (window.confirm("Are you sure? It will clear your entire saved list.")) {
      setPasswords([]);
    } else return;
  };

  let values: value = {
    generatePassword,
    addPassword,
    passwords,
    removePassword,
    selected,
    selectPassword,
    clearList,
  };
  return <appContext.Provider value={values}>{children}</appContext.Provider>;
}
