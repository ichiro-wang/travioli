import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardErrorDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import type { UsersMePatchRequest } from "@/api";
import { useUpdateProfile } from "@/hooks/users/useUpdateProfile";
import Form from "../Form";
import { onFormError } from "@/utils/onFormError";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";

interface Props {
  className?: string;
}

const UpdateProfileForm = ({ className }: Props) => {
  const { user } = useAuth();
  const { updateProfile, isLoading, error } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<UsersMePatchRequest>();

  const onSubmit = (payload: UsersMePatchRequest) => {
    updateProfile(payload);
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardErrorDescription error={error?.response?.data.message} />
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit, onFormError)}>
          <Form.FormRow error={formErrors?.username?.message}>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              disabled={isLoading}
              type="text"
              placeholder="Username"
              defaultValue={user.username}
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

          <Form.FormRow error={formErrors?.name?.message}>
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              disabled={isLoading}
              type="text"
              placeholder="Name"
              defaultValue={user.name || ""}
              {...register("name")}
            />
          </Form.FormRow>

          <Form.FormRow error={formErrors?.bio?.message}>
            <Label htmlFor="bio">Bio (optional)</Label>
            <Input
              id="bio"
              disabled={isLoading}
              type="text"
              placeholder="Bio"
              defaultValue={user.bio || ""}
              {...register("bio")}
            />
          </Form.FormRow>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-fit min-w-20"
          >
            Update
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateProfileForm;
