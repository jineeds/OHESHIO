import React from 'react';
import useScrollFadeIn from './ScrollFadeIn';

const Kbrand = () => {
  useScrollFadeIn();
  return (
    <>
      <div className="w-full">
        <img src="/kbrand/newjeans_cover4.png" alt="cover" className="w-full h-auto" />
      </div>

      <section className="text-center py-12 px-4 sm:py-16">
        <button className="inline-flex items-center justify-center px-8 sm:px-12 py-2 border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full text-base sm:text-lg font-medium mb-6">
          Special collaboration
        </button>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-[1280px] mx-auto">
          As time flows, every moment becomes as effortless as a scene from a movie.
          <br />
          Introducing the new Feather Fit & Balance series. Add a touch of effortless charm to your style.
        </p>
      </section>

      <div className="w-full">
        <img src="/kbrand/pick-01.png" alt="cover" className="w-full h-auto rounded-md" />
      </div>

      {/* Minji Section */}
      <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out w-full px-4 sm:px-6 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 p-6 sm:p-10 justify-items-center items-center">
          <div className="relative w-full max-w-[600px]">
            <div className="absolute -top-6 -left-6 w-full h-full bg-secondary-200 z-0 rounded-md hidden sm:block"></div>
            <img src="/kbrand/minji.jpg" alt="model" className="relative z-10 rounded-md w-full" />
          </div>
          <div className="relative w-full max-w-[500px] h-[300px] mt-6 md:mt-0">
            <div className="absolute top-4 sm:top-6 left-1/2 sm:left-[300px] transform sm:transform-none -translate-x-1/2 sm:translate-x-0 rotate-[-14deg] bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800">
              MinJi Pick
            </div>
            <img
              src="/kbrand/roy_2.png"
              alt="glasses"
              className="absolute top-[80px] left-1/2 sm:left-[40px] transform -translate-x-1/2 sm:translate-x-0 rotate-[-14deg] w-[250px] sm:w-[300px] z-10"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:left-12 sm:translate-x-0 text-sm text-gray-700 font-mono z-20">
              Feather-Fit
              <br />
              Roy S
            </div>
          </div>
        </div>
      </section>

      {/* Hanni Section */}
      <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out w-full px-4 sm:px-6 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 justify-items-center items-center">
          <div className="relative w-full max-w-[500px] h-[300px]">
            <div className="absolute top-6 left-1/2 sm:left-[50px] transform -translate-x-1/2 sm:translate-x-0 bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800">
              Hanni Pick
            </div>
            <img
              src="/kbrand/lika.png"
              alt="glasses"
              className="absolute top-[80px] left-1/2 sm:left-[40px] transform -translate-x-1/2 sm:translate-x-0 rotate-[-14deg] w-[250px] sm:w-[300px] z-30"
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 sm:left-12 sm:translate-x-0 text-sm text-gray-700 font-mono z-20">
              Balance
              <br />
              Lika O
            </div>
          </div>
          <div className="relative w-full max-w-[600px]">
            <div className="absolute -top-4 -left-4 w-full h-full bg-secondary-200 z-0 rounded-md hidden sm:block"></div>
            <img src="/kbrand/hanni.jpg" alt="model" className="relative z-10 rounded-md w-full" />
          </div>
        </div>
      </section>

      {/* Haerin Section */}
      <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out w-full px-4 sm:px-6 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 justify-items-center items-center">
          <div className="relative w-full max-w-[600px]">
            <div className="absolute -top-10 -left-10 w-full h-full bg-secondary-200 z-0 rounded-md hidden sm:block"></div>
            <img src="/kbrand/hearin.jpg" alt="hearin" className="relative z-10 rounded-md w-full" />
          </div>
          <div className="relative w-full max-w-[500px] h-[300px]">
            <div className="absolute top-6 left-1/2 sm:left-[300px] transform -translate-x-1/2 sm:translate-x-0 rotate-[-14deg] bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800">
              Haerin Pick
            </div>
            <img
              src="/kbrand/roy_1.png"
              alt="glasses"
              className="absolute top-[80px] left-1/2 sm:left-[40px] transform -translate-x-1/2 sm:translate-x-0 rotate-[-14deg] w-[250px] sm:w-[300px] z-10"
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 sm:left-12 sm:translate-x-0 text-sm text-gray-700 font-mono z-20">
              Feather-Fit
              <br />
              Roy O
            </div>
          </div>
        </div>
      </section>

      {/* Danielle Section */}
      <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out w-full px-4 sm:px-6 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 justify-items-center items-center">
          <div className="relative w-full max-w-[500px] h-[300px]">
            <div className="absolute top-6 left-1/2 sm:left-[250px] transform -translate-x-1/2 sm:translate-x-0 rotate-[-14deg] bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800">
              Danielle Pick
            </div>
            <img
              src="/kbrand/edell_2.png"
              alt="glasses"
              className="absolute top-[80px] left-1/2 transform -translate-x-1/2 rotate-[-14deg] w-[250px] sm:w-[300px] z-10"
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-sm text-gray-700 font-mono z-20">
              Balance
              <br />
              Edell S
            </div>
          </div>
          <div className="relative w-full max-w-[600px]">
            <div className="absolute -top-10 -right-10 w-full h-full bg-secondary-200 z-0 rounded-md hidden sm:block"></div>
            <img src="/kbrand/daniel.jpg" alt="danielle" className="relative z-10 rounded-md w-full" />
          </div>
        </div>
      </section>

      <section className="scroll-show opacity-0 translate-y-10 transition-all duration-700 ease-in-out w-full px-4 sm:px-6 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 justify-items-center items-center">
          <div className="relative w-full max-w-[600px]">
            <div className="absolute -top-10 -right-10 w-full h-full bg-secondary-200 z-0 rounded-md hidden sm:block"></div>
            <img src="/kbrand/hyein.jpg" alt="hyein" className="relative z-10 rounded-md w-full" />
          </div>
          <div className="relative w-full max-w-[500px] h-[300px]">
            <div className="absolute top-6 left-1/2 sm:left-[300px] transform -translate-x-1/2 sm:translate-x-0 rotate-[-14deg] bg-primary-200 text-xs px-3 py-1 rounded shadow z-20 text-gray-800">
              Hyein Pick
            </div>
            <img
              src="/kbrand/roy_3.png"
              alt="glasses"
              className="absolute top-[80px] left-1/2 sm:left-[40px] transform -translate-x-1/2 sm:translate-x-0 rotate-[-14deg] w-[250px] sm:w-[300px] z-10"
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 sm:left-12 sm:translate-x-0 text-sm text-gray-700 font-mono z-20">
              Feather-Fit
              <br />
              Roy O
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-16 px-4">
        <button className="inline-flex items-center justify-center px-12 py-2 border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full text-lg font-medium mb-6">
          collaboration Items
        </button>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-[1280px] mx-auto">
          We introduce various items worn by New Jeans in the pictorial.
        </p>
        <div className="pt-14">
          <div className="inline-block bg-primary-200 text-gray-800 text-xs px-3 py-1 rounded shadow">Feather-Fit</div>
          <div className="flex flex-wrap gap-6 justify-center pt-14 mb-14">
            <img src="/kbrand/roy_1.png" alt="items1" className="w-[120px] sm:w-[160px] md:w-[200px]" />
            <img src="/kbrand/roy_2.png" alt="items2" className="w-[120px] sm:w-[160px] md:w-[200px]" />
            <img src="/kbrand/roy_3.png" alt="items3" className="w-[120px] sm:w-[160px] md:w-[200px]" />
          </div>
          <div className="inline-block bg-primary-200 text-gray-800 text-xs px-3 py-1 rounded shadow">Balance</div>
          <div className="flex flex-wrap gap-6 justify-center pt-14 mb-14">
            <img src="/kbrand/edell_1.png" alt="items4" className="w-[120px] sm:w-[160px] md:w-[200px]" />
            <img src="/kbrand/edell_2.png" alt="items5" className="w-[120px] sm:w-[160px] md:w-[200px]" />
            <img src="/kbrand/lika.png" alt="items6" className="w-[120px] sm:w-[160px] md:w-[200px]" />
          </div>
        </div>
      </section>

      <section className="relative w-full py-10 overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <h1 className="text-[80px] sm:text-[150px] md:text-[200px] font-extrabold text-black opacity-10 tracking-tighter">
            OHESHIO
          </h1>
        </div>
        <div className="relative z-10 flex flex-wrap justify-center gap-6 w-full">
          <img
            src="/oheshio/miseki/outer/black/p047_bow_over_cardigan/p047_2.png"
            alt="model1"
            className="w-full max-w-[300px] h-auto"
          />
          <img
            src="/oheshio/miseki/bottom/black/p068_side_bow_pleats_midi_skirt_/p068_2.png"
            alt="model2"
            className="w-full max-w-[300px] h-auto"
          />
          <img
            src="/oheshio/miseki/bottom/black/p070_draped_midi_skirt_pantsv/p070_2.png"
            alt="model3"
            className="w-full max-w-[300px] h-auto mt-4"
          />
        </div>
      </section>
    </>
  );
};

export default Kbrand;
