/**
 * @file useStoreLoading.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { create } from "@exportLibs";

// -------------------------------------------------------------------------------------------------
declare type LoadingState = {
	LOADING: boolean;
	setLOADING: (loading: boolean) => void;
};

// -------------------------------------------------------------------------------------------------
export const useStoreLoading = create<LoadingState>((set) => ({
	LOADING: false,
	setLOADING: (loading) => {
		set({ LOADING: loading });
	},
}));
