import FullPage from "@/components/FullPage";
import Logo from "@/components/Logo";
import Button from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const { login, isLoading, error } = useLogin();

  // useEffect(() => {
  //   // test login
  //   login({ email: "lebron@gmail.com", password: "password" });
  // }, [login]);

  return (
    <FullPage className="flex gap-5">
      <div>
        login form
        <Button
          onClick={() =>
            login({ email: "lebron@gmail.com", password: "password" })
          }
        >
          Button
        </Button>
      </div>
      <Link to="/home">Link</Link>
      <Logo />
    </FullPage>
  );
};

export default Login;
