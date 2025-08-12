import FullPage from "@/components/FullPage";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const Signup = () => {
  return (
    <FullPage className="flex gap-5">
      <Logo />
      <div>
        signup form <Button>Button</Button>
      </div>
    </FullPage>
  );
};

export default Signup;
