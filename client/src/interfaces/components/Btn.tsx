// Btn.tsx

import { Button } from "src/exports/ExportMuis";
import { memo } from "src/exports/ExportReacts";

// -------------------------------------------------------------------------------------------------
export const Btn = memo((props: any) => (
  <Button
    {...props}
    size={props?.size || "small"}
    color={props?.color || "primary"}
    variant={props?.variant || "contained"}
    style={{...props?.style}}
  />
));