// Loader.tsx

import { useStoreLoading } from "@importStores";
import { memo } from "@importReacts";
import { Div } from "@importComponents";

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