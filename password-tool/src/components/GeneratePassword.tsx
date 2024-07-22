import React from "react";
import { genRules, password, useAppContext } from "../context/appContext";
import RuleInput from "./RuleInput";
import "../css/generate.css";

export default function GeneratePassword() {
  let [password, setPassword] = React.useState<password | null>(null);
  let [rules, setRules] = React.useState<genRules>({
    length: 12,
    comment: "Not set",
  });
  let { generatePassword, addPassword } = useAppContext();

  const updateRule = (ruleName: keyof genRules, value: boolean) => {
    setRules((prev) => ({ ...prev, [ruleName]: value }));
  };

  const updateComment = (value: string) => {
    setRules((prev) => ({ ...prev, comment: value }));
    setPassword((prev) => (prev ? { ...prev, comment: value } : null));
  };

  return (
    <div className="generate-password__container">
      <h1 className="generate-password__header">Generate new password</h1>
      <p className="generate-password__result">
        {password ? password.value : "Your password will be here"}
      </p>
      <div className="generate-password__buttons">
        <button
          className="default-button"
          disabled={password === null}
          onClick={() => addPassword(password!)}
        >
          Add password
        </button>
        <button
          className="default-button"
          onClick={() => setPassword(generatePassword(rules))}
        >
          Generate
        </button>
      </div>
      <div className="generate-password__rules">
        <h2>Generation rules</h2>
        <div className="generate-password__rule-input-container">
          <label
            className="generate-password__rule-label"
            htmlFor="generate-input__length"
          >
            Password length:{" "}
          </label>
          <input
            type="number"
            id="generate-input__length"
            min={1}
            max={32}
            onChange={(e) =>
              setRules((prev) => ({
                ...prev,
                length: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <RuleInput label="Small letters" onCheck={updateRule} />
        <RuleInput label="Large letters" onCheck={updateRule} />
        <RuleInput label="Number" onCheck={updateRule} />
        <RuleInput label="Symbols" onCheck={updateRule} />
        <label>
          Comment:
          <input type="text" onChange={(e) => updateComment(e.target.value)} />
        </label>
      </div>
    </div>
  );
}
