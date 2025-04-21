"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts"; // 👈 THÊM Cell
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CountInterviewHuman } from "@/JSON/interview";
import { fetchCountHumanInterViews } from "@/lib/interview/count_interview_human";

const getDistinctShades = (count: number) => {
  const baseHue = 220;
  const saturation = 70;
  const minLightness = 40;
  const maxLightness = 80;
  const step = (maxLightness - minLightness) / Math.max(1, count - 1);

  return Array.from({ length: count }, (_, i) =>
    `hsl(${baseHue}, ${saturation}%, ${minLightness + i * step}%)`
  );
};

export function ChatInterview() {
  const [chartData, setChartData] = React.useState<CountInterviewHuman[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [radius, setRadius] = React.useState(140);
  const now = new Date();
  const currentMonth1 = now.getMonth() + 1; // vẫn là số từ 1–12
  const currentYear = now.getFullYear();

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const backendData: any = await fetchCountHumanInterViews(2, currentYear, currentMonth1);
        const data = backendData.data;

        const colors = getDistinctShades(data.length);
        const dataWithColor = data.map((item: CountInterviewHuman, index: number) => ({
          ...item,
          fill: colors[index],
        }));

        setChartData(dataWithColor);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.Total, 0);
  }, [chartData]);

  const chartConfig: ChartConfig = chartData.reduce((acc, item) => {
    acc[item.Name] = { label: `${item.IDHuman}-${item.Name}: `, color: item.fill };
    return acc;
  }, {} as ChartConfig);

  const currentMonth = new Date().getMonth() + 1;

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setRadius(150);
      else if (window.innerWidth < 768) setRadius(100);
      else if (window.innerWidth < 1024) setRadius(200);
      else if (window.innerWidth < 1280) setRadius(100);
      else setRadius(140);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="flex flex-col shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] min-h-[400px] w-full hover:shadow-none">
      <CardHeader className="items-center pb-0 flex justify-center">
        <CardTitle className="uppercase font-semibold text-[1.2rem]">
          Data phỏng vấn tháng {currentMonth}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 w-full">
        {loading ? (
          <div className="mx-auto h-full w-full max-w-sm rounded-md border border-blue-300 p-4">
            <div className="flex animate-pulse space-x-4">
              <div className="size-10 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 rounded bg-gray-200"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                  </div>
                  <div className="h-2 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full">
            <PieChart width={350} height={350}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="Total"
                nameKey="Name"
                innerRadius={80}
                outerRadius={radius}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} /> // 👈 Dùng Cell để tô màu
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-[1.2rem]"
                          >
                            Data
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="text-center text-muted-foreground py-4">Không có dữ liệu</div>
        )}
      </CardContent>
    </Card>
  );
}
