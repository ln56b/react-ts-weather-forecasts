import { WeatherHistory } from "@/types/forecast";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

export default function HistoryBarChart({
  history,
}: {
  history: WeatherHistory[];
}) {
  const chartData = [...history]?.reverse().map((history: WeatherHistory) => ({
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
            <CardDescription>Past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={true}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(5)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="mintemp" fill="var(--color-mintemp)" radius={4} />
                <Bar dataKey="maxtemp" fill="var(--color-maxtemp)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    )
  );
}
