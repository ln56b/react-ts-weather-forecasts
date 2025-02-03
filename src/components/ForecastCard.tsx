import { Forecast } from "../models/models";

export default function ForecastCard({ forecast }: { forecast: Forecast }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 mx-auto ">
      <h1 className="text-3xl font-semibold ">{forecast.location.name}</h1>
      <p className="text-lg ">
        {forecast.location.region} - {forecast.location.country}
      </p>
      <p className=" text-md">{forecast.location.localtime}</p>
      <img className="h-auto w-50" src={forecast.current.condition.icon} />
      <p>{forecast.current.condition.text}</p>
    </div>
  );
}
