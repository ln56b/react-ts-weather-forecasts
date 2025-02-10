import { FormFieldProps } from "../types/form";

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
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      {...additionalProps}
      className="px-4 py-2 text-[#1c73af] bg-white border-gray-400 w-76 rounded-3xl"
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
