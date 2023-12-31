import { useCallback, useState } from 'react';

export default function useBoolean(initialValue = false) {
  const [bool, setBool] = useState(initialValue);

  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggle = useCallback(() => {
    setBool((prev) => !prev);
  }, []);

  return {
    bool,
    setTrue,
    setFalse,
    toggle,
  };
}
