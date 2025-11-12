// useResponsive.tsx

import { useState, useEffect, memo } from "@exportReacts";
import { useMediaQuery } from "@exportMuis";

// -------------------------------------------------------------------------------------------------
export const useResponsive = () => {

  // 2. useState -----------------------------------------------------------------------------------
  const [paperClass, setPaperClass] = useState("");

  // 2. useMediaQuery ------------------------------------------------------------------------------
  const xxs = useMediaQuery("(min-width: 0px) and (max-width: 330px)");
  const xs = useMediaQuery("(min-width: 330px) and (max-width: 630px)");
  const sm = useMediaQuery("(min-width: 630px) and (max-width: 930px)");
  const md = useMediaQuery("(min-width: 930px) and (max-width: 1200px)");
  const lg = useMediaQuery("(min-width: 1200px) and (max-width: 1500px)");
  const xl = useMediaQuery("(min-width: 1500px) and (max-width: 1800px)");
  const xxl = useMediaQuery("(min-width: 1800px)");

  // 3. useEffect ----------------------------------------------------------------------------------
  useEffect(() => {
    let paperClassStr = "px-10px fadeIn";
    if (xxs || xs) {
      paperClassStr += " w-90p";
    }
    else if (sm) {
      paperClassStr += " w-90p";
    }
    else if (md) {
      paperClassStr += " w-85p";
    }
    else if (lg) {
      paperClassStr += " w-85p";
    }
    else if (xl) {
      paperClassStr += " w-80p";
    }
    else if (xxl) {
      paperClassStr += " w-80p";
    }
    setPaperClass(paperClassStr);
  }, [xxs, xs, sm, md, lg, xl, xxl]);

  // -----------------------------------------------------------------------------------------------
  return {
    xxs,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    paperClass,
  };
};
