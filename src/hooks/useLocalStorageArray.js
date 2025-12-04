import { useEffect, useState } from "react";

export default function useLocalStorageArray(key, defaultValue = []) {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      console.error("Ошибка чтения localStorage", e);
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}
