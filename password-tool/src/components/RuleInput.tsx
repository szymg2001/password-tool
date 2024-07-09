import React from "react";
import { genRules } from "../context/appContext";

interface RuleInputProps {
  label: string;
  onCheck: (ruleName: keyof genRules, isChecked: boolean) => void;
}

type labels = "Numbers" | "Small letters" | "Symbols" | "Large letters";

export default function RuleInput({ label, onCheck }: RuleInputProps) {
  let rules: { label: labels; ruleName: keyof genRules }[] = [
    { label: "Numbers", ruleName: "numbers" },
    { label: "Small letters", ruleName: "smallLetters" },
    { label: "Symbols", ruleName: "symbols" },
    { label: "Large letters", ruleName: "largeLetters" },
  ];

  let rule = rules.find((el) => el.label === label)?.ruleName || "smallLetters";

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(rule, e.target.checked);
  };

  return (
    <label>
      {`${label}:`}
      <input type="checkbox" onChange={handleCheck} />
    </label>
  );
}
