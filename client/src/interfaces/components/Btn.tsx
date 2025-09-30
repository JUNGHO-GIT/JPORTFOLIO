// Btn.tsx

import { Button } from "@importMuis";
import { memo } from "@importReacts";

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