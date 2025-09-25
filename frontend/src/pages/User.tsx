import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import { useSetDocumentTitle } from "@/hooks/custom/useSetDocumentTitle";

const User = () => {
  const { user } = useAuth();
  useSetDocumentTitle(user.username);

  return (
    <div className="flex justify-center items-center h-full">
      <Button type="submit" isLoading={true} className="min-w-20">
        hello
      </Button>
    </div>
  );
};

export default User;
