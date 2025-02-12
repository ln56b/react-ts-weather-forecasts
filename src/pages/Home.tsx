import AstroCard from "../components/AstroCard";
import ForecastCard from "../components/ForecastCard";
import LocationForm from "../components/LocationForm";
import { Forecast } from "../types/forecast";

interface HomeProps {
  location: string;
  setLocation: (location: string) => void;
  loading: boolean;
  error: Error | null;
  data: Forecast | null;
}

export default function Home({
  location,
  setLocation,
  loading,
  error,
  data,
}: HomeProps) {
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
            <AstroCard astro={data.forecast.forecastday[0].astro} />
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
