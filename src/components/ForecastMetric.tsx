export default function ForecastMetric({
  metric,
  unit,
  label,
  icon,
}: {
  metric: number;
  unit: string;
  label: string;
  icon: string;
}) {
  return (
    <>
      <div className="flex items-center justify-around w-full py-2 my-1 bg-[#3796d7] rounded-lg">
        <i className={`text-3xl fa-solid ${icon}`}></i>

        <div className="flex flex-col items-end">
          <p className="text-2xl text-amber-500">
            {metric} {unit}
          </p>
          <p className="text-sm">{label}</p>
        </div>
      </div>
    </>
  );
}
