import Image from "next/image";

export default function About() {
  return (
    <div className="flex justify-center">
      <div className="relative w-screen min-h-[calc(100vh-60px)] overflow-hidden lg:min-h-[calc(100vh-80px)]">
        <Image
          src="/images/about-bg.webp"
          alt="Background of Bremen"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(269.99deg,rgba(255,255,255,0)_0.01%,rgba(255,255,255,0.85)_50.73%,#fff_99.99%),linear-gradient(136.47deg,rgba(255,255,255,0.2)_26.45%,rgba(0,0,0,0)_93.15%)]" />

        <div className="relative z-20 flex justify-center">
          <div className="mainContainer">
            <div className=" space-y-4 mt-8 mb-4 lg:mt-14 lg:mb-6 lg:w-1/2">
              <div>
                <h1 className="text-[#FF4B4B] text-lg font-medium mb-2 lg:text-2xl">
                  About Smart Bremen
                </h1>
                <p className="text-xs mb-1 lg:text-sm">
                  Smart Bremen is a research-driven project that explores the
                  informal side of the city , the everyday places, practices,
                  and interactions that shape urban life but often remain
                  invisible in official maps and smart city systems.
                </p>
                <p className="text-xs lg:text-sm">
                  While smart city initiatives usually focus on formal data such
                  as infrastructure, traffic, or sensors, Smart Bremen looks
                  beyond that. It highlights informal urban realities:
                  spontaneous meeting spots, community practices, cultural
                  spaces, social routines, and lived experiences that make
                  Bremen what it truly is.
                </p>
              </div>
              <div className="mt-4 bg-white/80  p-5 rounded-[20px]">
                <h1 className="text-sm font-medium mb-1 lg:text-base">
                  Why Informalities Matter
                </h1>
                <p className="text-xs mb-1 lg:text-sm">
                  Cities are not only built from buildings and data, they are
                  built from people. Informal practices play a crucial role in:
                </p>
                <ul className="list-disc text-xs ml-5 lg:text-sm">
                  <li>How people use public space</li>
                  <li>How communities form and support each other</li>
                  <li>How culture, identity, and belonging emerge</li>
                  <li>How cities adapt, resist, and evolve</li>
                </ul>
                <p className="text-xs mt-1 lg:text-sm">
                  Yet these aspects are rarely documented or represented in
                  digital urban systems. Smart Bremen aims to change that.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="text-sm font-medium mb-1 lg:text-base">
                  What This Platform Does
                </h1>
                <p className="text-xs mb-1 lg:text-sm">
                  This website serves as an interactive map of Bremen’s informal
                  urban life. Here, informalities are:
                </p>
                <ul className="list-disc text-xs ml-5 lg:text-sm">
                  <li>
                    Collected through observation, storytelling, and field
                    research
                  </li>
                  <li>Documented using text, images, and digital media</li>
                  <li>
                    Mapped and visualized to make them accessible to others
                  </li>
                </ul>
                <p className="text-xs mt-1 lg:text-sm">
                  The platform invites users to explore Bremen from a lived,
                  human perspective — not just as a city of streets and
                  buildings, but as a city of experiences.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="text-sm font-medium mb-1 lg:text-base">
                  Our Approach
                </h1>
                <p className="text-xs mb-1 lg:text-sm">
                  Smart Bremen follows an Urban Living Lab approach, combining:
                </p>
                <ul className="list-disc text-xs ml-5 lg:text-sm">
                  <li>
                    Qualitative research (observation, interviews, visual
                    documentation)
                  </li>
                  <li>Digital mapping and visualization</li>
                  <li>
                    Critical reflection on smart cities, participation, and
                    inclusivity
                  </li>
                </ul>
                <p className="text-xs mt-1 lg:text-sm">
                  Rather than defining the city from above, this project grows
                  from within the city itself.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="text-sm font-medium mb-1 lg:text-base">
                  Our Vision
                </h1>
                <p className="text-xs mb-1 lg:text-sm">
                  We believe that a truly smart city is not only efficient and
                  data-driven, but also:
                </p>
                <ul className="list-disc text-xs ml-5 lg:text-sm">
                  <li>Inclusive</li>
                  <li>Participatory</li>
                  <li>Culturally aware</li>
                  <li>Grounded in everyday life</li>
                </ul>
                <p className="text-xs mt-1 lg:text-sm">
                  By making informal urban practices visible, Smart Bremen
                  contributes to more humane, democratic, and socially
                  responsive digital cities.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="text-sm font-medium mb-1 lg:text-base">
                  Academic Context
                </h1>
                <p className="text-xs mb-1 lg:text-sm">
                  Smart Bremen is developed within the University of Bremen as
                  part of research and teaching in digital media, urban studies,
                  and smart city discourse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
