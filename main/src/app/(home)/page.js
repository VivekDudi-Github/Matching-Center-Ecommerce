import Image from "next/image";
import BigButton from "../components/BigButton";
import ShopNowBtn from "../components/home/ShopNowBtn";
import '../globals.css';

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black"> 
      {/* Top Banner */}
      
      <div className="w-full md:h-svh h-[80svh] relative -top-14 z-0 flex items-center justify-center">
        <Image src={'/fabrics_sew.webp'}  alt="fabrics" fill className=" object-cover opacity-75 "   />
        <div className="  top-14 text-center sm:text-left w-full px z-10 flex flex-col gap-4 sm:gap-8 items-center sm:items-start justify-center pl-4 "> 
          <h2 className=" font-semibold text-4xl md:text-5xl text-white fade-in">
            Discover Our Fabric Treasures
          </h2>
          <p className=" sm:w-2/3 font-light text-md sm:text-xl text-white  fade-in ">
            Explore a world of vibrant fabrics and unique textiles perfect for any project. From clothing to home décor, find the materials that inspire your creativity. 
          </p>
          <ShopNowBtn />
        </div>
      </div>
      <div className="w-full md:h-svh h-[80svh] relative -top-14 z-0 flex items-center justify-center">
        <Image src={'/fabrics1.webp'}  alt="fabrics" fill className=" object-cover opacity-75 "   />
        <div className="  top-14 text-center sm:text-left w-full px z-10 flex flex-col gap-4 sm:gap-8 items-center sm:items-start justify-center pl-4 "> 
          <h2 className=" font-semibold text-4xl sm:text-4xl text-white ">
            Discover Our Fabric Treasures
          </h2>
          <p className=" font-light text-md sm:text-xl text-white  ">
            Explore a world of vibrant fabrics and unique textiles perfect for any project. From clothing to home décor, find the materials that inspire your creativity. 
          </p>
          <ShopNowBtn />
        </div>
      </div>
    </div>
  );
}
