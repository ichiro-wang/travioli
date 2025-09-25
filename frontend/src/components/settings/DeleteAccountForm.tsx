import type { UsersMeDeleteRequest } from "@/api";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardErrorDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/utils/cn";
import Form from "../Form";
import { useDeactivateAccount } from "@/hooks/users/useDeactivateAccount";
import { onFormError } from "@/utils/onFormError";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  className?: string;
}

const DeleteAccountForm = ({ className }: Props) => {
  const { deactivateAccount, isLoading, error } = useDeactivateAccount();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<UsersMeDeleteRequest>();

  const onSubmit = (password: UsersMeDeleteRequest) => {
    deactivateAccount(password);
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Deactivate Account</CardTitle>
        <CardDescription>
          Enter password to confirm
          <br />
          Log back in to reactivate account
        </CardDescription>
        <CardErrorDescription error={error?.response?.data.message} />
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit, onFormError)}>
          <Form.FormRow error={formErrors?.password?.message}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              disabled={isLoading}
              type="password"
              placeholder="Password"
              {...register("password", { required: "Please enter password" })}
            />
          </Form.FormRow>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-fit min-w-20"
          >
            Confirm
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DeleteAccountForm;
