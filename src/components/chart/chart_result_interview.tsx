"use client";
import { PieChart, Pie, LabelList } from "recharts";
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
} from "@/components/ui/chart";
import React, { useEffect, useState } from "react";
import { CountInterviewResult } from "@/JSON/interview";
import { fetchCountResultInterViews } from "@/lib/interview/count_interview_result";

export default function ChatResultInterview() {
  const currentMonth = new Date().getMonth() + 1;
  const [chartDataAll, setChartDataAll] = React.useState<CountInterviewResult[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [radius, setRadius] = useState(140); // Giá trị mặc định
  const now = new Date();
  const currentMonth1 = now.getMonth() + 1; // vẫn là số từ 1–12
  const currentYear = now.getFullYear();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const backendData: any = await fetchCountResultInterViews(2,currentYear, currentMonth1);
        const data = backendData.data;

        setChartDataAll(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const chartData = [
    {
      result: "Pass",
      total: chartDataAll.find((d) => d.result === "Pass")?.count || 0,
      fill: "#1b9c85",
    },
    {
      result: "Fail",
      total: chartDataAll.find((d) => d.result === "Fail")?.count || 0,
      fill: "#d65b5b",
    },
    {
      result: "KTG",
      total: chartDataAll.find((d) => d.result === "KTG")?.count || 0,
      fill: "#878787",
    },
  ];

  const chartConfig = {
    total: {
      label: "Tổng số",
    },
    Pass: {
      label: "Pass",
      color: "#1b9c85",
    },
    Fail: {
      label: "Fail",
      color: "#d65b5b",
    },
    KTG: {
      label: "KTG",
      color: "#878787",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setRadius(150); // sm
      else if (window.innerWidth < 768) setRadius(100); // md
      else if (window.innerWidth < 1024) setRadius(200); // lg
      else if (window.innerWidth < 1280) setRadius(100); // xl
      else setRadius(140); // xl trở lên
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi lần đầu để set đúng kích thước

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="flex flex-col shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] min-h-[400px] w-full hover:shadow-none">
      <CardHeader className="items-center pb-0 flex justify-center">
        <CardTitle className="uppercase font-semibold text-[1.2rem]">
          Kết quả phỏng vấn Tháng {currentMonth}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full [&_.recharts-text]:fill-background"
        >
          <PieChart width={300} height={300}>
            <ChartTooltip
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null;
                const item = payload[0];
                return (
                  <div className="p-2 bg-white border rounded shadow flex items-center gap-1 text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-semibold">: {item.value}</span>
                  </div>
                );
              }}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="result"
              outerRadius={radius}
            >
              <LabelList
                dataKey="result"
                className="fill-background"
                stroke="none"
                fontSize={18}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
