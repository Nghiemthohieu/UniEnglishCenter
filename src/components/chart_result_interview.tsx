"use client";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

// Dữ liệu mới: Tổng số Pass, Fail, Không tham gia
const chartData = [
  { result: "Pass", total: 400, fill: "#1b9c85" }, // Xanh lá
  { result: "Fail", total: 300, fill: "#d65b5b" }, // Đỏ
  { result: "KTG", total: 500, fill: "#878787" },  // Xám
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

export default function ChatResultInterview() {
    const currentMonth = new Date().getMonth() + 1;

    const [radius, setRadius] = useState(140); // Giá trị mặc định

    useEffect(() => {
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
        <CardTitle className="uppercase font-semibold text-[1.2rem]">Kết quả phỏng vấn Tháng {currentMonth}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full [&_.recharts-text]:fill-background"
        >
          <PieChart width={300} height={300}>
            <ChartTooltip content={<ChartTooltipContent nameKey="total" hideLabel />} />
            <Pie data={chartData} dataKey="total" nameKey="result" outerRadius={radius}>
              <LabelList
                dataKey="result"
                className="fill-background"
                stroke="none"
                fontSize={18}
                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
