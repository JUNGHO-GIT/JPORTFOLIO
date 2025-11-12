// Popover.tsx

import { Popover as MuiPopover, PopoverProps } from "src/exports/ExportMuis";
import { memo, useEffect, useRef } from "src/exports/ExportReacts";

// -------------------------------------------------------------------------------------------------
export const Popover = memo((props: PopoverProps) => {
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.removeAttribute("style");
    }
  }, []);

  const mergedSlotProps = {
    ...props.slotProps,
    paper: {
      ...(props.slotProps && props.slotProps.paper ? props.slotProps.paper : {}),
      ref: paperRef,
      component: "div",
    },
  };

  return (
    <MuiPopover
      {...props}
      slotProps={mergedSlotProps}
    />
  );
});
