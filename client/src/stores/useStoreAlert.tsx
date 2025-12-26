/**
 * @file useStoreAlert.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { create } from "@exportLibs";

// -------------------------------------------------------------------------------------------------
declare type AlertState = {
	ALERT: {
		open: boolean;
		msg: string;
		severity: `success` | `error` | `warning` | `info`;
	};
	setALERT: (payload: Partial<AlertState[`ALERT`]>) => void;
};

// -------------------------------------------------------------------------------------------------
export const useStoreAlert = create<AlertState>((set) => ({
	ALERT: {
		open: false,
		msg: ``,
		severity: `success`,
	},
	setALERT: (payload) => {
		set((state) => ({
			ALERT: {
				...state.ALERT,
				...payload,
			},
		}));
	},
}));
