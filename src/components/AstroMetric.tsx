export default function AstroMetric({
  metric,
  label,
  icon,
}: {
  metric: string;
  label: string;
  icon: string;
}) {
  return (
    <>
      <div className="flex items-center justify-around w-[200px] p-2 my-1 bg-[#1c73af] rounded-lg">
        <i className={`text-3xl fa-solid ${icon}`}></i>

        <div className="flex flex-col items-end">
          <p className="text-xl text-amber-500">{metric}</p>
          <p className="text-sm">{label}</p>
        </div>
      </div>
    </>
  );
}
