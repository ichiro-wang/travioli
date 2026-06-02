import FullPage from "@/components/FullPage";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useSetDocumentTitle } from "@/hooks/custom/useSetDocumentTitle";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const { user } = useAuth();
  useSetDocumentTitle(`@${user.username}`);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <FullPage className="flex h-full flex-1 flex-col justify-start gap-5 pt-8">
        <Outlet />
      </FullPage>
    </div>
  );
};

export default AppLayout;
