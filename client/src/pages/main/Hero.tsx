// Hero.jsx

import { useState, useRef, useEffect, memo } from "@exportReacts";
import { useResponsive } from "@exportHooks";
import { Typed } from "@exportLibs";
import { Div, Img, Grid, Paper } from "@exportComponents";

// -------------------------------------------------------------------------------------------------
export const Hero = memo(() => {

  // 0. common -------------------------------------------------------------------------------------
  const { xxs, xs, sm, md, lg, xl, xxl } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const typedRef = useRef<HTMLSpanElement | null>(null);
  const typedInstance = useRef<Typed | null>(null);
  const [OBJECT, _setOBJECT] = useState<any>({
    title: "JUNGHO MUN",
    sub: [
      "Java, Spring, React, TypeScript, JavaScript, HTML, CSS",
    ],
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    const typed = typedRef.current;
    if (typed) {
      const typedStrings = typed.getAttribute("data-typed-items")?.split(",");
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
      typedInstance.current = new Typed(typed, {
        strings: typedStrings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1500,
        cursorChar: "|",
      });
    }
    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);

  // 7. hero ---------------------------------------------------------------------------------------
  const heroNode = () => (
    <Paper className={"main-wrapper border-0 radius-0 shadow-0"}>
      <Grid container={true} spacing={0}>
        <Grid size={12} className={"d-center p-relative"}>
          <Img
            hover={false}
            shadow={false}
            radius={false}
            group={"main"}
            src={(xxs || xs) ? (
                "main2.webp"
              ) : (sm|| md || lg || xl || xxl) ? (
                "main1.webp"
              ) : (
                "main1.webp"
              )
            }
            className={(xxs || xs) ? (
                "w-110p"
              ) : (sm|| md) ? (
                "w-200p"
              ) : (lg || xl || xxl) ? (
                "w-100p"
              ) : (
                "w-100p"
              )
            }
          />
          <Div className={"p-absolute"}>
            <Div className={"fs-2-2rem fw-700 white mb-10px"}>
              {OBJECT?.title}
            </Div>
            <Div className={"fs-1-8rem fw-400 white"}>
              <span
                ref={typedRef}
                data-typed-items={OBJECT?.sub}
              />
            </Div>
          </Div>
        </Grid>
      </Grid>
    </Paper>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {heroNode()}
    </>
  );
});