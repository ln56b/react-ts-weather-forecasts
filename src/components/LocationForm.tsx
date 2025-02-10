import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import { Location } from "../types/forecast";
import { FormData, LocationFormSchema } from "../types/form";
import FormField from "./FormField";

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

  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    Pick<Location, "id" | "name" | "region" | "country">[]
  >([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const url = search ? `${apiUrl}search.json?key=${apiKey}&q=${search}` : "";

  const { data, loading, error } = useFetch<Location[]>(url);

  const handleAutocomplete = async (searchTerm: string) => {
    if (!searchTerm) return;
    setSearch(searchTerm);

    if (!data?.length) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setSuggestions(
      data?.map((location) => ({
        id: location.id,
        name: location.name,
        region: location.region,
        country: location.country,
      })) || []
    );
    setShowDropdown(true);
  };

  const handleSelectSuggestion = (
    selectedLocation: Pick<Location, "id" | "name" | "region" | "country">
  ) => {
    setSearch(selectedLocation.name);
    setLocation(selectedLocation.name);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const onSubmit = async (data: FormData) => {
    setLocation(data.location);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <h1 className="mb-4 text-3xl font-bold text-center">Choose a location</h1>
      <div className="flex flex-wrap items-baseline justify-center gap-2 ">
        <div className="flex flex-col items-center justify-center gap-2 pt-2 mb-4 ">
          <FormField
            type="text"
            placeholder="Enter a City"
            name="location"
            register={register}
            error={errors.location}
            additionalProps={{
              value: search,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleAutocomplete(e.target.value),
            }}
          />
        </div>
        <button type="submit">
          <i className="text-xl cursor-pointer fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {showDropdown && (
        <div className="absolute z-10 mt-12 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-md shadow-lg top-1/2, left-1/2 w-76">
          <ul id="locations" className="divide-y divide-gray-300">
            {suggestions.map((location) => (
              <li
                key={location.id}
                className="px-4 py-2 text-[#1c73af] cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectSuggestion(location)}
              >
                {location.name}, {location.region}, {location.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
