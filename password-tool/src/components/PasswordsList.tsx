import React from "react";
import { useAppContext } from "../context/appContext";
import "../css/list.css";

export default function PasswordsList() {
  let { passwords, selectPassword, removePassword } = useAppContext();

  const handleRemove = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    let confirmValue = confirm("Are you sure?");
    if (confirmValue === true) {
      removePassword(value);
    } else return;
  };

  return (
    <div className="passwords-list__container">
      <h2 className="passwords-list__header">Your saved passwords</h2>
      <ul className="passwords-list__list">
        {passwords.map((password, index) => (
          <li
            className="passwords-list__element"
            onClick={() => selectPassword(index)}
            key={index}
          >
            <div>
              <span className="passwords-list__element__value">{`${password.value} - `}</span>
              <span className="passwords-list__element__comment">{`${password.comment}`}</span>
            </div>
            <button
              className="passwords-list__element__remove-button"
              onClick={(e) => handleRemove(e, password.value)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
