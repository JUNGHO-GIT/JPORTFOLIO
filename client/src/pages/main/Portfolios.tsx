// Portfolios.jsx

import { useEffect, useState, memo } from "@importReacts";
import { useResponsive, useCommonValue } from "@importHooks";
import { useStoreAlert } from "@importStores";
import { axios } from "@importLibs";
import { Div, Img, Hr, Br, Grid, Paper } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const Portfolios = memo(() => {

  // 0. common -------------------------------------------------------------------------------------
  const { URL, PORTFOLIOS_URL, navigate } = useCommonValue();
  const { xxs, xs, sm, md, lg, xl, xxl, paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>({});
  const [isRendered, setIsRendered] = useState(false);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${URL}${PORTFOLIOS_URL}/detail`)
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
    })
    .finally(() => {
      setIsRendered(true);
    });
  }, [URL, PORTFOLIOS_URL]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (!isRendered) {
      return;
    }
    const imageContainer = document.querySelectorAll(".image-container");
    const imageOverlay = document.querySelectorAll(".image-overlay");

    imageContainer.forEach((el: any) => {
      Object.assign(el.style, {
        position: 'relative',
        width: '100%',
        height: '100%',
      });
    });
    imageOverlay.forEach((el: any) => {
      Object.assign(el.style, {
        position: 'absolute',
        width: '99%',
        height: '98%',
        top: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'none',
      });
      // mouse hover
      el.parentElement.addEventListener('mouseover', () => {
        Object.assign(el.style, {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        });
      });
      el.parentElement.addEventListener('mouseout', () => {
        Object.assign(el.style, {
          display: 'none',
        });
      });
      // mobile click
      el.parentElement.addEventListener('click', () => {
        Object.assign(el.style, {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        });
      });
    });
  }, [isRendered]);

  // 3. handle -------------------------------------------------------------------------------------
  const handleClick = (e: any, id: string) => {
    e.preventDefault();
    navigate(`/projects/project${id}`);
  };

  // 7. portfolios ---------------------------------------------------------------------------------
  const portfoliosNode = () => (
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
            {OBJECT?.portfolios_title}
            <Hr className={"w-140px bg-primary h-3px"} />
          </Div>
        </Grid>
      </Grid>
      <Br m={20} />
      <Grid
        container={true}
        spacing={2}
        className={"h-100p d-left"}
      >
        {OBJECT?.portfolios_section?.filter((_:any, f:number) => f < 6).map((item: any, i: number) => (
          <Grid size={(xxs || xs || sm) ? 12 : (md || lg) ? 6 : (xl || xxl) ? 4 : 4} key={i}>
            <Div className={"p-relative d-center"}>
              <Div className={"image-container p-5px"}>
                <Img
                  hover={false}
                  shadow={true}
                  border={true}
                  radius={true}
                  src={`${item?.portfolios_section_img}.webp`}
                  group={"projects"}
                />
              </Div>
              <Div className={"image-overlay radius-2 fadeIn"}>
                <Div
                  className={"d-row-center w-100p mt-40px mb-20px hover"}
                  onClick={(e: any) => {
                    handleClick(e, item?.portfolios_section_id);
                  }}
                >
                  <Img
                    max={60}
                    hover={false}
                    shadow={false}
                    border={false}
                    radius={false}
                    src={`${item?.portfolios_section_icon}.webp`}
                    group={"icons"}
                    className={"mr-5px"}
                  />
                  <Div className={"fs-1-6rem fw-700 white ls-4-0"}>
                    {item?.portfolios_section_name}
                  </Div>
                </Div>
                <Div className={"d-row-center w-100p mb-20px"}>
                  <Div className={"fs-0-9rem fw-400 white"}>
                    {item?.portfolios_section_desc}
                  </Div>
                </Div>
              </Div>
            </Div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {portfoliosNode()}
    </>
  );
});