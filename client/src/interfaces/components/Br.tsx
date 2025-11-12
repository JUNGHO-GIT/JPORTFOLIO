// Br.tsx

import { memo } from "src/exports/ExportReacts";

// -------------------------------------------------------------------------------------------------
export const Br = memo((props: any) => (
	<div
		className={props?.className || ""}
		style={{
			"background": "none",
			"width": `${(props?.w) || 100}%`,
			"height": `${(props?.h) || 1.0}px`,
			"margin": `${(props?.m / 2) || 0}px 0px`,
		}}
	/>
));