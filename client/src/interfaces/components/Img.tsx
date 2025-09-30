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

// -------------------------------------------------------------------------------------------------
export const Img = memo((
	{ group, src, hover, shadow, radius, border, min, max, loading, ...props }: ImgProps
) => {

	// 1. common ----------------------------------------------------------------------------------
	const { GCLOUD_URL } = useCommonValue();

	// 2-1. useRef -----------------------------------------------------------------------------------
	const imageRef = useRef<HTMLImageElement | null>(null);

	// 2-2. useState ---------------------------------------------------------------------------------
	const [fileName, setFileName] = useState<string>("");
	const [imgSrc, setImgSrc] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isEmptyHandled, setIsEmptyHandled] = useState<boolean>(false);

	// 3. memoized imageClass ------------------------------------------------------------------------
	const imageClass = useMemo(() => {
		let newClass = "w-100p h-100p object-contain";
		if (hover) {
			newClass += " hover";
		}
		if (shadow) {
			newClass += " shadow-1";
		}
		if (radius) {
			newClass += " radius-3";
		}
		if (border) {
			newClass += " border-1";
		}
		if (min) {
			newClass += ` w-min-${min}px h-min-${min}px`;
		}
		if (max) {
			newClass += ` w-max-${max}px h-max-${max}px`;
		}
		if (props?.className) {
			newClass += ` ${props.className}`;
		}
		return newClass;
	}, [hover, shadow, radius, border, min, max, props.className]);

	// 4. callbacks ----------------------------------------------------------------------------------
	const handleImageLoad = useCallback(() => {
		setIsLoading(false);
	}, []);

	const handleImageError = useCallback(() => {
		// empty.webp 자체가 에러난 경우 다시 호출하지 않도록 차단
		if (!isEmptyHandled && !imgSrc.includes("empty.webp")) {
			setFileName("empty");
			setImgSrc(`${GCLOUD_URL}/main/empty.webp`);
			setIsEmptyHandled(true);
			setIsLoading(false);
		}
		// fallback 도 실패했을 때는 그냥 로딩 끄고 에러 처리 종료
		else {
			setIsLoading(false);
		}
	}, [isEmptyHandled, imgSrc, GCLOUD_URL]);

	// 5-1. useEffect (src 설정) ---------------------------------------------------------------------
	useEffect(() => {
		setIsLoading(true);
		setIsEmptyHandled(false);

		if (!src || src === "" || src === "empty") {
			setFileName("empty");
			setImgSrc(`${GCLOUD_URL}/main/empty.webp`);
			setIsEmptyHandled(true);
			setIsLoading(false);
		}
		else {
			setFileName(src.split("/").pop()?.split(".")[0] || "empty");
			setImgSrc(group === "new" ? src : `${GCLOUD_URL}/${group || "main"}/${src}`);
			setIsEmptyHandled(false);
		}
	}, [GCLOUD_URL, group, src]);

	// 5-2. useEffect (이미지 로딩) -------------------------------------------------------------------
	useEffect(() => {
		if (!imgSrc || isEmptyHandled) {
			return;
		}

		const img = new Image();
		img.src = imgSrc;
		img.onload = handleImageLoad;
		img.onerror = handleImageError;

		return () => {
			img.onload = null;
			img.onerror = null;
		};
	}, [imgSrc, isEmptyHandled, handleImageLoad, handleImageError]);

	// 7. skeletonNode -------------------------------------------------------------------------------
	const skeletonNode = useMemo(() => (
		<Skeleton
			variant={"rounded"}
			animation={"wave"}
			component={"div"}
		/>
	), []);

	// 8. imageNode ----------------------------------------------------------------------------------
	const imageNode = useMemo(() => (
		<img
			{...props}
			ref={imageRef}
			alt={fileName}
			key={fileName}
			src={imgSrc}
			loading={loading || "lazy"}
			className={imageClass}
			style={{
				imageRendering: "auto",
				filter: "contrast(1.1) brightness(1.0)",
			}}
		/>
	), [props, fileName, imgSrc, loading, imageClass]);

	// 10. return ----------------------------------------------------------------------------------
	return (
		<>
			{isLoading ? skeletonNode : imageNode}
		</>
	);
});