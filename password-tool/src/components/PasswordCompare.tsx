import React from "react";

interface PasswordComparePropsI {
  indexes: number[];
  input: string;
  password: string;
  showPasswords: boolean;
}
interface PasswordCompareSingleI {
  indexes: number[];
  value: string;
  show: boolean;
}

export function PasswordCompareSingle({
  indexes,
  value,
  show,
}: PasswordCompareSingleI) {
  return (
    <p className="password-compare__single-line">
      {value.split("").map((el, index) => (
        <span
          className={`password-compare__letter --is${
            indexes.includes(index) ? "Wrong" : "Correct"
          }`}
          key={index}
        >
          {show ? el : "*"}
        </span>
      ))}
    </p>
  );
}

export default function PasswordCompare({
  indexes,
  input,
  password,
  showPasswords,
}: PasswordComparePropsI) {
  return (
    <div className="password-compare">
      <PasswordCompareSingle
        value={input}
        indexes={indexes}
        show={showPasswords}
      />
      <PasswordCompareSingle
        value={password}
        indexes={indexes}
        show={showPasswords}
      />
    </div>
  );
}
