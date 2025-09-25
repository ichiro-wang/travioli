import type { AuthLoginPostRequest, AuthSignupPostRequest } from "@/api";
import { useForm } from "react-hook-form";
import Form from "../Form";
import { onFormError } from "@/utils/onFormError";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ButtonGroup from "../ButtonGroup";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardErrorDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useLogin } from "@/hooks/auth/useLogin";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<AuthSignupPostRequest>();

  const onSubmit = ({ email, password }: AuthLoginPostRequest) => {
    login({ email, password });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardErrorDescription error={error?.response?.data.message} />
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit, onFormError)}>
          <Form.FormRow error={formErrors?.email?.message}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              disabled={isLoading}
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </Form.FormRow>

          <Form.FormRow error={formErrors?.password?.message}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              disabled={isLoading}
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be 8 or more characters",
                },
              })}
            />
          </Form.FormRow>

          <ButtonGroup className="">
            <Button type="submit" isLoading={isLoading} className="min-w-20">
              Log in
            </Button>
            <small>
              Don't have an account?{" "}
              <Button
                disabled={isLoading}
                variant="link"
                type="button"
                className="p-0"
              >
                <Link className="text-blue-600" to="/signup">
                  Sign up
                </Link>
              </Button>
            </small>
          </ButtonGroup>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
