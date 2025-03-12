import React from 'react';
import useScrollFadeIn from './ScrollFadeIn';

const Kbrand = () => {
  useScrollFadeIn();
  return (
    <>
      <div>
        <img src="/kbrand/newjeans_cover4.png" alt="cover" />
      </div>
      <section className="text-center py-16 px-4 mt-">
        <button
          className="inline-flex items-center justify-center px-12
    py-2 border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full text-lg font-medium mb-6"
        >
          Special collaboration
        </button>
        <p className="text-body1 text-gray-500 leading-relaxed max-w-[1280px] mx-auto">
          As time flows, every moment becomes as effortless as a scene from a movie.
          <br />
          Introducing the new Feather Fit & Balance series. Add a touch of effortless charm to your style.
        </p>
      </section>

      {/* 뉴진스 이미지이-=--------------------------------------------------------------------- */}
      <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out w-full lg:px-16 pb-16">
        {/* 민지 섹션*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 justify-items-center items-center">
          <div className="relative w-[600px]">
            <div className="absolute -top-10 -left-10 w-full h-full bg-secondary-200 z-0 rounded-md"></div>

            <img src="/kbrand/minji.jpg" alt="model" className="relative z-10 rounded-md w-full" />
          </div>
          <div className="relative w-[500px] h-[300px] rounded-md">
            <div className="absolute top-6 left-[300px] rotate-[-14deg] bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800">
              MinJi Pick
            </div>
            <img
              src="/kbrand/roy_2.png"
              alt="glasses"
              className="absolute top-[80px] left-[40px] rotate-[-14deg] w-[300px] z-10"
            />
            <div className="absolute bottom-5 left-12 text-sm text-gray-700 font-mono z-20">
              Feather-Fit
              <br />
              Roy S
            </div>
            {/*혜인 --------------------------------------------*/}
            <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
              <div className="relative w-[600px]">
                <div className="absolute -top-10 -right-10 w-full h-full bg-secondary-200 z-0 rounded-md"></div>
                <img
                  src="/kbrand/hyein.jpg"
                  alt="hyein"
                  className="rounded-md w-full
              mt-[350px] relative z-10"
                />
                <div className="absolute bottom-[110px] left-[450px] z-20 bg-primary-200 text-xs px-3 py-1 rounded shadow  text-gray-800">
                  Hyein Pick
                </div>
                <img
                  src="/kbrand/roy_3.png"
                  alt="glasses"
                  className="absolute bottom-2 right-[-80px] w-[240px]  z-10"
                />
                <div className="absolute  right-[-5px] text-sm text-gray-700 font-mono z-20">
                  Feather-Fit
                  <br />
                  Roy O
                </div>
              </div>
            </section>
          </div>

          {/*하니이ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ */}
          <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
            <div className="relative w-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 items-center justify-items-center">
                <div className="relative w-[500px] h-[300px] rounded-md">
                  <div className="absolute top-6 left-[50px] bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800">
                    Hanni Pick
                  </div>
                  <img
                    src="/kbrand/lika.png"
                    alt="glasses"
                    className="absolute top-[80px] left-[40px] rotate-[-14deg] w-[300px] z-30"
                  />
                  <div className="absolute bottom-5 left-12 text-sm text-gray-700 font-mono z-20">
                    Balance
                    <br />
                    Lika O
                  </div>
                </div>
                <div className="relative w-[600px]">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-secondary-200 z-0 rounded-md"></div>
                  <img src="/kbrand/hanni.jpg" alt="model" className="relative z-10 rounded-md w-full" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out flex items-center justify-center h-screen ">
          <div>
            <img src="/kbrand/addtext.png" alt="add" />
          </div>
        </section>

        {/* add 섹션 */}
        <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 justify-items-center items-start">
            {/*혜린-------------------------------------------------------------------------------- */}
            <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
              <div className="flex flex-col gap-6 items-center">
                <div className="relative w-[600px]">
                  <div className="absolute -top-10 -left-10 w-full h-full bg-secondary-200 z-0 rounded-md"></div>
                  <img src="/kbrand/hearin.jpg" alt="hearin" className="relative z-10 rounded-md w-full" />
                </div>

                <div className="relative w-[500px] h-[300px]  rounded-md">
                  <div className="absolute top-6 left-[300px] rotate-[-14deg] bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800">
                    Haerin Pick
                  </div>
                  <img
                    src="/kbrand/roy_1.png"
                    alt="glasses"
                    className="absolute top-[80px] left-[40px] rotate-[-14deg] w-[300px] z-10"
                  />
                  <div className="absolute bottom-5 left-12 text-sm text-gray-700 font-mono z-20">
                    Feather-Fit <br /> Roy O
                  </div>
                </div>
              </div>
            </section>

            {/*다니엘 ----------------------------------------------------------- */}
            <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
              <div className="flex flex-col gap-6 items-center">
                <div className="relative w-[500px] h-[300px] rounded-md">
                  <div className="absolute top-6 left-[300px] rotate-[-14deg] bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800">
                    Danielle Pick
                  </div>
                  <img
                    src="/kbrand/edell_2.png"
                    alt="glasses"
                    className="absolute top-[80px] left-[40px] rotate-[-14deg] w-[300px] z-10"
                  />
                  <div className="absolute bottom-5 left-12 text-sm text-gray-700 font-mono z-20">
                    Balance <br /> Edell S
                  </div>
                </div>

                <div className="relative w-[600px]">
                  <div className="absolute -top-10 -right-10 w-full h-full bg-secondary-200 z-0 rounded-md"></div>
                  <img src="/kbrand/daniel.jpg" alt="danielle" className="relative z-10 rounded-md w-full" />
                </div>
              </div>
            </section>
          </div>
        </section>
      </section>
      {/* 아이템 6가지 섹션 */}
      <section className="text-center py-16 px-4 top-[100px]">
        <button
          className="inline-flex items-center justify-center px-12
    py-2 border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full text-lg font-medium mb-6"
        >
          collaboration Items
        </button>
        <p className="text-body1 text-gray-500 leading-relaxed max-w-[1280px] mx-auto">
          We introduce various items worn by New Jeans in the pictorial.
        </p>
        <div className="pt-14">
          <div className="inline-block bg-primary-200 text-gray-800 text-xs px-3 py-1 rounded shadow top-[100px]">
            Feather-Fit
          </div>
          {/* absolute top-6 left-[300px] rotate-[-14deg] bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800 */}
          <div className="flex gap-14 justify-center pt-14 mb-14">
            <img src="/kbrand/roy_1.png" alt="items1" />
            <img src="/kbrand/roy_2.png" alt="items2" />
            <img src="/kbrand/roy_3.png" alt="items3" />
          </div>

          <div className="inline-block bg-primary-200 text-gray-800 text-xs px-3 py-1 rounded shadow">Balance</div>

          <div className="flex gap-14 justify-center pt-14 mb-14">
            <img src="/kbrand/edell_1.png" alt="items4" />
            <img src="/kbrand/edell_2.png" alt="items5" />
            <img src="/kbrand/lika.png" alt="items6" />
          </div>
        </div>
      </section>
      {/* 오헤시오 모델 실제 착샷 */}
      <section className="relative w-full py-10 overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center z-0">
          {/* <img src="/images/logo.png" alt="logo" className="opacity-20 w-[80%]" /> */}

          <h1 className="text-[200px] font-extrabold text-black opacity-10 tracking-tighter">OHESHIC</h1>
        </div>

        <div className="relative z-10 flex justify-center gap-6 w-full">
          <img src="/oheshio/miseki/outer/black/p047_bow_over_cardigan/p047_2.png" alt="model1" className="h-[600px]" />
          <img
            src="/oheshio/miseki/bottom/black/p068_side_bow_pleats_midi_skirt_/p068_2.png"
            alt="model2"
            className="h-[600px]"
          />
          <img
            src="/oheshio/miseki/bottom/black/p070_draped_midi_skirt_pantsv/p070_2.png"
            alt="model3"
            className="h-[600px] mt-4"
          />
        </div>
      </section>
    </>
  );
};

export default Kbrand;
