export default function About() {
  return (
    <div className="flex justify-center">
      <div
        style={{
          backgroundImage: `
            linear-gradient(269.99deg, rgba(255, 255, 255, 0) 0.01%, rgba(255, 255, 255, 0.853714) 50.73%, #FFFFFF 99.99%),
            linear-gradient(136.47deg, rgba(255, 255, 255, 0.2) 26.45%, rgba(0, 0, 0, 0) 93.15%),
            url('/images/about-bg.png')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          minHeight: "calc(100vh - 80px)",
        }}
        className="relative"
      >
        <div className="flex justify-center">
          <div className="mainContainer">
            <div className="w-1/2 mt-14 mb-6">
              <div>
                <h1 className="text-[#FF4B4B] text-2xl font-medium mb-2">
                  About Smart Bremen
                </h1>
                <p className="text-sm mb-1">
                  Smart Bremen is a research-driven project that explores the
                  informal side of the city , the everyday places, practices,
                  and interactions that shape urban life but often remain
                  invisible in official maps and smart city systems.
                </p>
                <p className="text-sm">
                  While smart city initiatives usually focus on formal data such
                  as infrastructure, traffic, or sensors, Smart Bremen looks
                  beyond that. It highlights informal urban realities:
                  spontaneous meeting spots, community practices, cultural
                  spaces, social routines, and lived experiences that make
                  Bremen what it truly is.
                </p>
              </div>
              <div className="mt-4 bg-white/80  p-5 rounded-[20px]">
                <h1 className="font-medium mb-1">Why Informalities Matter</h1>
                <p className="text-sm mb-1">
                  Cities are not only built from buildings and data, they are
                  built from people. Informal practices play a crucial role in:
                </p>
                <ul className="list-disc text-sm ml-5">
                  <li>How people use public space</li>
                  <li>How communities form and support each other</li>
                  <li>How culture, identity, and belonging emerge</li>
                  <li>How cities adapt, resist, and evolve</li>
                </ul>
                <p className="text-sm mt-1">
                  Yet these aspects are rarely documented or represented in
                  digital urban systems. Smart Bremen aims to change that.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="font-medium mb-1">What This Platform Does</h1>
                <p className="text-sm mb-1">
                  This website serves as an interactive map of Bremen’s informal
                  urban life. Here, informalities are:
                </p>
                <ul className="list-disc text-sm ml-5">
                  <li>
                    Collected through observation, storytelling, and field
                    research
                  </li>
                  <li>Documented using text, images, and digital media</li>
                  <li>
                    Mapped and visualized to make them accessible to others
                  </li>
                </ul>
                <p className="text-sm mt-1">
                  The platform invites users to explore Bremen from a lived,
                  human perspective — not just as a city of streets and
                  buildings, but as a city of experiences.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="font-medium mb-1">Our Approach</h1>
                <p className="text-sm mb-1">
                  Smart Bremen follows an Urban Living Lab approach, combining:
                </p>
                <ul className="list-disc text-sm ml-5">
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
                <p className="text-sm mt-1">
                  Rather than defining the city from above, this project grows
                  from within the city itself.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="font-medium mb-1">Our Vision</h1>
                <p className="text-sm mb-1">
                  We believe that a truly smart city is not only efficient and
                  data-driven, but also:
                </p>
                <ul className="list-disc text-sm ml-5">
                  <li>Inclusive</li>
                  <li>Participatory</li>
                  <li>Culturally aware</li>
                  <li>Grounded in everyday life</li>
                </ul>
                <p className="text-sm mt-1">
                  By making informal urban practices visible, Smart Bremen
                  contributes to more humane, democratic, and socially
                  responsive digital cities.
                </p>
              </div>
              <div className="mt-4 bg-white/80 p-5 rounded-[20px]">
                <h1 className="font-medium mb-1">Academic Context</h1>
                <p className="text-sm mb-1">
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
