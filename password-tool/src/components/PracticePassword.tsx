import React from "react";
import { useAppContext } from "../context/appContext";
import PasswordCompare from "./PasswordCompare";

export default function PracticePassword() {
  let { selected, passwords } = useAppContext();
  let [input, setInput] = React.useState("");
  let [inputToCompare, setInputToCompare] = React.useState("");
  let [length, setLength] = React.useState(passwords[selected].value.length);
  let [mistakes, setMistakes] = React.useState<number[]>([]);
  let [showComparison, setShowComparison] = React.useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.length > 1) return;
    setInput((prev) => prev + e.key);
    setShowComparison(false);
    setInputToCompare("");
  };

  const comparePasswords = () => {
    setMistakes([]);
    input.split("").forEach((el, index) => {
      if (el !== passwords[selected].value[index]) {
        setMistakes((prev) => [...prev, index]);
      }
    });
    setInputToCompare(input);
    setShowComparison(true);
    setInput("");
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  React.useEffect(() => {
    if (input.length === length) comparePasswords();
  }, [input]);

  return (
    <div className="password-practice__container">
      <ul>
        {input.split("").map((letter) => (
          <li>{letter}</li>
        ))}
      </ul>
      {showComparison && (
        <PasswordCompare
          indexes={mistakes}
          password={passwords[selected].value}
          input={inputToCompare}
        />
      )}
    </div>
  );
}
