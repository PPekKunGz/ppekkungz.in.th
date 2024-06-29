export default function HomePage() {
  return (
    <div className="backdrop-blur-xl bg-black/20 w-full h-full py-20">
      <div className="flex flex-col justify-center items-center h-full text-white text-4xl" data-aos="zoom-in" data-aos-duration="1000">
        <p>ยินดีต้อนรับเข้าสู่หน้าประวัติของ</p>
        <p className="tracking-[2px] font-bold text-white [text-shadow:2px_2px_2px_rgba(255,255,255,0.6)]">PPekKunGzDev</p>
        <p className="text-[12px] text-white font-bold">Web / Minecraft Developer</p>
        <div className="w-[220px] flex justify-center items-center">
          <input
            type="text"
            disabled
            placeholder="npx install ppekkungz@latest"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}