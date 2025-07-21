"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { convertIDR } from "@/utils/currency";

// Month names
const monthNames = [
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

const chartConfig = {
  deposit: {
    label: "Deposit",
    color: "hsl(var(--chart-2))",
  },
  withdraw: {
    label: "Withdraw",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Define the ChartItem type
type ChartItem = {
  month: string;
  deposit: number;
  withdraw: number;
};

export function ChartAreaLegend({ transactions }: { transactions: any[] }) {
  // Group transactions by month
  const grouped: Record<string, ChartItem> = transactions.reduce((acc, tx) => {
    const date = new Date(tx.createdAt);
    const month = monthNames[date.getMonth()];

    if (!acc[month]) {
      acc[month] = { month, deposit: 0, withdraw: 0 };
    }

    if (tx.type === "deposit") {
      acc[month].deposit += tx.amount;
    } else if (tx.type === "withdraw") {
      acc[month].withdraw += tx.amount;
    }

    return acc;
  }, {} as Record<string, ChartItem>);

  // Now TypeScript knows each item has a `month`
  const chartData: ChartItem[] = Object.values(grouped).sort(
    (a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik</CardTitle>
        <CardDescription>
          Grafik deposit dan withdraw dalam beberapa bulan terakhir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
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
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value, name, item) => (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded"
                        style={{
                          backgroundColor: item.color || item.payload.fill,
                        }}
                      />
                      <span>
                        {name}: {convertIDR(value)}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Area
              dataKey="deposit"
              type="natural"
              fill="var(--color-deposit)"
              fillOpacity={0.4}
              stroke="var(--color-deposit)"
              stackId="a"
            />
            <Area
              dataKey="withdraw"
              type="natural"
              fill="var(--color-withdraw)"
              fillOpacity={0.4}
              stroke="var(--color-withdraw)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {chartData[0]?.month} - {chartData.at(-1)?.month} 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
