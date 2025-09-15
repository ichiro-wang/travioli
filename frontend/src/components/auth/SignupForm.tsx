import type { AuthSignupPostRequest } from "@/api";
import { useSignup } from "@/hooks/auth/useSignup";
import { useForm } from "react-hook-form";
import Form from "../Form";
import { onFormError } from "@/utils/onFormError";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ButtonGroup from "../ButtonGroup";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const SignupForm = () => {
  const { signup, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: formErrors },
  } = useForm<AuthSignupPostRequest>();

  const onSubmit = ({
    username,
    email,
    password,
    confirmPassword,
  }: AuthSignupPostRequest) => {
    signup({ username, email, password, confirmPassword });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form className="gap-3" onSubmit={handleSubmit(onSubmit, onFormError)}>
          <Form.FormRow
            className="grid gap-2"
            error={formErrors?.email?.message}
          >
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              disabled={isLoading}
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </Form.FormRow>

          <Form.FormRow
            className="grid gap-2"
            error={formErrors?.username?.message}
          >
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              disabled={isLoading}
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required.",
                minLength: {
                  value: 3,
                  message: "Must be 3 or more characters.",
                },
                maxLength: {
                  value: 30,
                  message: "Must be 30 or less characters.",
                },
                pattern: {
                  value: /^(?!_+$)[a-z0-9_]+$/,
                  message:
                    "Provide a valid username with letters, numbers, and underscores. Must not start with underscore.",
                },
              })}
            />
          </Form.FormRow>

          <Form.FormRow
            className="grid gap-2"
            error={formErrors?.password?.message}
          >
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

          <Form.FormRow
            className="grid gap-2"
            error={formErrors?.confirmPassword?.message}
          >
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              disabled={isLoading}
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (confirmPassword) =>
                  confirmPassword === getValues().password ||
                  "Passwords must match",
              })}
            />
          </Form.FormRow>

          <ButtonGroup className="">
            <Button type="submit" disabled={isLoading}>
              Sign up
            </Button>
            <small>
              Have an account?{" "}
              <Button
                disabled={isLoading}
                variant="link"
                type="button"
                className="p-0"
              >
                <a href="/login">Log in</a>
              </Button>
            </small>
          </ButtonGroup>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
