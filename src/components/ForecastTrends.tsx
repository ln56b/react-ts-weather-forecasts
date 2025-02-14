import useFetchMultiple from "@/hooks/useFetchMultiple";
import { WeatherForecast } from "@/types/forecast";
import { generateFetchForecastUrl } from "@/utils/url-generator";
import { useMemo } from "react";
import TemperaturesLineChart from "./TempeaturesLineChart";

interface ForecastLineChartProps {
  location: string;
  isFuture: boolean;
  days: number;
}

export default function ForecastTrends({
  location,
  isFuture,
  days,
}: ForecastLineChartProps) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const route = isFuture ? "future" : "history";
  const baseUrl = `${apiUrl}${route}.json?key=${apiKey}&q=${location}`;

  const urls = useMemo(
    () => generateFetchForecastUrl(baseUrl, isFuture, days),
    [baseUrl, isFuture, days]
  );

  const { data, loading, error } = useFetchMultiple<WeatherForecast>(urls);

  return (
    <div>
      <h2 className="my-4 text-2xl font-semibold text-center">History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data?.length ? (
        <TemperaturesLineChart
          forecast={data}
          isFuture={isFuture}
          days={days}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
