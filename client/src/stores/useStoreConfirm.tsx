/**
 * @file useStoreConfirm.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { create } from "@exportLibs";

// -------------------------------------------------------------------------------------------------
declare type ConfirmState = {
	CONFIRM: {
		open: boolean;
		msg: string;
		callback?: (confirmed: boolean) => void;
	};
	setCONFIRM: (payload: Partial<ConfirmState[`CONFIRM`]>, callback?: (confirmed: boolean) => void) => void;
};

// -------------------------------------------------------------------------------------------------
export const useStoreConfirm = create<ConfirmState>((set) => ({
	CONFIRM: {
		open: false,
		msg: ``,
		callback: undefined,
	},
	setCONFIRM: (payload, callback) => {
		set((state) => ({
			CONFIRM: {
				...state.CONFIRM,
				...payload,
				callback: callback || state.CONFIRM.callback,
			},
		}));
	},
}));
