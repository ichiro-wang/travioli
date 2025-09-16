import FullPage from "@/components/FullPage";
import { Button } from "@/components/ui/button";
import { useRefresh } from "@/hooks/auth/useRefresh";

const Home = () => {
  const { refresh, isLoading, error } = useRefresh();
  return (
    <FullPage>
      <Button onClick={() => refresh()} disabled={isLoading}>
        refresh token
      </Button>
    </FullPage>
  );
};

export default Home;
