import React from "react";

export default function useLocalStorage<T>(key: string, defaultValue?: T) {
  let [state, setState] = React.useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
}
