import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="relative w-screen min-h-[calc(100vh-80px)] overflow-hidden">
        <Image
          src="/images/smartbremen-bg.png"
          alt="Background of Bremen"
          fill
          priority
          sizes="100vw"
          className="object-cover relative z-20"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(177.42deg,#FFFFFF_40.4%,rgba(255,255,255,0.758942)_55.03%,rgba(255,75,75,0.54)_103.24%)]" />

        <div className=" relative z-20 flex justify-center w-full h-full">
          <main className="mainContainer relative">
            <div className="flex flex-col items-center gap-[35px] mt-[89px]">
              <div className="text-center">
                <h1 className="text-[44px] font-medium">
                  Discover the Hidden City
                </h1>
                <p className="text-[24px]  text-[#45414F]">
                  Stories, Spaces, and Informal Life in Bremen
                </p>
                <p className="text-[20px] text-[#45414F] w-[828px] mt-8">
                  Between official streets and marked paths, there are stories
                  created by people, improvised gardens, secret shortcuts,
                  micro-hangout spots, and traces of everyday creativity. Smart
                  Bremen reveals these informal layers and makes them visible.
                </p>
              </div>
              <Link href="/map">
                <button className="w-[244px] h-[60px] bg-[#6BEE32] rounded-[20px] font-semibold mt-9 cursor-pointer">
                  START EXPLORING
                </button>
              </Link>
            </div>
            <div>
              <div className="absolute -bottom-16 left-0 w-[400px] z-10">
                <Image
                  src="/images/DDCC.webp"
                  alt=""
                  width={300}
                  height={160}
                  className="rounded-lg w-full h-auto"
                  priority
                />
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px]">
                <Image
                  src="/images/city1.png"
                  alt=""
                  width={700}
                  height={160}
                  className="rounded-lg w-full h-auto"
                  priority
                />
              </div>

              <div className="absolute -bottom-28 right-0 w-[380px] z-10 ">
                <Image
                  src="/images/kirche.webp"
                  alt=""
                  width={300}
                  height={160}
                  className="rounded-lg w-full h-auto"
                  priority
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
