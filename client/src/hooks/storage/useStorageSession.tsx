// useStorageSession.tsx

import { useState, useEffect } from "@exportReacts";
import { getSession, setSession } from "@exportScripts";

// -------------------------------------------------------------------------------------------------
export const useStorageSession = (key1: string, key2: string, key3: string, initialVal: any) => {

  // -----------------------------------------------------------------------------------------------
  const [storedVal, setStoredVal] = useState<any>(() => {
    return getSession(key1, key2, key3) || initialVal;
  });

  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    setSession(key1, key2, key3, storedVal);
  }, [key1, key2, key3, storedVal]);

  // -----------------------------------------------------------------------------------------------
  return [storedVal, setStoredVal];
};
