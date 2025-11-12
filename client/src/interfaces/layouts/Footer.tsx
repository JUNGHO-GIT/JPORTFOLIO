// Footer.tsx

import { useState, useEffect, memo } from "src/exports/ExportReacts";
import { useCommonValue, useResponsive } from "src/exports/ExportHooks";
import { axios } from "src/exports/ExportLibs";
import { Div, Img, Grid, Paper } from "src/exports/ExportComponents";

// -------------------------------------------------------------------------------------------------
export const Footer = memo(() => {

  // 0. common -------------------------------------------------------------------------------------
  const { URL } = useCommonValue();
  const { xxs, xs, sm, md, lg, xl, xxl } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>({
    name: "JUNGHO",
    year: new Date().getFullYear(),
    version: "",
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${URL}/api/admin/appInfo`)
    .then((res: any) => {
      setOBJECT((prev: any) => ({
        ...prev,
        version: res.data.result.date
      }));
    })
    .catch((err: any) => {
      console.error(err);
    });
  }, []);

  // 7. footer -------------------------------------------------------------------------------------
  const footerNode = () => (
    <Paper className={`layout-wrapper bg-darkest-navy shadow-top-4 border-0 radius-0 mt-40px`}>
      <Grid container={true} spacing={0}>
        <Grid
          className={(xxs || xs || sm || md) ? "d-row-center" : (lg || xl || xxl) ? "mr-auto" : ""}
          size={(xxs || xs || sm) ? 12 : (md || lg || xl || xxl) ? 7 : 7}
        >
          <Div className={"d-row-center"}>
            <Img
              hover={true}
              shadow={false}
              radius={false}
              border={false}
              src={"logo.webp"}
              group={"main"}
              className={"w-40px h-40px radius-50 mr-15px"}
            />
            {(sm || md || lg || xl || xxl) && (
              <Div className={"fs-1-1rem fw-600 white mr-15px"}>
                {OBJECT?.year}
              </Div>
            )}
            <Div className={"fs-1-0rem fw-400 white mr-15px"}>
              {`All rights reserved by`}
            </Div>
            {(xs ||sm || md || lg || xl || xxl) && (
              <Div className={"fs-1-2rem fw-700 white"}>
                {OBJECT?.name}
              </Div>
            )}
          </Div>
        </Grid>
        <Grid
          className={(xxs || xs || sm) ? "d-none" : (md || lg || xl || xxl) ? "d-row-center" : ""}
          size={(xxs || xs || sm) ? 0 : (md || lg || xl || xxl) ? 3 : 3}
        >
          <Div className={"d-row-center"}>
            <Div className={"fs-0-8rem fw-400 white"}>
              {OBJECT?.version}
            </Div>
          </Div>
        </Grid>
      </Grid>
    </Paper>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {footerNode()}
    </>
  );
});