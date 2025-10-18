// Imgs.tsx

import { useCommonValue } from "@importHooks";
import { Skeleton } from "@importMuis";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "@importReacts";

// -------------------------------------------------------------------------------------------------
declare type ImgProps = React.HTMLAttributes<HTMLImageElement> & {
	group?: string;
	src?: any;
	hover?: boolean;
	shadow?: boolean;
	radius?: boolean;
	border?: boolean;
	min?: number;
	max?: number;
	loading?: "eager" | "lazy";
};
declare type ImageCacheEntry = {
	status: "loading" | "loaded" | "error";
	promise?: Promise<void>;
};

// image cache ------------------------------------------------------------------------------------
const IMAGE_CACHE_MAX = 200;
const imageCache: Map<string, ImageCacheEntry> = new Map();
const preloadImage = (src: string): Promise<void> => {
	const existing = imageCache.get(src);
	if (existing) {
		imageCache.delete(src);
		imageCache.set(src, existing);
		return existing.status === "loaded" ? Promise.resolve() : existing.promise!;
	}

	const img = new Image();
	const promise = new Promise<void>((resolve, reject) => {
		img.onload = () => {
			const cached = imageCache.get(src);
			cached && (cached.status = "loaded");
			resolve();
			img.onload = null;
			img.onerror = null;
		};
		img.onerror = () => {
			const cached = imageCache.get(src);
			cached && (cached.status = "error");
			reject(new Error(`failed to load: ${src}`));
			img.onload = null;
			img.onerror = null;
		};
	});

	imageCache.set(src, { status: "loading", promise });
	img.src = src;

	if (imageCache.size > IMAGE_CACHE_MAX) {
		const firstKey = imageCache.keys().next().value;
		firstKey && imageCache.delete(firstKey);
	}

	return promise;
};

// -------------------------------------------------------------------------------------------------
export const Img = memo((
	{ group, src, hover, shadow, radius, border, min, max, loading, ...props }: ImgProps
) => {

	// 1. common ----------------------------------------------------------------------------------
	const { GCLOUD_URL } = useCommonValue();

	// 2-1. useRef -----------------------------------------------------------------------------------
	const currentImgSrcRef = useRef<string>("");

	// 2-2. useState ---------------------------------------------------------------------------------
	const [fileName, setFileName] = useState<string>("");
	const [imgSrc, setImgSrc] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isEmptyHandled, setIsEmptyHandled] = useState<boolean>(false);

	// user event handlers (preserve if passed via props)
	const { onLoad: userOnLoad, onError: userOnError, ...restProps } = props as any;

	// 3. memoized imageClass ------------------------------------------------------------------------
	const imageClass = useMemo(() => [
		"w-100p",
		"h-100p",
		"object-contain",
		hover && "hover",
		shadow && "shadow-2",
		radius && "radius-3",
		border && "border-1",
		min && `w-min-${min}px h-min-${min}px`,
		max && `w-max-${max}px h-max-${max}px`,
		props?.className,
	].filter(Boolean).join(" "), [hover, shadow, radius, border, min, max, props.className]);

	// 4. callbacks ----------------------------------------------------------------------------------
	const handleImageError = useCallback(() => {
		const current = currentImgSrcRef.current;
		const cached = imageCache.get(current);
		cached && (cached.status = "error");
		// empty.webp 자체가 에러난 경우 다시 호출하지 않도록 차단
		!isEmptyHandled && !current.includes("empty.webp")
			? (setFileName("empty"), setImgSrc(`${GCLOUD_URL}/main/empty.webp`), setIsEmptyHandled(true), setIsLoading(false))
			: setIsLoading(false);
	}, [isEmptyHandled, GCLOUD_URL]);

	// 5. useEffect (src 설정 + 이미지 로딩 캐시) -------------------------------------------------------
	useEffect(() => {
		setIsLoading(true);
		setIsEmptyHandled(false);

		const fallback = `${GCLOUD_URL}/main/empty.webp`;
		const trimmed = typeof src === "string" ? src.trim() : "";
		const invalidName = !trimmed || !trimmed.includes(".") || trimmed.startsWith(".") || trimmed.endsWith(".") || trimmed === "." || trimmed.length < 3;
		const finalSrc = (!src || src === "" || src === "empty" || typeof src !== "string" || invalidName)
			? fallback
			: (group === "new" ? trimmed : `${GCLOUD_URL}/${group || "main"}/${trimmed}`);

		setFileName(finalSrc === fallback ? "empty" : trimmed.split("/").pop()?.split(".")[0] || "empty");
		setImgSrc(finalSrc);
		currentImgSrcRef.current = finalSrc;
		setIsEmptyHandled(finalSrc === fallback);

		if (finalSrc === fallback) {
			setIsLoading(false);
			return;
		}

		const cached = imageCache.get(finalSrc);
		if (cached?.status === "loaded") {
			setIsLoading(false);
			return;
		}
		if (cached?.status === "error") {
			handleImageError();
			return;
		}

		let cancelled = false;
		const promise = cached?.promise || preloadImage(finalSrc);
		promise.then(() => {
			return !cancelled && currentImgSrcRef.current === finalSrc && setIsLoading(false);
		})
		.catch(() => {
			return !cancelled && currentImgSrcRef.current === finalSrc && handleImageError();
		});

		return () => {
			cancelled = true;
		};
	}, [GCLOUD_URL, group, src, handleImageError]);

	// 7. skeletonNode -------------------------------------------------------------------------------
	const skeletonNode = useMemo(() => (
		<Skeleton
			variant={"rounded"}
			animation={"wave"}
			component={"div"}
			className={"w-max-15px h-max-15px"}
		/>
	), []);

	// 8. imageNode ----------------------------------------------------------------------------------
	const imageNode = useMemo(() => (
		<img
			{...restProps}
			alt={fileName}
			key={fileName}
			src={imgSrc}
			loading={loading || "lazy"}
			className={imageClass}
			style={{
				imageRendering: "auto",
				filter: "contrast(1.1) brightness(1.0)",
			}}
			onLoad={(e) => {
				currentImgSrcRef.current === imgSrc && imageCache.get(imgSrc) && (imageCache.get(imgSrc)!.status = "loaded");
				currentImgSrcRef.current === imgSrc && setIsLoading(false);
				userOnLoad && userOnLoad(e as any);
			}}
			onError={(e) => {
				handleImageError();
				userOnError && userOnError(e as any);
			}}
		/>
	), [restProps, fileName, imgSrc, loading, imageClass, handleImageError, userOnLoad, userOnError]);

	// 10. return ----------------------------------------------------------------------------------
	return (
		<>
			{isLoading ? skeletonNode : imageNode}
		</>
	);
});