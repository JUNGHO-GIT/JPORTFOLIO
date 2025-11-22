// useCommonValue.tsx

import { useLocation, useNavigate } from "@exportReacts";

// -------------------------------------------------------------------------------------------------
export const useCommonValue = () => {

  // -----------------------------------------------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const PATH = location.pathname;
  const pathParts = PATH.split("/");

  // -----------------------------------------------------------------------------------------------
  return {
    navigate,
    location,
    location_id: location?.state?.id,
    location_category: location?.state?.category,
    PATH,
    firstStr: pathParts[1] || "",
    secondStr: pathParts[2] || "",
    thirdStr: pathParts[3] || "",
    TITLE: import.meta.env.VITE_APP_TITLE || "",
    URL: import.meta.env.VITE_APP_SERVER_URL || "",
    SUBFIX: import.meta.env[`VITE_APP_${pathParts[1]?.toUpperCase()}_URL`] || "",
    GCLOUD_URL: import.meta.env.VITE_APP_GCLOUD_URL || "",
    PROJECTS_URL: import.meta.env.VITE_APP_PROJECTS_URL || "",
    ABOUT_URL: import.meta.env.VITE_APP_ABOUT_URL || "",
    SKILLS_URL: import.meta.env.VITE_APP_SKILLS_URL || "",
    PORTFOLIOS_URL: import.meta.env.VITE_APP_PORTFOLIOS_URL || "",
  };
};