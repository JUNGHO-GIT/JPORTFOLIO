// useStorageLocal.tsx

import { useState, useEffect } from "@exportReacts";
import { getLocal, setLocal } from "@exportScripts";

// -------------------------------------------------------------------------------------------------
export const useStorageLocal = (key1: string, key2: string, key3: string, initialVal: any) => {

  // -----------------------------------------------------------------------------------------------
  const [storedVal, setStoredVal] = useState<any>(() => {
    return getLocal(key1, key2, key3) || initialVal;
  });

  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    setLocal(key1, key2, key3, storedVal);
  }, [key1, key2, key3, storedVal]);

  // -----------------------------------------------------------------------------------------------
  return [storedVal, setStoredVal];
};
