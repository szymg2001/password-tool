import React from "react";

export default function useLocaleStorage<T>(key: string, defaultValue?: T) {
  let [state, setState] = React.useState<T | undefined>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}
