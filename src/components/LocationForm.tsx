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
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 mb-4">
        <FormField
          type="text"
          placeholder="Location"
          name="location"
          register={register}
          error={errors.location}
        />
        <button type="submit" className="p-2 text-white bg-blue-600 rounded-lg">
          Submit
        </button>
      </div>
    </form>
  );
}
