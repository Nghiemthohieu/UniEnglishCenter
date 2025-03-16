export default function Home() {
  return (
    <div className="sm:p-[10px] relative h-full">
      <h1 className="uppercase text-black font-bold h-[4.6rem] text-[1.5rem] flex items-center drop-shadow-lg">trang chủ</h1>
      <div className="w-full grid grid-cols-3 gap-6 h-[12rem]">
        <div className="w-full bg-white rounded-[20px] shadow-[0_2rem_3rem_rgba(132,139,200,0.18)]">
          <h2>Tổng Doanh số</h2>
          <p>235tr</p>
        </div>
      </div>
    </div>
  );
}
