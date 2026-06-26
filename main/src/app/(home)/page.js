import Image from "next/image";
import BigButton from "../components/BigButton";
import ShopNowBtn from "../components/home/ShopNowBtn";
import '../globals.css';
import DiscoverTab from "../components/home/DiscoverTab";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full flex-1 items-center justify-start  font-sans dark:bg-black bg-white"> 
      {/* Top Banner */}
      
      <div className="w-full md:h-svh h-[80svh] relative -top-14 z-0 flex items-center justify-center">
        <Image src={'/fabrics_sew.webp'} alt="fabrics" fill className=" object-cover brightness-75 w-auto h-auto "   />
        {/* https://pearlwebsitecdn-prod-d8bgbfaqbgcghcfw.a01.azurefd.net/drupal-files/2025-01/What-are-the-different-types-of-fabric-in-Fashion-Design_648x310.webp */}
        <div className="  top-14 text-center sm:text-left w-full px z-10 flex flex-col gap-4 sm:gap-8 items-center sm:items-start justify-center pl-4 sm:pl-8 md:pl-16 "> 
          <h2 className=" sm:w-1/2 font-semibold text-4xl md:text-6xl text-white fade-in">
            Discover Our Fabric Treasures
          </h2>
          <p className=" sm:w-1/2 font-light text-md sm:text-xl text-white  fade-in ">
            Explore a world of vibrant fabrics and unique textiles perfect for any project. From clothing to home décor, find the materials that inspire your creativity. 
          </p>
          <ShopNowBtn />
        </div>
      </div>
      <DiscoverTab/>
      
      <div className="w-full md:h-svh h-[80svh] relative -top-14 z-0 flex items-center justify-center ">
        <Image src={'/fabrics2.jpg'} fill  alt="fabrics" className=" object-cover brightness-75 "   /> 
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
