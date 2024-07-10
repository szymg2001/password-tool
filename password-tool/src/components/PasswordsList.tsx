import { useAppContext } from "../context/appContext";

export default function PasswordsList() {
  let { passwords, selectPassword } = useAppContext();

  return (
    <div className="passwords-list__container">
      <h2 className="passwords-list__header">Your saved passwords</h2>
      <ul className="passwords-list__list">
        {passwords.map((password, index) => (
          <li
            className="passwords-list__element"
            onClick={() => selectPassword(index)}
          >{`${password.value} - ${password.comment}`}</li>
        ))}
      </ul>
    </div>
  );
}
