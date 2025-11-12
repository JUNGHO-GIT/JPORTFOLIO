// Grid.tsx

import { GridProps, Grid as MuiGrid } from "src/exports/ExportMuis";
import { memo, useEffect, useRef } from "src/exports/ExportReacts";

// -------------------------------------------------------------------------------------------------
export const Grid = memo((props: GridProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.removeAttribute("style");
    }
  }, []);

  return (
    <MuiGrid
      {...props}
      ref={cardRef}
      component={"div"}
      className={props?.className || ""}
    />
  );
});
