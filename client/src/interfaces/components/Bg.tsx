// Bg.tsx

import { memo } from "src/exports/ExportReacts";
import { Badge } from "src/exports/ExportMuis";

// -------------------------------------------------------------------------------------------------
export const Bg = memo((props: any) =>  (
	<Badge
		{...props}
		showZero={props?.showZero || true}
		className={"mt-n10px ml-5px"}
		sx={{
			...props?.sx,
			'& .MuiBadge-badge': {
				color: props?.sx?.color || "white",
				backgroundColor: props?.bgcolor || "#1976d2",
			},
		}}
	/>
));