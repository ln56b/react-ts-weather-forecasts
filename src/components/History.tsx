import useFetchMultiple from "@/hooks/useFetchMultiple";
import { Forecast } from "@/types/forecast";
import { generateUrlForPast7Days } from "@/utils/url-generator";
import { useMemo } from "react";

export default function History({ location }: { location: string }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const baseUrl = `${apiUrl}history.json?key=${apiKey}&q=${location}`;
  const urls = useMemo(() => generateUrlForPast7Days(baseUrl), [baseUrl]);

  const { data, loading, error } = useFetchMultiple<Forecast>(urls);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data?.length ? (
        data.map((forecast, index) => (
          <div key={index}>
            <h2>{forecast.forecast.forecastday[0].date}</h2>
            <p>Max Temp: {forecast.forecast.forecastday[0].day.maxtemp_c}°C</p>
            <p>Min Temp: {forecast.forecast.forecastday[0].day.mintemp_c}°C</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
