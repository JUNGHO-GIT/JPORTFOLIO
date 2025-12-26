/**
 * @file Br.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-25
 */

import { memo } from "@exportReacts";

// -------------------------------------------------------------------------------------------------
export const Br = memo((props: any) => (
	<div
		className={props?.className ?? ``}
		style={{
			background: `none`,
			width: `${(props?.w) || 100}%`,
			height: `${(props?.h) || 1}px`,
			margin: `${(props?.m / 2) || 0}px`,
		}}
	/>
));
