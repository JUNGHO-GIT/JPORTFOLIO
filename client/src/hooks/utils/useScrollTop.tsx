// useScrollTop.tsx

import { useEffect, memo } from "src/exports/ExportReacts";
import { useCommonValue } from "src/exports/ExportHooks";

// -------------------------------------------------------------------------------------------------
export const useScrollTop = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location } = useCommonValue();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (location.pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [location, navigate]);
};