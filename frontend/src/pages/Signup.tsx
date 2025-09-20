import SignupForm from "@/components/auth/SignupForm";
import FullPage from "@/components/FullPage";
import Logo from "@/components/Logo";
import { useSetDocumentTitle } from "@/hooks/custom/useSetDocumentTitle";

const Signup = () => {
  useSetDocumentTitle("Signup");

  return (
    <FullPage className="flex gap-5 bg-[url(/travioli-signup.webp)] bg-cover">
      <Logo />
      <SignupForm />
    </FullPage>
  );
};

export default Signup;
