import { Outlet } from "react-router-dom";

import { MainNavigation } from "./MainNavigation";

export const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};
