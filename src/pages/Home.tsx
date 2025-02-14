import useFetch from "@/hooks/useFetch";
import LocationForm from "../components/LocationForm";
import { Forecast } from "../types/forecast";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrentWeather from "@/components/CurrentWeather";
import Astronomy from "@/components/Astronomy";
import History from "@/components/History";

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
              defaultValue="account"
              className="w-full p-4 mt-10 text-center"
            >
              <TabsList>
                <TabsTrigger value="astronomy">Astronomy</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="astronomy">
                <Astronomy astro={data.forecast.forecastday[0].astro} />
              </TabsContent>
              <TabsContent value="history">
                <History location={location} />
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
