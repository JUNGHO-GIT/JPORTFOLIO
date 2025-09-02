// Project3.jsx

import { useEffect, useState } from "@importReacts";
import { useResponsive, useCommonValue } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importStores";
import { Swiper, SwiperSlide, Navigation, Pagination, axios } from "@importLibs";
import { Div, Img, Hr, Br, Grid, Paper } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const Project3 = () => {

  // 0. common -------------------------------------------------------------------------------------
  const { URL, PROJECTS_URL } = useCommonValue();
  const { xxs, xs, sm, md, lg, xl, xxl, paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>();
  const [images, _setImages] = useState<string[]>([
    "project3_1",
    "project3_2",
    "project3_3",
    "project3_4",
  ]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${PROJECTS_URL}/detail`, {
      params: {
        project_id: "Project3",
      }
    })
    .then((res: any) => {
      setLOADING(false);
      setOBJECT(res.data.result);
    })
    .catch((err: any) => {
      setLOADING(false);
      setALERT({
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, PROJECTS_URL]);

  // 7. projects -----------------------------------------------------------------------------------
  const projectNode = () => (
    <Paper className={`detail-wrapper ${paperClass} border-0 radius-0 shadow-0`}>
      {/** images **/}
      <Grid
        container={true}
        spacing={0}
        className={"w-100p d-center"}
      >
        <Grid size={12} className={"d-col-center"}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            navigation={{
              enabled: true,
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              enabled: true,
              clickable: true,
              el: ".image-pagination",
            }}
            modules={[
              Pagination, Navigation,
            ]}
          >
            {images.map((image: string, i: number) => (
              <SwiperSlide className={"w-100p p-relative"} key={i}>
                <Div className={"p-5px"}>
                  <Img
                    max={1000}
                    hover={false}
                    shadow={true}
                    radius={true}
                    border={true}
                    src={`${image}.webp`}
                    group={"projects"}
                  />
                </Div>
              </SwiperSlide>
            ))}
            <Div className={"swiper-button-prev"} />
            <Div className={"swiper-button-next"} />
          </Swiper>
        </Grid>
        <Grid size={12} className={"d-row-center"}>
          <Div className={"image-pagination transform-none"} />
        </Grid>
      </Grid>
      <Br m={40} />
      <Grid
        container={true}
        spacing={2}
        columnSpacing={10}
        className={"h-100p d-top border-1 radius-2 shadow-2 px-4vw py-4vh"}
      >
        {/** info, features **/}
        <Grid size={(xxs || xs || sm) ? 12 : (md || lg || xl || xxl) ? 6 : 6}>
          <Grid container={true} spacing={2}>
            {OBJECT?.project_section?.filter((_: any, f: number) => f < 2)?.map((section: any, i: number) => (
              <Grid size={12} className={"d-col-left"} key={i}>
                <Div className={"fs-1-6rem fw-700 dark-navy mb-20px"}>
                  {section.project_section_title}
                  <Hr className={"w-100px bg-primary h-3px"} />
                </Div>
                {section.project_section_contents.map((contents: any, j: number) => (
                  <Div className={"w-100p d-col-left mb-30px"} key={j}>
                    <Div className={"d-row-center mb-10px"}>
                      <Div className={"fs-0-4rem fw-300 dark-navy mr-5px"}>
                        {'●'}
                      </Div>
                      <Div className={"fs-1-1rem fw-600 dark-navy"}>
                        {contents.project_contents_title}
                      </Div>
                    </Div>
                    <Div className={"d-row-center ml-10px"}>
                      {contents.project_contents_detail.map((detail: any, k: number) => (
                        (
                          contents.project_contents_title === "Url" ||
                          contents.project_contents_title === "Git1" ||
                          contents.project_contents_title === "Git2"
                        ) ? (
                          <Div className={"d-row-left mr-0px"} key={k}>
                            <Div
                              className={"fs-1-0rem fw-600 primary pointer-blue lh-2-0"}
															style={{
																textDecoration: "underline",
															}}
                              onClick={() => {
                                window.open(`https://${detail.project_detail_value}`, "_blank");
                              }}
                            >
                              {detail.project_detail_alt}
                            </Div>
                          </Div>
                        ) : (
                          <Div className={"d-row-left mr-0px"} key={k}>
                            <Div
                              key={k}
                              className={"fs-1-0rem fw-400 light-black lh-2-0"}
                              onClick={() => {
                              }}
                            >
                              {detail.project_detail_value}
                            </Div>
                          </Div>
                        )
                      ))}
                    </Div>
                  </Div>
                ))}
                {(xxs || xs || sm) && (<Hr className={"bg-light h-3px"} />)}
                {(md || lg || xl || xxl) && (i !== 1 && <Hr className={"bg-light h-3px"} />)}
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/** frontend, backend, server **/}
        <Grid size={(xxs || xs || sm) ? 12 : (md || lg || xl || xxl) ? 6 : 6}>
          <Grid container={true} spacing={2}>
            {OBJECT?.project_section?.filter((_: any, f: number) => f >= 2)?.map((section: any, i: number) => (
              <Grid size={12} className={"d-col-left"} key={i}>
                <Div className={"fs-1-6rem fw-700 dark-navy mb-20px"}>
                  {section.project_section_title}
                  <Hr className={"w-100px bg-primary h-3px"} />
                </Div>
                {section.project_section_contents.map((contents: any, j: number) => (
                  <Div className={"w-100p d-col-left mb-30px"} key={j}>
                    <Div className={"d-row-center mb-10px"}>
                      <Div className={"fs-0-4rem fw-300 dark-navy mr-5px"}>
                        {'●'}
                      </Div>
                      <Div className={"fs-1-1rem fw-600 dark-navy"}>
                        {contents.project_contents_title}
                      </Div>
                    </Div>
                    <Grid container={true} spacing={0} rowSpacing={2} className={"d-left ml-1vw"}>
                      {contents.project_contents_detail.map((detail: any, k: number) => (
                        <Grid
                          size={xxs ? 6 : xs ? 4 : sm ? 3 : md ? 4 : lg ? 4 : xl ? 3 : xxl ? 3 : 3}
                          className={"d-row-left"}
                          key={k}
                        >
                          <Img
                            max={20}
                            hover={true}
                            shadow={false}
                            border={false}
                            radius={false}
                            group={"icons"}
                            src={`${detail.project_detail_icon}.webp`}
                            className={"mr-5px"}
                          />
                          <Div className={"fs-1-0rem fw-400 light-black lh-2-0"}>
                            {detail.project_detail_value}
                          </Div>
                        </Grid>
                      ))}
                    </Grid>
                  </Div>
                ))}
                {i !== 3 && <Hr className={"bg-light h-3px"} />}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {projectNode()}
    </>
  );
};