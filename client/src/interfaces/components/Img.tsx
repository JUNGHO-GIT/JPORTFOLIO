/**
 * @file Img.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-25
 */

import { React, memo, useCallback, useEffect, useMemo, useRef, useState } from "@exportReacts";
import { useCommonValue } from "@exportHooks";
import { Skeleton } from "@exportMuis";

// -------------------------------------------------------------------------------------------------
declare interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	group?: string;
	src?: any;
	hover?: boolean;
	shadow?: boolean;
	radius?: boolean;
	border?: boolean;
	min?: number;
	max?: number;
	loading?: `eager` | `lazy`;
}
declare interface ImageCacheEntry {
	status: `loading` | `loaded` | `error`;
	promise?: Promise<void>;
}

// image cache ------------------------------------------------------------------------------------
const IMAGE_CACHE_MAX: number = 200;
const imageCache: Map<string, ImageCacheEntry> = new Map();
const preloadImage = (src: string): Promise<void> => {
	const existing: ImageCacheEntry | undefined = imageCache.get(src);
	if (existing) {
		imageCache.delete(src);
		imageCache.set(src, existing);
		return existing.status === `loaded` ? Promise.resolve() : existing.promise!;
	}

	const img: HTMLImageElement = new Image();
	const promise: Promise<void> = new Promise<void>((resolve, reject) => {
		img.addEventListener(`load`, () => {
			const cached = imageCache.get(src);
			cached && (cached.status = `loaded`);
			resolve();
			img.onload = null;
			img.onerror = null;
		});
		img.onerror = () => {
			const cached = imageCache.get(src);
			cached && (cached.status = `error`);
			reject(new Error(`failed to load: ${src}`));
			img.onload = null;
			img.onerror = null;
		};
	});

	imageCache.set(src, { status: `loading`, promise: promise });
	img.src = src;

	if (imageCache.size > IMAGE_CACHE_MAX) {
		const firstKey = imageCache.keys().next().value;
		firstKey && imageCache.delete(firstKey);
	}

	return promise;
};

