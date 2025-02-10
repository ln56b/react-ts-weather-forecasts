import { Astro } from "../types/forecast";
import AstroMetric from "./AstroMetric";

export interface AstroCardProps {
  astro: Astro;
}

export default function AstroCard({ astro }: AstroCardProps) {
  return (
    <>
      <h2 className="mt-4 text-2xl font-semibold text-center">Astronomy</h2>
      <div className="flex gap-1 items-center justify-center p-4 m-4 rounded-lg shadow-2xl bg-[#3796d7] flex-wrap">
        <AstroMetric metric={astro.sunrise} label="Sunrise" icon="" />
        <AstroMetric metric={astro.sunset} label="Sunset" icon="" />
        <AstroMetric metric={astro.moonrise} label="Moonrise" icon="" />
        <AstroMetric metric={astro.moonset} label="Moonset" icon="" />
        <AstroMetric metric={astro.moon_phase} label="Moon Phase" icon="" />
        <AstroMetric
          metric={astro.moon_illumination}
          label="Moon Illumination"
          icon=""
        />
      </div>
    </>
  );
}
