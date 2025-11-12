// Loader.tsx

import { useStoreLoading } from "src/exports/ExportStores";
import { memo } from "src/exports/ExportReacts";
import { Div } from "src/exports/ExportComponents";

// -------------------------------------------------------------------------------------------------
export const Loader = memo(() => {

  // 1. common -------------------------------------------------------------------------------------
  const { LOADING } = useStoreLoading();

  // 7.loader --------------------------------------------------------------------------------------
  const loaderNode = () => (
    LOADING ? (
      <Div className={"loader-wrapper"}>
        <Div className={"loader"} />
      </Div>
    ) : (
      <Div />
    )
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {loaderNode()}
    </>
  );
});