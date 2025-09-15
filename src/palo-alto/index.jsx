import { Outlet } from "react-router";
import { SideNav } from "./SideNav";

function NavigationTimer() {
  return (
    <div className="flex h-[100vh] w-full p-4">
      <SideNav />
      <Outlet />
    </div>
  );
}

export default NavigationTimer;
