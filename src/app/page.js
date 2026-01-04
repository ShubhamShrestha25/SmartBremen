import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div
        style={{
          backgroundImage: "url('/images/smartbremen-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          minHeight: "calc(100vh - 80px)",
        }}
        className="flex justify-between "
      >
        <div className="flex justify-center w-full">
          <main className="mainContainer relative overflow-hidden">
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
              <button className="w-[244px] h-[60px] bg-[#6BEE32] rounded-[20px] font-semibold mt-9">
                START EXPLORING
              </button>
            </div>
            <div>
              <div className="absolute -bottom-16 left-0 w-[400px] z-10">
                <Image
                  src="/images/DDCC.png"
                  alt=""
                  width={300}
                  height={160}
                  className="rounded-lg w-full h-auto"
                />
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px]">
                <Image
                  src="/images/city.png"
                  alt=""
                  width={700}
                  height={160}
                  className="rounded-lg w-full h-auto"
                />
              </div>

              <div className="absolute -bottom-30 right-0 w-[380px] z-10">
                <Image
                  src="/images/kirche.png"
                  alt=""
                  width={300}
                  height={160}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
