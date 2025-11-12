// PopUp.tsx

import { Popover } from "src/exports/ExportComponents";
import { bindPopover, PopoverOrigin, usePopupState } from "src/exports/ExportMuis";
import { memo, useCallback, useEffect, useMemo, useState } from "src/exports/ExportReacts";

// -------------------------------------------------------------------------------------------------
export const PopUp = memo((props: any) => {

	// 2-2. useState ---------------------------------------------------------------------------------
	const popupState = usePopupState({
		variant: "popover",
		popupId: "popup",
	});
	const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	});

	// 2-3. useEffect -----------------------------------------------------------------------------
	useEffect(() => {
		if (props?.type === "innerCenter") {
			setPopupStyle((prev) => ({
				...prev,
				border: '0.2px solid rgba(0, 0, 0, 0.2)',
				boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
				padding: "20px"
			}));
		}
		else if (props?.type === "alert") {
			setPopupStyle((prev) => ({
				...prev,
				border: '1px solid red',
				boxShadow: '0px 0px 10px rgba(255, 0, 0, 0.5)',
				padding: "6px"
			}));
		}
		else if (props?.type === "chart") {
			setPopupStyle((prev) => ({
				...prev,
				border: '0.2px solid rgba(0, 0, 0, 0.2)',
				boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
				padding: "6px 0px 6px 12px"
			}));
		}
		else if (props?.type === "modal") {
			setPopupStyle((prev) => ({
				...prev,
				border: '0.2px solid rgba(0, 0, 0, 0.2)',
				boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
				padding: "10px"
			}));
		}
	}, [props?.type]);

	// 4. handle ------------------------------------------------------------------------------------
	const handleClose = useCallback((_event: any, reason: string) => {
		if (reason === "backdropClick") {
			popupState.close();
		}
	}, [popupState]);

	const openPopup = useCallback((anchorEl: any) => {
		popupState.setAnchorEl(anchorEl);
		popupState.open();
	}, [popupState]);

	const closePopup = useCallback(() => {
		popupState.close();
	}, [popupState]);

	// 4. memoized values ---------------------------------------------------------------------------
	const popupContents = useMemo(() => (
		typeof props?.contents === "function"
			? props?.contents({ closePopup })
			: props?.contents
	), [props?.contents, closePopup]);

	const popupChildren = useMemo(() => (
		props?.children({ openPopup, closePopup })
	), [props?.children, openPopup, closePopup]);

	const anchorOrigin = useMemo<PopoverOrigin>(() => ({
		vertical: props?.position === "center" ? "center" : (
			props?.position === "top" ? "top" : "bottom"
		),
		horizontal: props?.direction === "center" ? "center" : (
			props?.direction === "right" ? "right" : "left"
		)
	}), [props?.position, props?.direction]);

	const transformOrigin = useMemo<PopoverOrigin>(() => ({
		vertical: props?.position === "center" ? "center" : (
			props?.position === "top" ? "bottom" : "top"
		),
		horizontal: props?.direction === "center" ? "center" : (
			props?.direction === "right" ? "left" : "right"
		)
	}), [props?.position, props?.direction]);

	const innerCenterAnchorPosition = useMemo(() => ({
		top: window.innerHeight / 2,
		left: window.innerWidth / 2
	}), []);

	// 5. chainedPopUp -------------------------------------------------------------------------------
	const chainedPopUp = useMemo(() => (
		<>
			<Popover
				{...bindPopover(popupState)}
				open={popupState.isOpen}
				anchorEl={popupState.anchorEl}
				onClose={handleClose}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
				slotProps={{
					paper: {
						sx: popupStyle
					}
				}}
			>
				{popupContents}
			</Popover>
			{popupChildren}
		</>
	), [popupState, handleClose, anchorOrigin, transformOrigin, popupStyle, popupContents, popupChildren]);

	// 6. innerCenterPopUp ---------------------------------------------------------------------------
	const innerCenterPopUp = useMemo(() => (
		<>
			<Popover
				{...bindPopover(popupState)}
				open={popupState.isOpen}
				anchorEl={null}
				onClose={handleClose}
				anchorReference={"anchorPosition"}
				anchorPosition={innerCenterAnchorPosition}
				anchorOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
				slotProps={{
					paper: {
						sx: popupStyle
					}
				}}
			>
				{popupContents}
			</Popover>
			{popupChildren}
		</>
	), [popupState, handleClose, innerCenterAnchorPosition, popupStyle, popupContents, popupChildren]);

	// 10. return ------------------------------------------------------------------------------------
	return (
		<>
			{props?.type === "innerCenter" && innerCenterPopUp}
			{props?.type !== "innerCenter" && chainedPopUp}
		</>
	);
});