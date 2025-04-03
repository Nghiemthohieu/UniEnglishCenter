"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
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

const getDistinctShades = (count: number) => {
  const baseHue = 220; // Màu xanh dương làm chủ đạo
  const saturation = 70; // Độ bão hòa cố định
  const minLightness = 40;
  const maxLightness = 80;
  const step = (maxLightness - minLightness) / count; // Chia khoảng sáng đều nhau

  return Array.from({ length: count }, (_, i) => 
    `hsl(${baseHue}, ${saturation}%, ${minLightness + i * step}%)`
  );
};

export function ChatInterview() {
  const [chartData, setChartData] = React.useState<{ browser: string; visitors: number; fill: string }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [canRenderChart, setCanRenderChart] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      const backendData = [
        { browser: "chrome", visitors: 275 },
        { browser: "safari", visitors: 200 },
        { browser: "firefox", visitors: 287 },
        { browser: "edge", visitors: 173 },
        { browser: "other", visitors: 190 },
      ];

      const distinctColors = getDistinctShades(backendData.length); // Lấy danh sách màu khác nhau

      const updatedData = backendData.map((item, index) => ({
        ...item,
        fill: distinctColors[index], // Gán màu sắc riêng biệt
      }));

      setChartData(updatedData);
      setLoading(false);
      setCanRenderChart(true); // Đảm bảo render đúng
    }, 1000);
  }, []);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  const chartConfig: ChartConfig = chartData.reduce((acc, item) => {
    acc[item.browser] = { label: item.browser, color: item.fill };
    return acc;
  }, {} as ChartConfig);

  const currentMonth = new Date().getMonth() + 1;

  const [radius, setRadius] = React.useState(140); // Giá trị mặc định
  
    React.useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) setRadius(150);  // sm
        else if (window.innerWidth < 768) setRadius(100); // md
        else if (window.innerWidth < 1024) setRadius(200); // lg
        else if (window.innerWidth < 1280) setRadius(100); // xl
        else setRadius(140);  // xl trở lên
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Gọi lần đầu để set đúng kích thước

      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <Card className="flex flex-col shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] min-h-[400px] w-full hover:shadow-none">
      <CardHeader className="items-center pb-0 flex justify-center">
        <CardTitle className="uppercase font-semibold text-[1.2rem]">Data phỏng vấn tháng {currentMonth}</CardTitle>
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
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full">
            {canRenderChart ? (
              <PieChart width={350} height={350}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={80} outerRadius={radius} strokeWidth={5}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle" >
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
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
                    }}
                  />
                </Pie>
              </PieChart>
            ) : (
              <div></div>
            )}
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
