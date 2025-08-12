import FullPage from "@/components/FullPage";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <FullPage className="flex gap-5">
      <div>
        login form <Button>Button</Button>
      </div>
      <Logo />
    </FullPage>
  );
};

export default Login;
