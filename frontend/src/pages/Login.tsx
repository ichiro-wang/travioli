import LoginForm from "@/components/auth/LoginForm";
import FullPage from "@/components/FullPage";
import Logo from "@/components/Logo";
import { useSetDocumentTitle } from "@/hooks/custom/useSetDocumentTitle";

const Login = () => {
  useSetDocumentTitle("Login");

  return (
    <FullPage className="flex gap-5">
      <LoginForm />
      <Logo />
    </FullPage>
  );
};

export default Login;
