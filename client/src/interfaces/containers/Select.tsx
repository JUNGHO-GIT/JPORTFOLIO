// Select.tsx

import { TextField } from "@exportMuis";
import { memo, useCallback, useMemo, useRef } from "@exportReacts";

// -------------------------------------------------------------------------------------------------
export const Select = memo((props: any) => {

	// 1. common ------------------------------------------------------------------------------------
	const fullWidth = props?.fullWidth !== undefined ? props.fullWidth : true;
	const debounceRef = useRef<any>(null);

	// 4. handle ------------------------------------------------------------------------------------
	const handleClick = useCallback((e: React.MouseEvent) => {
		if (props?.locked === "locked" || props?.disabled) {
			e.preventDefault();
			e.stopPropagation();
			const target = e.currentTarget;
			target.classList.add('shake');
			setTimeout(() => {
				target.classList.remove('shake');
			}, 700);
		}
		else if (props?.locked !== "locked" && !props?.disabled) {
			props?.onClick && props?.onClick(e);
		}
	}, [props?.locked, props?.disabled, props?.onClick]);

	// 4. handle ------------------------------------------------------------------------------------
	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const debounceMs = props?.debounceMs;
		const original = props?.onChange;
		if (!original) {
			return;
		}
		if (!debounceMs || typeof debounceMs !== "number" || debounceMs <= 0) {
			original(e);
			return;
		}
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		// 이벤트 값 저장
		const value = e.target.value;
		const name = e.target.name;
		debounceRef.current = setTimeout(() => {
			// 새로운 이벤트 객체 생성
			const syntheticEvent = {
				target: { value, name },
				currentTarget: { value, name },
				persist: () => {},
				preventDefault: () => {},
				stopPropagation: () => {}
			} as React.ChangeEvent<HTMLInputElement>;
			original(syntheticEvent);
		}, debounceMs);
	}, [props?.onChange, props?.debounceMs]);

	// 5. memo --------------------------------------------------------------------------------------
	const sxMemo = useMemo(() => ({
		...props?.sx,
		"& .MuiSelect-icon": {
			display: props?.disabled && "none"
		},
		"& .MuiInputBase-root": {
			cursor: (
				props?.readOnly && (
					props?.onClick ? "pointer" : "not-allowed"
				)
			),
			backgroundColor: (
				props?.disabled ? "#f7f7f7" : (
					props?.readOnly && (
						props?.onClick ? "transparent" : "#f7f7f7"
					)
				)
			),
			"&:hover": {
				backgroundColor: (
					props?.disabled ? "#f7f7f7" : (
						props?.readOnly && (
							props?.onClick ? "transparent" : "#f7f7f7"
						)
					)
				),
			},
			"&:focus": {
				backgroundColor: (
					props?.disabled ? "#f7f7f7" : (
						props?.readOnly && (
							props?.onClick ? "transparent" : "#f7f7f7"
						)
					)
				),
			}
		},
	}), [props?.sx, props?.disabled, props?.readOnly, props?.onClick]);

	// 5. memo --------------------------------------------------------------------------------------
	const slotPropsMemo = useMemo(() => ({
		...props?.slotProps,
		input: {
			...props?.slotProps?.input,
			readOnly: (
				(props?.readOnly || props?.locked === "locked") ? true : false
			),
			className: (
				props?.inputclass?.includes("fs-") ? (
					`text-left ${props?.inputclass || ""}`
				) : (
					`fs-0-9rem text-left ${props?.inputclass || ""}`
				)
			),
			startAdornment: (
				props?.startadornment ? (
					typeof props?.startadornment === "string" ? (
						<div className={ `d-center fs-0-6rem ${props?.adornmentclass || ""}` }>
							{ props?.startadornment }
						</div>
					) : (
						<div className={ `d-center ${props?.adornmentclass || ""} mr-2vw` }>
							{ props?.startadornment }
						</div>
					)
				) : null
			),
			endAdornment: (
				props?.endadornment ? (
					typeof props?.endadornment === "string" ? (
						<div className={ `d-center fs-0-6rem ${props?.adornmentclass || ""}` }>
							{ props?.endadornment }
						</div>
					) : (
						<div className={ `d-center ${props?.adornmentclass || ""} ml-2vw` }>
							{ props?.endadornment }
						</div>
					)
				) : null
			),
		},
		htmlInput: {
			...props?.slotProps?.htmlInput,
			className: props?.inputclass?.includes("pointer") ? "pointer" : "",
		},
		inputLabel: {
			...props?.slotProps?.inputLabel,
			shrink: ((props?.shrink === "shrink" || props?.disabled) ? true : undefined),
		}
	}), [
		props?.slotProps, props?.readOnly, props?.locked, props?.inputclass,
		props?.startadornment, props?.adornmentclass, props?.endadornment,
		props?.shrink, props?.disabled
	]);

	// 10. return ------------------------------------------------------------------------------------
	return (
		<TextField
			{ ...props }
    	select={props?.children ? true : false}
			children={ props?.children }
			size={ props?.size || "small" }
			type={ props?.type || "text" }
			variant={ props?.variant || "outlined" }
			className={ props?.className || "" }
			fullWidth={ fullWidth }
			inputRef={ props?.inputRef || null }
			error={ props?.error || false }
			value={ props?.value || "" }
			onClick={ handleClick }
			onChange={ handleChange }
			sx={ sxMemo }
			slotProps={ slotPropsMemo }
		/>
	);
});