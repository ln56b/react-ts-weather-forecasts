import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { FormData, LocationFormSchema } from "../types/form";
import { zodResolver } from "@hookform/resolvers/zod";

interface LocationFormProps {
  setLocation: (location: string) => void;
}

export default function LocationForm({ setLocation }: LocationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(LocationFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLocation(data.location);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 text-3xl font-bold text-center">Choose a location</h1>
      <div className="flex flex-wrap items-baseline justify-center gap-2">
        <div className="flex flex-col items-center justify-center gap-2 pt-2 mb-4 ">
          <FormField
            type="text"
            placeholder="Enter a City"
            name="location"
            register={register}
            error={errors.location}
          />
        </div>
        <button type="submit">
          <i className="text-xl cursor-pointer fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}
