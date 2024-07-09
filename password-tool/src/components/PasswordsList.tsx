import { useAppContext } from "../context/appContext";

export default function PasswordsList() {
  let { passwords } = useAppContext();

  return (
    <div className="passwords-list__container">
      <h2 className="passwords-list__header">Your saved passwords</h2>
      <ul className="passwords-list__list">
        {passwords.map((password) => (
          <li className="passwords-list__element">{`${password.value} - ${password.comment}`}</li>
        ))}
      </ul>
    </div>
  );
}
