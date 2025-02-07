import { useState } from "react";
import ForecastCard from "../components/ForecastCard";
import useFetch from "../hooks/useFetch";
import LocationForm from "../components/LocationForm";
import { Forecast } from "../types/forecast";

export default function Home() {
  const [location, setLocation] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const isValidLocation = (location: string): boolean => {
    return /^[a-zA-Z\s]*$/.test(location);
  };
  const url =
    location && isValidLocation(location)
      ? `${apiUrl}?key=${apiKey}&q=${location}`
      : "";

  const { data, loading, error } = useFetch<Forecast>(url);

  return (
    <div>
      <LocationForm setLocation={setLocation} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        data && <ForecastCard forecast={data} />
      )}
    </div>
  );
}
