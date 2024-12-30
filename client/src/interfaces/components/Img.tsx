// Img.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue } from "@importHooks";
import { Skeleton } from "@importMuis";

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
export const Img = (
  { group, src, hover, shadow, radius, border, min, max, loading, ...props }: ImgProps
) => {

  // 1. common -------------------------------------------------------------------------------------
  const { GCLOUD_URL } = useCommonValue();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [fileName, setFileName] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imageClass, setImageClass] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 2-3. useEffect (src 설정) ---------------------------------------------------------------------
  useEffect(() => {
    if (src) {
      setFileName(src.split("/").pop()?.split(".")[0] || "empty");
      setImgSrc(group === "new" ? src : `${GCLOUD_URL}/${group || "main"}/${src}`);
    }
  }, [GCLOUD_URL, group, src]);

  // 2-3. useEffect (imageClass 설정) --------------------------------------------------------------
  useEffect(() => {
    const modifiedClass = () => {
      let newClass = "w-100p h-100p object-contain";
      if (hover) {
        newClass += " hover";
      }
      if (shadow) {
        newClass += " shadow-2";
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
    };
    setImageClass(modifiedClass());
  }, [hover, shadow, radius, border, max, props.className]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (!imgSrc) {
      return;
    }
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = (e: any) => {
      e.currentTarget.style.width = "100%";
      e.currentTarget.style.height = "100%";
      e.currentTarget.src = `${GCLOUD_URL}/main/empty.webp`;
      e.currentTarget.alt = "empty";
      setIsLoading(false);
    }
    return () => {
      img.onload = null;
    };
  }, [imgSrc]);

  // 7. skeletonNode -------------------------------------------------------------------------------
  const skeletonNode = () => (
    <Skeleton
      variant={"rounded"}
      animation={"wave"}
      component={"div"}
    />
  );

  // 7. imageNode ----------------------------------------------------------------------------------
  const imageNode = () => (
    <img
      {...props}
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
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {isLoading ? skeletonNode() : imageNode()}
    </>
  );
};