interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_SERVER_URL: string;
  readonly VITE_APP_GCLOUD_URL: string;
  readonly VITE_APP_ADMIN_URL: string;
  readonly VITE_APP_ABOUT_URL: string;
  readonly VITE_APP_SKILLS_URL: string;
  readonly VITE_APP_PORTFOLIOS_URL: string;
  readonly VITE_APP_PROJECTS_URL: string;
  readonly VITE_APP_PUBLIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
