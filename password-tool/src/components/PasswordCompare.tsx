interface PasswordComparePropsI {
  indexes: number[];
  input: string;
  password: string;
}

export default function PasswordCompare({
  indexes,
  input,
  password,
}: PasswordComparePropsI) {
  return (
    <div className="password-compare">
      <p className="password-compare__input-value">
        {input.split("").map((el, index) => (
          <span
            className={`password-compare__letter --is${
              indexes.includes(index) ? "Wrong" : "Correct"
            }`}
          >
            {el}
          </span>
        ))}
      </p>
      <p className="password-compare__password-value">
        {password.split("").map((el, index) => (
          <span
            className={`password-compare__letter --is${
              indexes.includes(index) ? "Wrong" : "Correct"
            }`}
          >
            {el}
          </span>
        ))}
      </p>
    </div>
  );
}
