import { FormFieldProps } from "../types/form";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  additionalProps,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      {...additionalProps}
      className="px-4 py-2 text-[#1c73af] bg-white border-gray-400 w-76 rounded-3xl"
    />
    {error && <p className="text-red-500">{error.message}</p>}
  </>
);

export default FormField;
