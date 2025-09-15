import type { FieldErrors, FieldValues } from "react-hook-form";

export const onFormError = <T extends FieldValues>(
  errors: FieldErrors<T>
): void => {
  Object.values(errors).map((error) => {
    console.log(error?.message);
  });
};
