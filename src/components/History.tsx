import useFetchMultiple from "@/hooks/useFetchMultiple";
import { Forecast } from "@/types/forecast";
import { generateUrlForPast7Days } from "@/utils/url-generator";
import { useMemo } from "react";
import HistoryBarChart from "./HistoryBarChart";

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
        <HistoryBarChart history={data} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
