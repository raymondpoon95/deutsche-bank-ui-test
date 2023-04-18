import React, { useState, useEffect } from "react";

type DebounceProps = {
  searchQuery: string;
  delay: number;
};

const useDebounce = ({ searchQuery, delay }: DebounceProps): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

  useEffect(() => {
    const searchValue = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(searchValue);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};

export default useDebounce;
