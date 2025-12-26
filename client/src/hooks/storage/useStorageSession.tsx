/**
 * @file useStorageSession.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-25
 */

import { useEffect, useState } from "@exportReacts";
import { getSession, setSession } from "@exportScripts";
import { Dispatch, SetStateAction } from "react";

// -------------------------------------------------------------------------------------------------
export const useStorageSession = <T,> (
	key1: string,
	key2: string,
	key3: string,
	initialVal: T
): [T, Dispatch<SetStateAction<T>>] => {

	// -----------------------------------------------------------------------------------------------
	const [storedVal, setStoredVal] = useState(() => {
		const existingValue: T | undefined = getSession(key1, key2, key3) as T | undefined;
		return existingValue ?? initialVal;
	});

	// -----------------------------------------------------------------------------------------------
	useEffect(() => {
		setSession(key1, key2, key3, storedVal);
	}, [
		key1, key2, key3, storedVal
	]);

	// -----------------------------------------------------------------------------------------------
	return [
		storedVal,
		setStoredVal
	];
};
