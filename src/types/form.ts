import {
  FieldError,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
  location: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  resetField: UseFormResetField<FormData>;
  getValues: UseFormGetValues<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  additionalProps?: Record<string, unknown>;
};

export type ValidFieldNames = "location";

export const LocationFormSchema: ZodType<FormData> = z.object({
  location: z
    .string({
      required_error: "Location is required",
      invalid_type_error: "Location must be a string",
    })
    .nonempty(),
});
