import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/auth/useLogout";

const LogoutButton = () => {
  const { logout, isLoading } = useLogout();

  return (
    <Button
      variant="link"
      type="button"
      size="logout"
      disabled={isLoading}
      className="flex-row items-center justify-start w-full"
      onClick={() => logout()}
    >
      <LogOut />
      Log out
    </Button>
  );
};

export default LogoutButton;
