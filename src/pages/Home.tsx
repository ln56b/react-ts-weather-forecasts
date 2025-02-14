import useFetch from "@/hooks/useFetch";
import AstroCard from "../components/AstroCard";
import ForecastCard from "../components/ForecastCard";
import LocationForm from "../components/LocationForm";
import { Forecast } from "../types/forecast";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <ForecastCard forecast={data} />

            <Tabs
              defaultValue="account"
              className="w-full p-4 mt-10 text-center"
            >
              <TabsList>
                <TabsTrigger value="account">Astronomy</TabsTrigger>
                <TabsTrigger value="password">Forecast</TabsTrigger>
                <TabsTrigger value="password">History</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <AstroCard astro={data.forecast.forecastday[0].astro} />
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
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
