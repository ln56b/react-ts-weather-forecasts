import { Astro } from "../types/forecast";
import AstroMetric from "./AstroMetric";

export interface AstronomyProps {
  astro: Astro;
}

export default function Astronomy({ astro }: AstronomyProps) {
  return (
    <section className="flex flex-col items-center justify-center">
      <h2 className="mt-4 text-2xl font-semibold text-center">Astronomy</h2>
      <div className="flex gap-1 items-center justify-center p-4 m-4 rounded-lg shadow-2xl bg-[#3796d7] lg:max-w-3/5 flex-wrap">
        <AstroMetric
          metric={astro.sunrise}
          label="Sunrise"
          icon="src/assets/sunrise.png"
        />
        <AstroMetric
          metric={astro.sunset}
          label="Sunset"
          icon="src/assets/sunset.png"
        />
        <AstroMetric
          metric={astro.moonrise}
          label="Moonrise"
          icon="src/assets/moonrise.png"
        />
        <AstroMetric
          metric={astro.moonset}
          label="Moonset"
          icon="src/assets/moonset.png"
        />
        <AstroMetric
          metric={astro.moon_phase}
          label="Moon Phase"
          icon="src/assets/moon.png"
        />
        <AstroMetric
          metric={astro.moon_illumination}
          label="Moon Illumination"
          icon="src/assets/moon_illumination.png"
        />
      </div>
    </section>
  );
}
