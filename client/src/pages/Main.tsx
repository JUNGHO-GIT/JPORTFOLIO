// Main.jsx

import { useEffect, memo } from "@exportReacts";
import { useStoreLoading } from "@exportStores";
import { About, Hero, Portfolios, Skills } from "@exportPages";
import { Br } from "@exportComponents";

// -------------------------------------------------------------------------------------------------
export const Main = memo(() => {

  // 0. common -------------------------------------------------------------------------------------
  const { setLOADING } = useStoreLoading();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    setTimeout(() => {
      setLOADING(false);
    }, 500);
  }, []);

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      <Hero />
      <Br className={"my-3vh"} />
      <About />
      <Br className={"my-3vh"} />
      <Skills />
      <Br className={"my-3vh"} />
      <Portfolios />
    </>
  );
});