import { WeatherForecast } from "@/types/forecast";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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

interface ForecastLineChartProps {
  forecast: WeatherForecast[];
  isFuture: boolean;
  days: number;
}

export default function TemperaturesLineChart({
  forecast,
  isFuture,
  days,
}: ForecastLineChartProps) {
  const chartData = [...forecast]?.map((history: WeatherForecast) => ({
    date: history.forecast.forecastday[0].date,
    mintemp: history.forecast.forecastday[0].day.mintemp_c,
    maxtemp: history.forecast.forecastday[0].day.maxtemp_c,
  }));

  const chartConfig = {
    mintemp: {
      label: "Min C°",
      color: "var(--chart-2)",
    },
    maxtemp: {
      label: "Max C°",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    chartData && (
      <section>
        <Card>
          <CardHeader>
            <CardTitle>C° Temperatures </CardTitle>
            <CardDescription>
              {isFuture
                ? `${days} days forecast ahead (in 2 weeks time)`
                : `Past ${days} days`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
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
                <Line
                  dataKey="mintemp"
                  stroke="var(--color-mintemp)"
                  type="monotone"
                  strokeWidth={2}
                  dot={true}
                />
                <Line
                  dataKey="maxtemp"
                  stroke="var(--color-maxtemp)"
                  type="monotone"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    )
  );
}
