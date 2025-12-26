/**
 * @file TextArea.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-26
 */

import { React, memo, useCallback, useMemo, useRef } from "@exportReacts";
import { TextField } from "@exportMuis";

// -------------------------------------------------------------------------------------------------
export const TextArea = memo((props: any) => {

	// 1. common ------------------------------------------------------------------------------------
	const fullWidth: boolean = props?.fullWidth !== undefined ? props.fullWidth : true;
	const debounceRef: React.RefObject<any> = useRef<any>(null);

	// 4. handle ------------------------------------------------------------------------------------
	const handleClick = useCallback((e: React.MouseEvent) => {
		if (props?.locked === `locked` || props?.disabled) {
			e.preventDefault();
			e.stopPropagation();
			const target: any = e.currentTarget;
			target.classList.add(`shake`);
			setTimeout(() => {
				target.classList.remove(`shake`);
			}, 700);
		}
		else if (props?.locked !== `locked` && !props?.disabled) {
			props?.onClick?.(e);
		}
	}, [
		props?.locked, props?.disabled, props?.onClick
	]);

	// 4. handle ------------------------------------------------------------------------------------
	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const debounceMs: number | undefined = props?.debounceMs;
		const original: any = props?.onChange;
		if (!original) {
			return;
		}
		if (!debounceMs || typeof debounceMs !== `number` || debounceMs <= 0) {
			original(e);
			return;
		}
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		const clonedEvent = {
			...e, target: e.target, currentTarget: e.currentTarget
		} as React.ChangeEvent<HTMLInputElement>;
		debounceRef.current = setTimeout(() => {
			original(clonedEvent);
		}, debounceMs);
	}, [props?.onChange, props?.debounceMs]);

	// 5. memo --------------------------------------------------------------------------------------
	const slotPropsMemo = useMemo(() => ({
		...props?.slotProps,
		input: {
			...props?.slotProps?.input,
			readOnly: (
				!!((props?.readOnly ?? props?.locked === `locked`))
			),
			className: (
				props?.inputclass?.includes(`fs-`) ? (
					`text-left ${props?.inputclass ?? ``}`
				) : (
					`fs-0-9rem text-left ${props?.inputclass ?? ``}`
				)
			),
			startAdornment: (
				props?.startadornment ? (
					typeof props?.startadornment === `string` ? (
						<div className={`d-center fs-0-6rem ${props?.adornmentclass ?? ``}`}>
							{props?.startadornment}
						</div>
					) : (
						<div className={`d-center ${props?.adornmentclass ?? ``} mr-2vw`}>
							{props?.startadornment}
						</div>
					)
				) : null
			),
			endAdornment: (
				props?.endadornment ? (
					typeof props?.endadornment === `string` ? (
						<div className={`d-center fs-0-6rem ${props?.adornmentclass ?? ``}`}>
							{props?.endadornment}
						</div>
					) : (
						<div className={`d-center ${props?.adornmentclass ?? ``} ml-2vw`}>
							{props?.endadornment}
						</div>
					)
				) : null
			),
		},
		htmlInput: {
			...props?.slotProps?.htmlInput,
			className: props?.inputclass?.includes(`pointer`) ? `pointer` : ``,
		},
		inputLabel: {
			...props?.slotProps?.inputLabel,
			shrink: ((props?.shrink === `shrink` || props?.disabled) ? true : undefined),
		}
	}), [
		props?.slotProps,
		props?.readOnly,
		props?.locked,
		props?.inputclass,
		props?.startadornment,
		props?.adornmentclass,
		props?.endadornment,
		props?.shrink,
		props?.disabled
	]);

	// 10. return ------------------------------------------------------------------------------------
	return (
		<TextField
			{...props}
			select={false}
			multiline={true}
			size={props?.size ?? `small`}
			type={props?.type ?? `text`}
			variant={props?.variant ?? `outlined`}
			className={props?.className ?? ``}
			fullWidth={fullWidth}
			inputRef={props?.inputRef ?? null}
			error={props?.error ?? false}
			onClick={handleClick}
			onChange={handleChange}
			slotProps={slotPropsMemo}
		/>
	);
});
