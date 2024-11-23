// index.tsx

import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@assets/styles/Core.css";
import "@assets/styles/Mui.css";
import '@assets/styles/Components.css';

import {
  BrowserRouter, Routes, Route, createRoot,
  useEffect
} from '@importReacts';

import {
  CssBaseline, createTheme, ThemeProvider
} from '@importMuis';

import {
  useScrollTop, useEnhancedTouch, useStoreLoading
} from '@importHooks';

import {
  Loader, Footer, Toggle
} from '@importLayouts';

import {
  Main, Project1, Project2, Project3, Project4, Project5, Project6, Project7
} from '@importPages';

// -------------------------------------------------------------------------------------------------
const App = () => {

  const { setLOADING } = useStoreLoading();

  useEffect(() => {
    setLOADING(true);
  }, []);

  useScrollTop();
  useEnhancedTouch();

  return (
    <div className={"App"}>
      <Loader />
      <Routes>
        <Route path={"/*"} element={<Main />} />
        <Route path={"/projects/project1/*"} element={<Project1 />} />
        <Route path={"/projects/project2/*"} element={<Project2 />} />
        <Route path={"/projects/project3/*"} element={<Project3 />} />
        <Route path={"/projects/project4/*"} element={<Project4 />} />
        <Route path={"/projects/project5/*"} element={<Project5 />} />
        <Route path={"/projects/project6/*"} element={<Project6 />} />
        <Route path={"/projects/project7/*"} element={<Project7 />} />
      </Routes>
      <Toggle />
      <Footer />
    </div>
  );
};

// -------------------------------------------------------------------------------------------------
createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={"/JREACT"}>
    <ThemeProvider theme={
      createTheme({
        typography:{fontFamily:"Pretendard, Noto Sans KR, Roboto, sans-serif"}
      })
    }>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);