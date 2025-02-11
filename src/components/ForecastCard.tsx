import { Forecast } from "../types/forecast";
import ForecastMetric from "./ForecastMetric";

export default function ForecastCard({ forecast }: { forecast: Forecast }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 mx-auto rounded-lg shadow-2xl bg-[#1c73af]  w-[30rem]">
        <h1 className="text-3xl font-semibold ">{forecast.location.name}</h1>
        <p className="text-lg ">
          {forecast.location.region} - {forecast.location.country}
        </p>
        <p className=" text-md">{forecast.location.localtime}</p>
        <img className="w-20 h-auto" src={forecast.current.condition.icon} />
      </div>

      <div className="flex flex-col items-center justify-center p-4 my-2 mx-auto rounded-lg shadow-2xl bg-[#1c73af] w-[30rem]">
        <ForecastMetric
          metric={forecast.current.temp_c}
          unit={"°C"}
          label="Temperature"
          icon="fa-temperature-three-quarters"
        />

        <ForecastMetric
          metric={forecast.current.wind_kph}
          unit={"kph"}
          label="Wind"
          icon="fa-wind"
        />

        <ForecastMetric
          metric={forecast.current.humidity}
          unit={"%"}
          label="Humidity"
          icon="fa-cloud-rain"
        />
      </div>
    </>
  );
}
