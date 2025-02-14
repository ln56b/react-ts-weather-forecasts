import { FormFieldProps } from "../types/form";
import { Input } from "./ui/input";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  resetField,
  getValues,
  error,
  valueAsNumber,
  additionalProps,
}) => (
  <div className="relative">
    <Input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      {...additionalProps}
    />

    {getValues(name) && (
      <button
        type="button"
        onClick={() => resetField(name)}
        className="absolute right-3 top-2 text-[#1c73af]"
      >
        X
      </button>
    )}
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

export default FormField;
