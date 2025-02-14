import Astronomy from "@/components/Astronomy";
import CurrentWeather from "@/components/CurrentWeather";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import LocationForm from "@/components/LocationForm";
import { Forecast } from "@/types/forecast";
import ForecastTrends from "@/components/ForecastTrends";

export default function Home() {
  const [location, setLocation] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const isValidLocation = (location: string): boolean => {
    return /^[a-zA-Z\s]*$/.test(location);
  };
  const url =
    location && isValidLocation(location)
      ? `${apiUrl}forecast.json?key=${apiKey}&q=${location}`
      : "";

  const { data, loading, error } = useFetch<Forecast>(url);

  return (
    <div>
      <LocationForm location={location} setLocation={setLocation} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        data && (
          <>
            <CurrentWeather forecast={data} />

            <Tabs
              defaultValue="astronomy"
              className="w-full p-4 mt-10 text-center"
            >
              <TabsList className="px-4 m-4">
                <TabsTrigger value="astronomy">Astronomy</TabsTrigger>
                <TabsTrigger value="future">Future</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="astronomy">
                <Astronomy astro={data.forecast.forecastday[0].astro} />
              </TabsContent>
              <TabsContent value="future">
                <ForecastTrends location={location} isFuture={true} days={7} />
              </TabsContent>
              <TabsContent value="history">
                <ForecastTrends location={location} isFuture={false} days={7} />
              </TabsContent>
            </Tabs>
          </>
        )
      )}
      {!location && (
        <h1 className="mt-10 text-lg italic text-center text-gray-200">
          Start by entering a city
        </h1>
      )}
    </div>
  );
}
