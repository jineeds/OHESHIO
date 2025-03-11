import React from 'react';

const Kbrand = () => {
  return (
    <>
      <div>
        <img src="/kbrand/newjeans_cover2.jpeg.png" alt="cover" />
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
      <section>
        {/* 민지 섹션*/}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
          <div class="relative">
            <div class="absolute -top-4 -left-4 w-full h-full bg-secondary-200 z-0 rounded-md"></div>
            <img src="/kbrand/minji.jpg" alt="minji" class="relative z-10 rounded-md " />

            <div class="absolute top-2 right-2 bg-white text-xs px-3 py-1 rounded shadow">Minji Pick</div>
            <div class="absolute bottom-2 left-2 bg-white text-xs px-3 py-1 rounded shadow">
              Feather-Fit <br /> Roy S
            </div>
          </div>

          <div class="relative">
            <div class="">
              <img src="/kbrand/roy_2.png" alt="item1" />
            </div>
          </div>
          {/* 혜인 섹션 */}
          <div class="relative">
            <img src="/kbrand/hyein.jpg" alt="hyein" />

            <div class="absolute top-2 right-2 bg-white text-xs px-3 py-1 rounded shadow">Hyein Pick</div>
            <div class="absolute bottom-2 left-2 bg-white text-xs px-3 py-1 rounded shadow">
              Feather-Fit
              <br />
              Roy O
            </div>
          </div>
          <div class="relative">
            <div class="">
              <img src="/kbrand/roy_3.png" alt="item2" />
            </div>
          </div>
          {/* 하니섹션 */}
          <div class="relative">
            <img src="/kbrand/hanni.jpg" alt="hanni" />

            <div class="absolute top-2 right-2 bg-white text-xs px-3 py-1 rounded shadow">Hanna Pick</div>
            <div class="absolute bottom-2 left-2 bg-white text-xs px-3 py-1 rounded shadow">
              Balance
              <br />
              Lika O
            </div>
          </div>
          <div class="relative">
            <div class="">
              <img src="/kbrand/lika.png" alt="item3" />
            </div>
          </div>
        </div>
        {/* add 섹션 */}
        <div>
          <img src="/kbrand/addtext.png" alt="add" />
        </div>
        {/* 혜린섹션 */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
          <div class="relative">
            <img src="/kbrand/hearin.jpg" alt="hearin" />

            <div class="absolute top-2 right-2 bg-white text-xs px-3 py-1 rounded shadow">Haerin Pick</div>
            <div class="absolute bottom-2 left-2 bg-white text-xs px-3 py-1 rounded shadow">
              Feather-Fit <br /> Roy O
            </div>
          </div>

          <div class="relative">
            <div class="">
              <img src="/kbrand/roy_1.png" alt="item4" />
            </div>
          </div>
          {/* 다니엘 섹션 */}
          <div class="relative">
            <img src="/kbrand/daniel.jpg" alt="daniel" />

            <div class="absolute top-2 right-2 bg-white text-xs px-3 py-1 rounded shadow">Daniel Pick</div>
            <div class="absolute bottom-2 left-2 bg-white text-xs px-3 py-1 rounded shadow">
              Feather-Fit
              <br />
              Roy O
            </div>
          </div>
          <div class="relative">
            <div class="">
              <img src="/kbrand/edell_2.png" alt="item5" />
            </div>
          </div>
        </div>
      </section>
      {/* 아이템 6가지 섹션 */}
      <section className="text-center py-16 px-4 mt-">
        <button
          className="inline-flex items-center justify-center px-12
    py-2 border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full text-lg font-medium mb-6"
        >
          collaboration Items
        </button>
        <p className="text-body1 text-gray-500 leading-relaxed max-w-[1280px] mx-auto">
          We introduce various items worn by New Jeans in the pictorial.
        </p>
        <div class="bottom-2 left-2 bg-white text-xs px-3 py-1 rounded shadow">Feather-Fit</div>
        <div class="">
          <img src="/kbrand/roy_1.png" alt="items1" />
          <img src="/kbrand/roy_2.png" alt="items2" />
          <img src="/kbrand/roy_3.png" alt="items3" />
        </div>
        <div class="bottom-2 left-2 bg-white text-xs px-3 py-1 rounded shadow">Feather-Fit</div>
        <div class="">
          <img src="/kbrand/edell_1.png" alt="items4" />
          <img src="/kbrand/edell_2.png" alt="items5" />
          <img src="/kbrand/lika.png" alt="items6" />
        </div>
      </section>
      <section>
        <div>
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div>
          <img src="/oheshio/miseki/outer/black/p047_bow_over_cardigan/p047_2.png" alt="model1" />
          <img src="/oheshio/miseki/bottom/black/p068_side_bow_pleats_midi_skirt_/p068_2.png" alt="model2" />
          <img src="/oheshio/miseki/bottom/black/p070_draped_midi_skirt_pantsv/p070_2.png" alt="model3" />
        </div>
      </section>
    </>
  );
};

export default Kbrand;
