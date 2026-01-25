import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="relative w-screen min-h-[calc(100dvh-60px)] overflow-hidden lg:min-h-[calc(100dvh-80px)]">
        <Image
          src="/images/smartbremen-bg.png"
          alt="Background of Bremen"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(177.42deg,#FFFFFF_40.4%,rgba(255,255,255,0.758942)_55.03%,rgba(255,75,75,0.54)_103.24%)]" />

        <div className="relative flex h-full w-full justify-center">
          <main className="mainContainer relative">
            <div className="relative z-20 mt-10 flex flex-col items-center lg:gap-5 xl:mt-14 2xl:mt-20">
              <div className="text-center">
                <h1 className="mb-1 text-2xl font-medium text-[#FF4B4B] lg:text-3xl xl:text-4xl 2xl:text-[44px]">
                  Discover the Hidden City
                </h1>

                <p className="text-[#45414F] lg:text-xl xl:text-[22px] 2xl:text-[24px]">
                  Stories, Spaces, and Informal Life in Bremen
                </p>

                <p className="mt-8 text-sm text-[#45414F] sm:w-[550px] lg:w-[700px] lg:text-lg xl:w-[828px] 2xl:text-[20px]">
                  Between official streets and marked paths, there are stories
                  created by people, improvised gardens, secret shortcuts,
                  micro-hangout spots, and traces of everyday creativity. Smart
                  Bremen reveals these informal layers and makes them visible.
                </p>
              </div>

              <Link href="/map">
                <button className="mt-8 h-12 w-45 cursor-pointer rounded-[20px] bg-[#6BEE32] text-sm font-semibold hover:border-2 hover:border-[#6BEE32] hover:bg-transparent lg:h-14 lg:w-[244px] lg:text-base xl:mt-5 2xl:mt-10">
                  START EXPLORING
                </button>
              </Link>
            </div>

            {/* Bottom images */}
            <div>
              <div className="absolute -bottom-5 left-0 z-10 w-[155px] md:-bottom-12 lg:-bottom-16 md:w-[270px] lg:w-[300px] 2xl:w-[370px]">
                <Image
                  src="/images/DDCC.webp"
                  alt="Bremen statue"
                  width={300}
                  height={160}
                  className="h-auto w-full rounded-lg"
                  priority
                />
              </div>

              <div className="absolute bottom-0 left-1/2 hidden w-[120px] -translate-x-1/2 sm:block sm:w-[180px] md:w-[250px]  lg:w-[320px] xl:w-[480px]">
                <Image
                  src="/images/city1.png"
                  alt="Bremen skyline"
                  width={700}
                  height={160}
                  className="h-auto w-full rounded-lg"
                  priority
                />
              </div>

              <div className="absolute -bottom-6 right-0 z-10 w-[145px] md:-bottom-16  md:w-[260px] lg:w-[320px] xl:-bottom-28 2xl:w-[380px]">
                <Image
                  src="/images/kirche.webp"
                  alt="Bremen church"
                  width={300}
                  height={160}
                  className="h-auto w-full rounded-lg"
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
