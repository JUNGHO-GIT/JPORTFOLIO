/**
 * @file Btn.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-25
 */

import { Button } from "@exportMuis";
import { memo } from "@exportReacts";

// -------------------------------------------------------------------------------------------------
export const Btn = memo((props: any) => (
	<Button
		{...props}
		size={props?.size || `small`}
		color={props?.color || `primary`}
		variant={props?.variant || `contained`}
		style={{ ...props?.style }}
	/>
));
