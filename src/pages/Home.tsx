import ForecastCard from "../components/ForecastCard";
import useFetch from "../hooks/useFetch";
import { Forecast } from "../models/models";

export default function Home() {
  const userInput = "toulouse"; // TODO get user input
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { data, loading, error } = useFetch<Forecast>(
    `${apiUrl}?key=${apiKey}&q=${userInput}`
  );
  return (
    <div>
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
