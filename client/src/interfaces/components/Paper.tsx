// Paper.tsx

import { Paper as MuiPaper, PaperProps } from "src/exports/ExportMuis";
import { memo, useEffect, useRef } from "src/exports/ExportReacts";

// -------------------------------------------------------------------------------------------------
export const Paper = memo((props: PaperProps) => {
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.removeAttribute("style");
    }
  }, []);

  return (
    <MuiPaper
      {...props}
      ref={paperRef}
      component={"div"}
      className={props?.className || ""}
    />
  );
});
