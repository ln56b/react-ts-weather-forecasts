import { WeatherForecast } from "@/types/forecast";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

interface PrecipitationsChart {
  forecast: WeatherForecast[];
  isFuture: boolean;
  days: number;
}

export default function PrecipitationsChart({
  forecast,
  isFuture,
  days,
}: PrecipitationsChart) {
  let chartData = [...forecast]?.map((history: WeatherForecast) => ({
    date: history.forecast.forecastday[0].date,
    pp: history.forecast.forecastday[0].day.totalprecip_mm,
  }));

  if (!isFuture) {
    chartData = [...chartData].reverse();
  }

  const chartConfig = {
    pp: {
      label: "Precipitations (mm)",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  return (
    chartData && (
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Precipitations</CardTitle>
            <CardDescription>
              {isFuture
                ? `${days} days forecast ahead (in 2 weeks time)`
                : `Past ${days} days`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <YAxis tickLine={false} axisLine={true} />
                <XAxis
                  dataKey="date"
                  tickLine={true}
                  tickMargin={8}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(5)}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="pp" fill="var(--color-pp)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    )
  );
}
