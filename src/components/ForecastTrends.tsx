import useFetchMultiple from "@/hooks/useFetchMultiple";
import { WeatherForecast } from "@/types/forecast";
import { generateFetchForecastUrl } from "@/utils/url-generator";
import { useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import TemperaturesChart from "./TemperaturesChart";
import PrecipitationsChart from "./PrecipitationsChart";

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
    <div className="flex flex-col items-center justify-center">
      <h2 className="my-4 text-2xl font-semibold text-center">
        {isFuture ? "Future" : "History"}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data?.length ? (
        <Carousel className="w-full max-w-lg">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center">
                    <TemperaturesChart
                      forecast={data}
                      isFuture={isFuture}
                      days={days}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center">
                    <PrecipitationsChart
                      forecast={data}
                      isFuture={isFuture}
                      days={days}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
