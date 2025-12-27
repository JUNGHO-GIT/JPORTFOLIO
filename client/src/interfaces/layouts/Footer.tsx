/**
 * @file Footer.tsx
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { useState, useEffect, memo } from "@exportReacts";
import { useCommonValue, useResponsive } from "@exportHooks";
import { axios } from "@exportLibs";
import { Div, Img, Grid, Paper } from "@exportComponents";

// -------------------------------------------------------------------------------------------------
export const Footer = memo(() => {

	// 0. common -------------------------------------------------------------------------------------
	const { URL } = useCommonValue();
	const {
		xxs, xs, sm, md, lg, xl, xxl
	} = useResponsive();

	// 2-1. useState ---------------------------------------------------------------------------------
	const [OBJECT, setOBJECT] = useState<any>({
		name: `JUNGHO`,
		year: new Date().getFullYear(),
		version: ``,
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
		.catch((error: any) => {
			console.error(error);
		});
	}, []);

	// 7. footer -------------------------------------------------------------------------------------
	const footerNode = () => (
		<Paper className={`layout-wrapper bg-darkest-navy shadow-top-4 border-0 radius-0 mt-40px`}>
			<Grid container={true} spacing={0}>
				<Grid className={`d-row-center`} size={12}>
					<Img
						hover={true}
						shadow={false}
						radius={false}
						border={false}
						src={`logo.webp`}
						group={`main`}
						className={`w-40px h-40px radius-50 mr-15px`}
					/>
					<Div className={`fs-1-0rem fw-500 white mr-15px`}>
						{OBJECT?.year}
					</Div>
					<Div className={`fs-1-2rem fw-700 white mr-15px`}>
						{OBJECT?.name}
					</Div>
					<Div className={`fs-0-7rem fw-400 light mt-5px`}>
						{OBJECT?.version}
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
