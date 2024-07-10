import React from "react";
import { genRules, password, useAppContext } from "../context/appContext";
import RuleInput from "./RuleInput";

export default function GeneratePassword() {
  let [password, setPassword] = React.useState<password | null>(null);
  let [rules, setRules] = React.useState<genRules>({
    length: 12,
  });
  let { generatePassword, addPassword } = useAppContext();

  const updateRule = (ruleName: keyof genRules, value: boolean) => {
    setRules((prev) => ({ ...prev, [ruleName]: value }));
  };

  return (
    <div className="generate-password__container">
      <h1 className="generate-password__header">Generate new password</h1>
      <p className="generate-password__result">
        {password ? password.value : "Your password will be here"}
      </p>
      <button
        disabled={password === null}
        onClick={() => addPassword(password!)}
      >
        Add password
      </button>
      <button onClick={() => setPassword(generatePassword(rules))}>
        Generate
      </button>
      <div className="generate-passwords__rules">
        <label>
          Password length:
          <input
            type="number"
            min={1}
            max={32}
            onChange={(e) =>
              setRules((prev) => ({ ...prev, length: e.target.value }))
            }
          />
        </label>
        <RuleInput label="Small letters" onCheck={updateRule} />
        <RuleInput label="Large letters" onCheck={updateRule} />
        <RuleInput label="Number" onCheck={updateRule} />
        <RuleInput label="Symbols" onCheck={updateRule} />
      </div>
    </div>
  );
}
