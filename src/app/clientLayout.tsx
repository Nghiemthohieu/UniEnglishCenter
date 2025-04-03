"use client"; // Đánh dấu là Client Component

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register"); // Kiểm tra trang đăng nhập/đăng ký
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const menuItems = [
    { icon: "home", label: "Trang chủ", path: "/" },
    { icon: "payment", label: "Lương", path: "/salary" },
    { icon: "group", label: "Nhân sự", path: "/human_resources" },
    { icon: "calendar_month", label: "Lịch làm", path: "/work_schedule" },
    { icon: "calendar_month", label: "Lịch trực", path: "/duty_schedule" },
    { icon: "fact_check", label: "Phỏng vấn", path: "/interview" },
    { icon: "receipt_long", label: "Hóa đơn", path: "/invoices" },
    { icon: "list_alt", label: "Báo cáo KQ", path: "/reports" },
  ];

  // Nếu là trang đăng nhập hoặc đăng ký, chỉ render `children`
  if (isAuthPage) {
    return <div className="h-screen w-screen flex items-center justify-center bg-gray-100">{children}</div>;
  }

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col md:grid md:grid-cols-12 text-[#7d8da1] bg-[#f6f6f9] h-full w-full overflow-auto">
          <div className={`${isMenuOpen ? "block" : "hidden"} md:block md:col-span-2 animation`}>
            <div className="fixed flex flex-col w-1/2 md:w-1/6 h-full z-10 bg-white md:bg-[#f6f6f9] shadow-lg md:shadow-none">
              {/* Logo & Close Button */}
              <div className="flex justify-between md:justify-center w-full pt-4 px-4">
                <div className="w-1/2 max-h-[3.4rem] max-w-[6rem]">
                  <img
                    alt="logo"
                    loading="lazy"
                    width="100"
                    height="56"
                    decoding="async"
                    className="w-full"
                    style={{ color: "transparent" }}
                    src="/img/logo2.png"
                  />
                </div>
                <div className="md:hidden flex justify-center items-center" onClick={toggleMenu}>
                  <span className="material-symbols-outlined">close</span>
                </div>
              </div>
        
              {/* Menu Items */}
              <div className="pt-[20px] md:m-5 h-full md:bg-white md:shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] md:rounded-[15px] hover:md:shadow-none">
                <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.path}
                        className={`flex items-center lg:gap-4 text-[var(--color-info-dark)] font-medium text-sm h-14
                          lg:ml-8 ml-8 md:ml-0 md:justify-center lg:justify-normal transition duration-300 ease-in-out 
                          hover:text-[var(--color-primary)] group ${pathname === item.path ? "active" : ""}`}
                      >
                        <span
                          className={`${pathname === item.path ? "w-full !flex justify-center lg:w-[22px] lg:block lg:pl-0" : ""} material-symbols-outlined transition-all duration-300 ease group-hover:ml-2 ${pathname === item.path ? "lg:ml-2 ml-2 md:ml-0" : ""}`}
                          style={{ fontSize: "1.6rem"}}
                        >
                          {item.icon}
                        </span>
                        <p className="md:hidden lg:block">{item.label}</p>
                      </a>
                    </li>
                  ))}
        
                  {/* Logout */}
                  <li className="absolute bottom-16 w-[calc(100%-1rem)]">
                    <a
                      href="#"
                      className="flex items-center gap-4 text-[var(--color-info-dark)] font-medium text-sm h-14 
                      lg:ml-8 ml-8 md:ml-0 md:justify-center lg:justify-normal transition duration-300 ease-in-out 
                      hover:text-[var(--color-primary)] group"
                    >
                      <span
                        className="material-symbols-outlined transition-all duration-300 ease group-hover:ml-2"
                        style={{ fontSize: "1.6rem" }}
                      >
                        logout
                      </span>
                      <p className="md:hidden lg:block">Logout</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">{children}</div>
          <div className="md:col-span-3 w-full">
            <div className="md:fixed md:w-1/4 w-full  flex flex-col md:pl-[10px] pl-[30px] pr-[30px] overflow-y-auto mt-[50px] md:mt-0 mb-[40px]">
              <div className="pt-[1.4rem]">
                  <div className=" flex md:justify-end gap-[2rem] fixed md:relative top-0 w-full justify-between left-0 right-0 h-[4.6rem] bg-white md:bg-[#f6f6f9] pl-[1.2rem] pr-[1.2rem] md:p-0">
                      <button className="md:hidden" onClick={toggleMenu}>
                          <span className="material-symbols-outlined p-[8px] hover:bg-auto cursor-pointer hover:bg-[#eae8e878]">
                              menu
                          </span>
                      </button>
                      <div className="flex gap-[2rem] text-right content-center justify-center">
                          <div className="md:flex md:flex-col text-right content-center justify-center hidden">
                              <p className="">Hey, <b className="text-[var(--color-dark)]">Reza</b></p>
                              <small className="text-[var(--color-dark-variant)] text-[0.76rem]">Admin</small>
                          </div>
                          <div className="flex">
                              <button className="rounded-[50%] cursor-pointer">
                                  <Image src="/img/profile-1.jpg" alt="" height={40} width={40} className="w-full rounded-[50%]"/>
                              </button>
                          </div>
                      </div>
                  </div>
                  <div className="flex justify-center text-center mt-[1rem] bg-white p-[1.8rem] rounded-[2rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] cursor-pointer transition-[3s] w-full h-full max-h-[200px] hover:shadow-none">
                      <div className="flex flex-col justify-center items-center gap-2">
                          <Image src="/img/logo2.png" alt="" height={88} width={154} className="w-full h-full max-w-[154px] max-h-[88px] rounded-[50%] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)]"/>
                          <div>
                              <h2 className="font-semibold text-[1.4rem] text-[var(--color-dark)]">UNI ENGLISH CENTER</h2>
                              <p>TỰ TIN TIẾNG ANH, SÁNH TẦM QUỐC TẾ</p>
                          </div>
                      </div> 
                  </div>
                  <div className="mt-[2rem]">
                      <div className="flex justify-between items-center mb-[1rem]">
                          <h2 className="font-semibold text-[var(--color-dark)] text-[1.4rem]">Reminders</h2>
                          <span className="material-symbols-outlined p-[10px] text-[var(--color-dark)] bg-white rounded-[50%] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)]">
                              notifications_none
                          </span>
                      </div>
                      <div className="flex w-full gap-[1rem] px-[1.8rem] py-[1.4rem] rounded-[1.2rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] bg-white mb-[1rem] cursor-pointer hover:shadow-none">
                          <div className="p-[0.6rem] text-white bg-[#1B9C85] rounded-[20%]">
                              <span className="material-symbols-outlined">
                                  volume_up
                              </span>
                          </div>
                          <div className="flex justify-between items-center w-full text-[var(--color-dark)]">
                              <div className="">
                                  <h3 className="font-medium text-[0.87rem]">Wordshop</h3>
                                  <small className="text-[0.76rem]">
                                      08:00 AM - 12:00 PM
                                  </small>
                              </div>
                              <span className="material-symbols-outlined">
                                  more_vert
                              </span>
                          </div>
                      </div>
                      <div className="flex w-full gap-[1rem] px-[1.8rem] py-[1.4rem] rounded-[1.2rem] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] bg-white mb-[1rem] cursor-pointer hover:shadow-none">
                          <div className="p-[0.6rem] text-white bg-[#1B9C85] rounded-[20%]">
                              <span className="material-symbols-outlined">
                                  volume_up
                              </span>
                          </div>
                          <div className="flex justify-between items-center w-full text-[var(--color-dark)]">
                              <div className="">
                                  <h3 className="font-medium text-[0.87rem]">Wordshop</h3>
                                  <small className="text-[0.76rem]">
                                      08:00 AM - 12:00 PM
                                  </small>
                              </div>
                              <span className="material-symbols-outlined">
                                  more_vert
                              </span>
                          </div>
                      </div>
                      <div className="bg-white border-[2px] border-dashed border-[#6C9BCF] text-[#6C9BCF] cursor-pointer px-[1.8rem] py-[1.4rem] rounded-[1.2rem] justify-center items-center hover:bg-[var(--color-primary)] group"> 
                          <div className="flex gap-[0.6rem] items-center justify-center group-hover:text-white">
                              <span className="material-symbols-outlined">
                                  add
                              </span>
                              <h3 className="font-[500] text-[0.87rem]">Add Reminder</h3>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
