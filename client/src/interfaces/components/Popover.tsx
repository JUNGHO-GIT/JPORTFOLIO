/**
 * @file Popover.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-25
 */

import { React, memo, useEffect, useRef } from "@exportReacts";
import { Popover as MuiPopover, PopoverProps } from "@exportMuis";

// -------------------------------------------------------------------------------------------------
export const Popover = memo((props: PopoverProps) => {

	const paperRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (paperRef.current) {
			paperRef.current.removeAttribute(`style`);
		}
	}, []);

	const mergedSlotProps = {
		...props.slotProps,
		paper: {
			...props.slotProps?.paper,
			ref: paperRef,
			component: `div`,
		},
	};

	return (
		<MuiPopover
			{...props}
			slotProps={mergedSlotProps as PopoverProps[`slotProps`]}
		/>
	);
});
