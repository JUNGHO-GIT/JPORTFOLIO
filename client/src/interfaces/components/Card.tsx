// Card.tsx

import { useEffect, useRef } from "@importReacts";
import { Card as MuiCard } from "@importMuis";
import { CardProps } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const Card = (props: CardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // style 속성 자체를 제거
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.removeAttribute("style");
    }
  }, []);

  return (
    <MuiCard
      {...props}
      ref={cardRef}
      component={"div"}
      className={props?.className || ""}
    />
  );
};
