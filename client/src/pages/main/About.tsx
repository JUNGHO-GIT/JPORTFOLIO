// About.jsx

import { useEffect, useState, memo } from "@importReacts";
import { useResponsive, useCommonValue } from "@importHooks";
import { useStoreAlert } from "@importStores";
import { axios } from "@importLibs";
import { Div, Img, Hr, Br, Grid, Paper } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const About = memo(() => {

  // 0. common -------------------------------------------------------------------------------------
  const { URL, ABOUT_URL } = useCommonValue();
  const { xxs, xs, sm, md, lg, xl, xxl, paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>({});

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${URL}${ABOUT_URL}/detail`)
    .then((res: any) => {
      setOBJECT(res.data.result);
    })
    .catch((err: any) => {
      setALERT({
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    });
  }, [URL, ABOUT_URL]);

  // 7. about --------------------------------------------------------------------------------------
  const aboutNode = () => (
    <Paper className={`main-wrapper ${paperClass} border-0 radius-0 shadow-0`}>
      <Grid
        container={true}
        spacing={0}
        className={"w-100p d-left"}
      >
        <Grid
          size={xxs ? 12 : xs ? 12 : sm ? 12 : md ? 12 : lg ? 12 : xl ? 12 : xxl ? 12 : 12}
          className={"d-row-left"}
        >
          <Div className={"fs-2-2rem fw-700 dark-navy ml-2vw"}>
            {OBJECT?.about_title}
            <Hr className={"w-140px bg-primary h-3px"} />
          </Div>
        </Grid>
      </Grid>
      <Br m={20} />
      <Grid
        container={true}
        spacing={2}
        columnSpacing={10}
        className={"h-100p d-center border-1 radius-2 shadow-1 px-4vw py-4vh mb-1vh"}
      >
        <Grid size={(xxs || xs || sm) ? 12 : (md || lg || xl || xxl) ? 6 : 6}>
          <Img
            max={600}
            hover={false}
            radius={true}
            shadow={false}
            border={false}
            src={"about.webp"}
            group={"main"}
          />
        </Grid>
        <Grid size={(xxs || xs || sm) ? 12 : (md || lg || xl || xxl) ? 6 : 6}>
          {OBJECT?.about_section?.map((item: any, i: number) => (
            <Grid container={true} spacing={0} key={i} className={"px-15px"}>
              <Grid size={12} className={"d-left"}>
                {i === 0 && (
                  <Div className={"fs-1-8rem fw-600 navy mb-20px"}>
                    {OBJECT?.about_sub}
                  </Div>
                )}
              </Grid>
              <Grid size={3} className={"d-row-left mb-20px"}>
                <Div className={"fs-0-4rem fw-300 dark-navy mr-5px"}>
                  {'●'}
                </Div>
                <Div className={"fs-1-1rem fw-600 light-black"}>
                  {item.about_section_title}
                </Div>
              </Grid>
              <Grid size={9} className={"d-row-left mb-20px"}>
                <Div className={"fs-1-0rem fw-500 dark"}>
                  {item.about_section_value}
                </Div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {aboutNode()}
    </>
  );
});