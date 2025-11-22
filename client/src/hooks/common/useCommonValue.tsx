// useCommonValue.tsx

import { useLocation, useNavigate } from "@exportReacts";

// -------------------------------------------------------------------------------------------------
export const useCommonValue = () => {

  // location
  const navigate: any = useNavigate();
  const location: any = useLocation();
  const location_id: string = location?.state?._id;
  const location_category: string = location?.state?.category;
  const PATH: string = location?.pathname;
  const firstStr: string = PATH?.split("/")[1] || "";
  const secondStr: string = PATH?.split("/")[2] || "";
  const thirdStr: string = PATH?.split("/")[3] || "";

  // env
  const TITLE: string = import.meta.env.VITE_APP_TITLE || "";
  const URL: string = import.meta.env.VITE_APP_SERVER_URL || "";
  const SUBFIX_KEY = `VITE_APP_${firstStr.toUpperCase()}_URL`;
  const SUBFIX: string = (import.meta.env as unknown as Record<string, string>)[SUBFIX_KEY] || "";
  const GCLOUD_URL: string = import.meta.env.VITE_APP_GCLOUD_URL || "";
	const PROJECTS_URL: string = import.meta.env.VITE_APP_PROJECTS_URL || "";
	const ABOUT_URL: string = import.meta.env.VITE_APP_ABOUT_URL || "";
	const SKILLS_URL: string = import.meta.env.VITE_APP_SKILLS_URL || "";
	const PORTFOLIOS_URL: string = import.meta.env.VITE_APP_PORTFOLIOS_URL || "";

	// -----------------------------------------------------------------------------------------------
	return {
		navigate,
		location,
		location_id,
		location_category,
		PATH,
		firstStr,
		secondStr,
		thirdStr,
		TITLE,
		URL,
		SUBFIX_KEY,
		SUBFIX,
		GCLOUD_URL,
		PROJECTS_URL,
		ABOUT_URL,
		SKILLS_URL,
		PORTFOLIOS_URL
	};
};