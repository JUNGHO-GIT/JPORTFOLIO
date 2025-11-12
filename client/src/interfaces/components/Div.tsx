// Div.tsx

import { memo } from "@exportReacts";

// -------------------------------------------------------------------------------------------------
export const Div = memo((props: any) => {

  let childrenEl = props?.children;

  if (typeof childrenEl === "string" && props?.max) {
    childrenEl = childrenEl?.length > props?.max ? childrenEl.slice(0, props?.max) + "..." : childrenEl;
  }

  return (
    <div {...props}>
      {childrenEl}
    </div>
  );
});