// -------------------------------------------------------------------------------------------------
export const Img = memo((
	{
		group, src, hover, shadow, radius, border, min, max, loading, ...props
	}: ImgProps
) => {

	// 1. common ----------------------------------------------------------------------------------
	const { GCLOUD_URL } = useCommonValue();

	// 2-1. useRef -----------------------------------------------------------------------------------
	const currentImgSrcRef = useRef<string>(``);
	const isEmptyHandledRef = useRef<boolean>(false);

	// 2-2. useState ---------------------------------------------------------------------------------
	const [fileName, setFileName] = useState<string>(``);
	const [imgSrc, setImgSrc] = useState<string>(``);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isEmptyHandled, setIsEmptyHandled] = useState<boolean>(false);

	// user event handlers (preserve if passed via props)
	const {
		onLoad: userOnLoad, onError: userOnError, ...restProps
	} = props as any;

	// 3. memoized imageClass ------------------------------------------------------------------------
	const imageClass = useMemo(() => [
		`w-100p`,
		`h-100p`,
		`object-contain`,
		hover && `hover`,
		shadow && `shadow-2`,
		radius && `radius-3`,
		border && `border-1`,
		min && `w-min-${min}px h-min-${min}px`,
		max && `w-max-${max}px h-max-${max}px`,
		props?.className,
	].filter(Boolean).join(` `), [
		hover, shadow, radius, border, min, max, props.className
	]);

	// 4. callbacks ----------------------------------------------------------------------------------
	const handleImageError = useCallback(() => {
		const current: string = currentImgSrcRef.current;
		const cached: ImageCacheEntry | undefined = imageCache.get(current);
		cached && (cached.status = `error`);

		const fallback: string = `${GCLOUD_URL}/main/empty.webp`;

		// empty.webp 자체가 에러난 경우 다시 호출하지 않도록 차단 (ref로 제어해서 무한 루프 방지)
		!isEmptyHandledRef.current && !current.includes(`empty.webp`)
			? (() => {
				isEmptyHandledRef.current = true;
				setIsEmptyHandled(true);
				setFileName(`empty`);
				setImgSrc(fallback);
				setIsLoading(false);
			})()
			: setIsLoading(false);
	}, [GCLOUD_URL]);

	// 5. useEffect (src 설정 + 이미지 로딩 캐시) -------------------------------------------------------
	useEffect(() => {
		setIsLoading(true);
		setIsEmptyHandled(false);
		isEmptyHandledRef.current = false;

		const fallback: string = `${GCLOUD_URL}/main/empty.webp`;
		const trimmed: string = typeof src === `string` ? src.trim() : ``;

		const isBlob: boolean = typeof trimmed === `string` && trimmed.startsWith(`blob:`);
		const isData: boolean = typeof trimmed === `string` && trimmed.startsWith(`data:`);
		const isHttp: boolean = typeof trimmed === `string` && (/^https?:\/\//).test(trimmed);
		const isAbsoluteUrl: boolean = isBlob || isData || isHttp;

		// 파일명일 때만 검증 (blob/data/http는 그대로 허용)
		const invalidName: boolean = !isAbsoluteUrl && (
			!trimmed ||
			!trimmed.includes(`.`) ||
			trimmed.startsWith(`.`) ||
			trimmed.endsWith(`.`) ||
			trimmed === `.` ||
			trimmed.length < 3
		);

		const finalSrc: string = (!src || src === `` || src === `empty` || typeof src !== `string` || invalidName)
			? fallback
			: (
				group === `new` || isAbsoluteUrl
					? trimmed
					: `${GCLOUD_URL}/${group ?? `main`}/${trimmed}`
			);

		const resolvedName: string = finalSrc === fallback ? `empty` : (
			isBlob || isData
				? `preview`
				: (trimmed.split(`/`).pop()?.split(`?`)[0]?.split(`#`)[0]?.split(`.`)[0] ?? `img`)
		);

		setFileName(resolvedName);
		setImgSrc(finalSrc);
		currentImgSrcRef.current = finalSrc;

		isEmptyHandledRef.current = finalSrc === fallback;
		setIsEmptyHandled(finalSrc === fallback);

		if (finalSrc === fallback) {
			setIsLoading(false);
			return;
		}

		const cached: ImageCacheEntry | undefined = imageCache.get(finalSrc);
		if (cached?.status === `loaded`) {
			setIsLoading(false);
			return;
		}
		if (cached?.status === `error`) {
			handleImageError();
			return;
		}

		let cancelled: boolean = false;
		const promise: Promise<void> = cached?.promise ?? preloadImage(finalSrc);
		promise.then(() => !cancelled && currentImgSrcRef.current === finalSrc && setIsLoading(false))
		.catch(() => !cancelled && currentImgSrcRef.current === finalSrc && handleImageError());

		return () => {
			cancelled = true;
		};
	}, [GCLOUD_URL, group, src, handleImageError]);

	// 7. skeletonNode -------------------------------------------------------------------------------
	const skeletonNode = useMemo(() => (
		<Skeleton
			variant={`rounded`}
			animation={`wave`}
			component={`div`}
			className={`w-max-10px h-max-10px`}
		/>
	), []);

	// 8. imageNode ----------------------------------------------------------------------------------
	const imageNode = useMemo(() => (
		<img
			{...restProps}
			alt={fileName}
			key={imgSrc}
			src={imgSrc}
			loading={loading ?? `lazy`}
			className={imageClass}
			style={{
				imageRendering: `auto`,
				filter: `contrast(1.1) brightness(1.0)`,
			}}
			onLoad={(e) => {
				currentImgSrcRef.current === imgSrc && imageCache.get(imgSrc) && (imageCache.get(imgSrc)!.status = `loaded`);
				currentImgSrcRef.current === imgSrc && setIsLoading(false);
				userOnLoad?.(e as any);
			}}
			onError={(e) => {
				handleImageError();
				userOnError?.(e as any);
			}}
		/>
	), [
		restProps, fileName, imgSrc, loading, imageClass, handleImageError, userOnLoad, userOnError
	]);

	// 10. return ----------------------------------------------------------------------------------
	return (
		<>
			{isLoading ? skeletonNode : imageNode}
		</>
	);
});
