// Toggle.tsx

import { useState, memo } from "src/exports/ExportReacts";
import { useCommonValue } from "src/exports/ExportHooks";
import { Div, Icons } from "src/exports/ExportComponents";
import { SpeedDial, Backdrop } from "src/exports/ExportMuis";

// -------------------------------------------------------------------------------------------------
export const Toggle = memo(() => {

  // 0. common -------------------------------------------------------------------------------------
  const { location, navigate } = useCommonValue();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);

  // 7. toggle -------------------------------------------------------------------------------------
  const toggleNode = () => (
    <Div className={`d-row p-fixed bottom-3vh z-600 right-3vw`}>
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
      />
      <SpeedDial
        ariaLabel={"speedDial"}
        open={false}
        className={"hover mr-2vw"}
        icon={
          <Icons
            key={"Undo"}
            name={"Undo"}
            fill={"none"}
            color={"#ffffff"}
            className={"w-25px h-25px"}
          />
        }
        FabProps={{
          size: "small",
          component: "div",
          className: "shadow-4 bg-dark-grey"
        }}
        onClick={() => location.pathname !== "/" && navigate(-1)}
      />
      <SpeedDial
        ariaLabel={"speedDial"}
        open={false}
        className={"hover ml-2vw"}
        icon={
          <Icons
            key={"CaretUp"}
            name={"CaretUp"}
            fill={"#ffffff"}
            color={"#ffffff"}
            className={"w-25px h-25px"}
          />
        }
        FabProps={{
          size: "small",
          component: "div",
          className: "shadow-4 bg-primary"
        }}
        onClick={() => window.scrollTo(0, 0)}
      />
    </Div>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {toggleNode()}
    </>
  );
});