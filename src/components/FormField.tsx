import { FormFieldProps } from "../types/form";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className="p-2 border border-gray-400 rounded-lg"
    />
    {error && <p className="text-red-500">{error.message}</p>}
  </>
);

export default FormField;
