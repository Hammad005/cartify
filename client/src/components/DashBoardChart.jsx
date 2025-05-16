import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { orderStore } from "@/store/orderStore";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function DashBoardChart() {
  const { orders } = orderStore();

  // Initialize monthly totals (Jan to June)
  const monthlySales = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  // Process orders to sum sales per month (up to June)
  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const month = date.getMonth(); // 0 = Jan, 1 = Feb, ...
    const monthName = MONTH_NAMES[month];
    if (monthName in monthlySales) {
      monthlySales[monthName] += order.totalAmount;
    }
  });

  // Format chart data
  const chartData = MONTH_NAMES.map((month) => ({
    month,
    sales: monthlySales[month],
  }));

  const chartConfig = {
    sales: {
      label: "Sells",
      color: "oklch(0.646 0.222 41.116)",
    },
    month: {
      label: "Month",
      color: "oklch(0.274 0.006 286.033)",
    },
  };

  return (
    <>
      <Card className="h-[400px] md:w-4xl  w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-primary font-bold">
            Annual Sales Overview
            <TrendingUp className="mr-2 text-white" />
          </CardTitle>
          <CardDescription>
            <span className="text-muted-foreground">
              Performance summary for the past 12 months
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] w-full">
          <ChartContainer config={chartConfig} className={"h-full w-full"}>
            <LineChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="sales"
                type="monotone"
                stroke="var(--color-sales)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="month"
                type="monotone"
                stroke="var(--color-month)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2  leading-none text-muted-foreground">
            Visual representation of total sales over the past year{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
