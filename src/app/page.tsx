'use client'

import { ChatInterview } from "@/components/chart/chart_data_interview";
import ChatResultInterview from "@/components/chart/chart_result_interview";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react";
import { CountDateInterView } from "@/lib/interview/count_date_interview";
import { CountDateInterviewIn, CountDateInterviewOut } from "@/JSON/interview";
import { DsTotalHuman } from "@/JSON/ds";
import { getDSTatolHuman } from "@/lib/ds/ds_total_human";
import { getCountHumanTeam } from "@/lib/human/counthumanTeam";
// import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

function formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');     // "11"
  const month = String(date.getMonth() + 1).padStart(2, '0'); // "04"
  const year = date.getFullYear(); // "2025"
  return `${day}/${month}/${year}`;
}

export default function Home() {
  // const {user} = useAuth()
  // console.log("user",user)
  // if (!user){
  //   redirect("/login");
  // }
  const [CountDateInter, setCountDateInter] = React.useState<CountDateInterviewOut[]>([])
  const [dsTotalHuman, setDsTotalHuman] = React.useState<DsTotalHuman>()
  const [numberTeam, setNumberTeam] = React.useState<DsTotalHuman>()
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const today = new Date("2025-04-11");
  const formatDS = (value: number): string => {
    if (value >= 1_000_000_000) {
      const formatted = (value / 1_000_000_000).toFixed(3).replace(/\.?0+$/, "");  
      return `${formatted}tỉ`;
    }
    else if (value >= 1_000_000) {
      const formatted = (value / 1_000_000).toFixed(3).replace(/\.?0+$/, "");  
      return `${formatted}tr`;
    } else if (value >= 1_000) {
      const formatted = (value / 1_000).toFixed(3).replace(/\.?0+$/, "");
      return `${formatted}k`;
    }
    return value.toString();
  };
  const formattedTotalSales = formatDS(dsTotalHuman?.total_sales || 0);

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const dataCount: CountDateInterviewIn = {
          id: 1,
          date: formatDateToDDMMYYYY(today),
        }
        const customerSource: any = await CountDateInterView(dataCount); // không khuyến khích nhưng hợp lệ
        const data = customerSource.data;
        setCountDateInter(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);   
      }
    };

    fetchdata();
  }, []);

  React.useEffect(() => {
      const fetchdata = async () => {
        try {
          const customerSource: any = await getDSTatolHuman(1,currentYear,currentMonth); // không khuyến khích nhưng hợp lệ
          const data = customerSource.data;
          setDsTotalHuman(data);
        } catch (error) {
          console.error('Failed to fetch data:', error);   
        }
      };
  
      fetchdata();
    }, []);

    React.useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⚠️ Chưa có token → chưa gọi API getCountHumanTeam");
        return; // không gọi API khi chưa có token
      }
    
      const fetchdata = async () => {
        try {
          const customerSource: any = await getCountHumanTeam(1);
          const data = customerSource.data;
          setNumberTeam(data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
    
      fetchdata();
    }, []);
    

  const datalist = [
    { item: `Doanh số tháng ${currentMonth}`, title: `${formattedTotalSales}` },
    { item: `Tổng nhân sự`, title: `2` },
    { item: `Lịch phỏng vấn`, title: `${CountDateInter[0]?.count}` },
  ];

  const chartData = [
    { name: "Nghiêm Thọ Hiếu", DS: 300000000},
    { name: "Vũ Đức Minh", DS: 305000000},
    { name: "Trần Hải Ngân", DS: 237000000},
    { name: "Nguyễn Thị Phương Hoa", DS: 73000000},
    { name: "Lê Vũ Phương Hoa", DS: 209000000},
    { name: "Nguyễn Tuấn Anh", DS: 214000000},
    { name: "Phạm Thanh Phương", DS: 300000000},
    { name: "Tạ Kim Ngân", DS: 305000000},
    { name: "Hoàng Thị Dịu", DS: 237000000},
    { name: "Du Thanh Hoa", DS: 73000000},
    { name: "Vũ Văn Chiều", DS: 209000000},
    { name: "Nguyễn Phương Anh", DS: 214000000},
    { name: "Nguyễn Thu Ngân", DS: 300000000},
    { name: "Nguyễn Thị Cẩm Ly", DS: 305000000},
    { name: "Nguyễn Thị Phương", DS: 237000000},
    { name: "La Thị Hảo", DS: 73000000},
    { name: "Đặng Quốc Việt", DS: 209000000},
    { name: "Nguyễn Anh Đức", DS: 214000000},
  ].sort((a, b) => b.DS - a.DS);
  
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const chartDataYear = [
    { month: "T1", desktop: 186 },
    { month: "T2", desktop: 305 },
    { month: "T3", desktop: 237 },
    { month: "T4", desktop: 73 },
    { month: "T5", desktop: 209 },
    { month: "T6", desktop: 214 },
    { month: "T7", desktop: 186 },
    { month: "T8", desktop: 305 },
    { month: "T9", desktop: 237 },
    { month: "T10", desktop: 73 },
    { month: "T11", desktop: 209 },
    { month: "T12", desktop: 214 },
  ]

  const chartConfigYear = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const getCurrentMonthYearNumeric = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng từ 1-12
    const year = now.getFullYear();
    return `${month}-${year}`;
  };
  const getCurrentYearNumer = () => {
    const now = new Date();
    const year = now.getFullYear();
    return year;
  };

  const totalVisitors = React.useMemo(() => {
      return chartDataYear.reduce((acc, curr) => acc + curr.desktop, 0);
    }, [chartDataYear]);

  return (
    <div className="p-[10px] relative h-full">
      <h1 className="uppercase text-black font-bold h-[4.6rem] text-[1.5rem] flex items-center drop-shadow-lg">Trang chủ</h1>
      <div className="mf-auto mr-auto relative overflow-hidden z-[1] w-full flex">
        <Swiper
          spaceBetween={20}
          slidesPerView={1} // Mặc định là 1
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]} // Chỉ dùng Pagination
          breakpoints={{
              640: {
                  slidesPerView: 2, // Khi màn hình > 640px thì hiển thị 2 slide
              },
              1100: {
                  slidesPerView: 3, // Khi màn hình > 810px thì hiển thị 3 slide
              }
          }}
        >
          {datalist.map((data, index) => (
            <SwiperSlide key={index} className="p-[10px] flex pb-[40px]">
              <div className="w-full h-[12rem] bg-white rounded-[20px] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] flex justify-center items-center flex-col gap-5 text-black hover:shadow-none cursor-pointer">
                <h2 className="uppercase text-[1.1rem] font-semibold">{data.item}</h2>
                <p className="text-[3rem] font-bold">{data.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 mb-[30px] justify-center gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6">
          <ChatInterview/>
          <ChatResultInterview/>
        </div>
        <div className="shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] hover:shadow-none">
          <Card className="w-full h-[60rem] xl:h-full">
            <CardHeader>
              <CardTitle className="uppercase flex justify-center font-bold text-[1.2rem]">bxh trưởng nhóm kinh doanh</CardTitle>
              <CardDescription className="flex justify-center font-semibold text-[1rem]">{getCurrentMonthYearNumeric()}</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <ChartContainer config={chartConfig} className="max-w-[22rem] sm:max-w-[45rem] md:max-w-[30rem] lg:max-w-[40rem] xl:max-w-[350px] 2xl:max-w-[420px] flexbox h-full relative">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{
                    left: -20,
                  }}
                >
                  <XAxis type="number" dataKey="DS" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={8}
                    axisLine={false}
                    width={100}
                    tickFormatter={(value) => {
                      const parts = value.split(" ");
                      if (parts.length > 1) {
                        return parts.slice(0, parts.length - 1).map((w: string) => w[0] + ".").join("") + parts[parts.length - 1];
                      }
                      return value;
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar dataKey="DS" fill="rgb(33,173,153)" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Doanh số năm {getCurrentYearNumer()}</CardTitle>
            <CardDescription>{totalVisitors}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigYear}>
              <BarChart accessibilityLayer data={chartDataYear}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={100}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="desktop" fill="rgb(33,173,153)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
