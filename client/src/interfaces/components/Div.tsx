/**
 * @file Div.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-25
 */

import { memo } from "@exportReacts";

// -------------------------------------------------------------------------------------------------
export const Div = memo((props: any) => {

	let childrenEl: any = props?.children;

	if (typeof childrenEl === `string` && props?.max) {
		childrenEl = childrenEl?.length > props?.max ? `${childrenEl.slice(0, props?.max)}...` : childrenEl;
	}

	return (
		<div {...props}>
			{childrenEl}
		</div>
	);
});
