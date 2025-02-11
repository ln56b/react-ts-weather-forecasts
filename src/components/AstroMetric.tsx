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
        <img src={icon} className="w-20 h-auto px-1" />

        <div className="flex flex-col items-end">
          <p className="text-xl text-amber-500">{metric}</p>
          <p className="text-sm">{label}</p>
        </div>
      </div>
    </>
  );
}
