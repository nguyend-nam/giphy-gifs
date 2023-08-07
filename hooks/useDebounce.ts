import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // update debounced value after the delay amount
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedValue;
}
