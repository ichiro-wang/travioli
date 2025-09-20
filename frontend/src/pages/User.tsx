import { useGetMe } from "@/hooks/auth/useGetMe";
import { useSetDocumentTitle } from "@/hooks/custom/useSetDocumentTitle";

const User = () => {
  const { user } = useGetMe();
  useSetDocumentTitle(user?.username);

  return (
    <div className="flex justify-center items-center h-full">user page</div>
  );
};

export default User;
