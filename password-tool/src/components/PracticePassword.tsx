import React from "react";
import { useAppContext } from "../context/appContext";
import PasswordCompare from "./PasswordCompare";
import "../css/practice.css";

export default function PracticePassword() {
  let { selected, passwords } = useAppContext();
  let [input, setInput] = React.useState("");
  let [inputToCompare, setInputToCompare] = React.useState("");
  let [length, setLength] = React.useState(passwords[selected].value.length);
  let [mistakes, setMistakes] = React.useState<number[]>([]);
  let [showComparison, setShowComparison] = React.useState(false);
  let blockKeyDownRef = React.useRef(false);
  let [showPasswords, setShowPasswords] = React.useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.length > 1) return;
    if (blockKeyDownRef.current) return;
    setInput((prev) => prev + e.key);
    setShowComparison(false);
    setInputToCompare("");
  };

  const comparePasswords = () => {
    setMistakes([]);
    blockKeyDownRef.current = true;
    input.split("").forEach((el, index) => {
      if (el !== passwords[selected].value[index]) {
        setMistakes((prev) => [...prev, index]);
      }
    });
    setInputToCompare(input);
    setShowComparison(true);
    setInput("");
    setTimeout(() => {
      blockKeyDownRef.current = false;
    }, 500);
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
      <div className="password-practice__input-container">
        <ul className="password-practice__letters">
          {[...Array(length).keys()].map((el, index) => (
            <li className="password-pracitce__letter">
              {input.length > index &&
                (showPasswords ? input.split("")[index] : "*")}
            </li>
          ))}
        </ul>
        <button
          className="default-button password-practice__show-button"
          onClick={() => setShowPasswords((prev) => !prev)}
        >
          {showPasswords ? "Hide" : "Show"}
        </button>
      </div>
      {showComparison && (
        <PasswordCompare
          indexes={mistakes}
          password={passwords[selected].value}
          input={inputToCompare}
          showPasswords={showPasswords}
        />
      )}
    </div>
  );
}
