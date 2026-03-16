import { useEffect, useRef } from "react";

export const useDebounce = <TArgs extends Array<unknown>>(
  callback: (...args: TArgs) => void,
  delayMs = 300,
) => {
  const timeoutId = useRef<number>(undefined);

  const debouncedCallback = (...args: TArgs) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => callback(...args), delayMs);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);

  return debouncedCallback;
};
