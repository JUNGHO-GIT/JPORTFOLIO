/**
 * @file Loader.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { useStoreLoading } from "@exportStores";
import { memo } from "@exportReacts";
import { Div } from "@exportComponents";

// -------------------------------------------------------------------------------------------------
export const Loader = memo(() => {

	// 1. common -------------------------------------------------------------------------------------
	const { LOADING } = useStoreLoading();

	// 7.loader --------------------------------------------------------------------------------------
	const loaderNode = () => (
    LOADING ? (
      <Div className={`loader-wrapper`}>
      	<Div className={`loader`} />
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
