import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex-col">
      <div>Navbar</div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
