// Skills.jsx

import { useEffect, useState } from "@importReacts";
import { useResponsive, useCommonValue } from "@importHooks";
import { useStoreAlert } from "@importStores";
import { axios } from "@importLibs";
import { Div, Img, Hr, Br, Grid, Paper, Icons } from "@importComponents";
import { Accordion, AccordionSummary, AccordionDetails } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const Skills = () => {

  // 0. common -------------------------------------------------------------------------------------
  const { URL, SKILLS_URL } = useCommonValue();
  const { xxs, xs, sm, md, lg, xl, xxl, paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>({});
  const [isExpended, setIsExpended] = useState<any>({});

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${URL}${SKILLS_URL}/detail`)
    .then((res: any) => {
      setOBJECT(res.data.result);
      setIsExpended(res.data.result.skills_section.map(() => true));
    })
    .catch((err: any) => {
      setALERT({
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    });
  }, [URL, SKILLS_URL]);

  // 7. skills -------------------------------------------------------------------------------------
  const skillsNode = () => (
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
            {OBJECT?.skills_title}
            <Hr className={"w-140px bg-primary h-3px"} />
          </Div>
        </Grid>
      </Grid>
      <Br m={20} />
      <Grid
        container={true}
        spacing={2}
        columnSpacing={10}
        className={"h-100p d-top border-1 radius-2 shadow-2 px-4vw py-4vh mb-1vh"}
      >
        {OBJECT?.skills_section?.map((item: any, i: number) => (
          <Grid
            size={xxs ? 12 : xs ? 12 : sm ? 12 : md ? 6 : lg ? 6 : xl ? 6 : xxl ? 6 : 6}
            key={i}
          >
            <Accordion expanded={isExpended[i]} className={"radius-0 shadow-0"}>
              <AccordionSummary>
                <Grid container={true} spacing={0} className={"d-col-left"}>
                  <Grid
                    size={12}
                    className={"d-row-left"}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setIsExpended((prev: any) => ({
                        ...prev,
                        [i]: !prev[i],
                      }));
                    }}
                  >
                    <Div className={"d-center mr-10px"}>
                      <Img
                        max={28}
                        hover={true}
                        shadow={false}
                        border={false}
                        radius={false}
                        src={`${item.skills_section_img}.webp`}
                        group={"icons"}
                      />
                    </Div>
                    <Div className={"fs-1-2rem fw-700 navy"}>
                      {item.skills_section_value}
                    </Div>
                    <Div className={"fs-1-2rem fw-700 navy"}>
                      <Icons
                        key={"ChevronDown"}
                        name={"ChevronDown"}
                        className={"w-18px h-18px"}
                        sx={{
                          transform: isExpended[i] ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease-in-out",
                        }}
                      />
                    </Div>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                    <Grid container={true} spacing={0} rowSpacing={3} className={"d-left"}>
                  {item.skills_section_sub.map((sub: any, j: number) => (
                    <Grid
                      size={xxs ? 6 : xs ? 4 : sm ? 3 : md ? 4 : lg ? 4 : xl ? 3 : xxl ? 3 : 3}
                      className={"d-row-left"}
                      key={j}
                    >
                      <Div className={"d-center mr-5px"}>
                        <Img
                          min={20}
                          max={20}
                          hover={true}
                          shadow={false}
                          border={false}
                          radius={false}
                          src={`${sub.skills_section_sub_icon}.webp`}
                          group={"icons"}
                        />
                      </Div>
                      <Div className={"fs-0-9rem fw-500 dark-navy"} max={10}>
                        {sub.skills_section_sub_value}
                      </Div>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            {(xxs || xs || sm) ? (
              i < OBJECT?.skills_section?.length - 1 && <Hr className={"bg-light h-3px"} />
            ) : (
              i < OBJECT?.skills_section?.length - 2 && <Hr className={"bg-light h-3px"} />
            )}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {skillsNode()}
    </>
  );
};