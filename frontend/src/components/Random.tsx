import { useGetMe } from "@/hooks/auth/useGetMe";
import { useEffect } from "react";

const Random = () => {
  const { isLoading } = useGetMe();

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  if (isLoading) {
    <div>loading............</div>;
  }

  return <div>random</div>;
};

export default Random;
