import React from 'react';

const About = () => {
  return (
    <div className="w-full max-w-[1920px] mx-auto">
      <style>
        {`
          .youtube {
            position: relative;
            height: 300px;
            overflow: hidden;
          }

          @media (min-width: 768px) {
            .youtube {
              height: 400px;
            }
          }

          @media (min-width: 1280px) {
            .youtube {
              height: 500px;
            }
          }

          @media (min-width: 1536px) {
            .youtube {
              height: 600px;
            }
          }

          .youtube__area {
            width: 1920px;
            position: absolute;
            left: 50%;
            margin-left: -960px;
            top: 50%;
            margin-top: -540px;
          }

          .youtube__area::before {
            content: "";
            display: block;
            width: 100%;
            height: 0;
            padding-top: 56.25%;
          }

          .youtube__cover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
          }

          .player {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}
      </style>

      <section className="youtube">
        <div className="youtube__area">
          <iframe
            className="player"
            src="https://www.youtube.com/embed/-4Rhx3Eev6I?autoplay=1&mute=1&controls=0&loop=1&playlist=-4Rhx3Eev6I&rel=0&modestbranding=1"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="youtube__cover"></div>
      </section>
      {/* 어바웃어스 소개글 섹션 */}
      <div>
        <div>about us</div>
        <p>
          Oheshio is a brand that pursues new trends with unrefined values and allows you to freely express your own
          values and personalities
        </p>
      </div>

      {/* 오헤시오 로고 섹션 */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-center px-4 lg:px-16 py-12 bg-white">
        {/* 모델 이미지 */}
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src="./oheshio/outer/black/p002_round_collar_semi-crop_jacket/p002_3.png"
            alt="Ohesho Model"
            className="max-w-[300px] md:max-w-[400px] lg:max-w-[450px] object-contain"
          />
        </div>

        {/* 텍스트 및 로고 영역 */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <img
            src="/images/logo.png" // 로고 이미지가 따로 있다면 이 부분에 로고 이미지 src로 교체하세요.
            alt="OHESHIO Logo"
            className="w-[180px] md:w-[220px] mx-auto lg:mx-0 mb-4"
          />
          <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-[400px] mx-auto lg:mx-0">
            오헤시오는 정체되지 않은 가치를 담아 트렌드를 새롭게 구축하며,
            <br />
            자신의 가치관과 개성을 자유롭게 표현할 수 있도록 하는 브랜드입니다.
          </p>
        </div>

        {/* 고객 응대 안내 / 연락 정보 안내 */}
        <div>
          <div>Contact Information</div>
          <p>
            Our customer service hours are from 10:00 AM to 4:00 PM on weekdays, excluding public holidays. Please
            contact us by phone or email below and we will respond in order. For business-related inquiries, please
            contact us by email below.
          </p>
        </div>

        <section className="w-full flex flex-col md:flex-row">
          {/* LEFT - Customer Service Info */}
          <div
            className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-cover bg-center relative"
            // style={{ backgroundImage: `url(${bgLeft})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
              <p className="text-xs md:text-sm font-mono tracking-wide">MON–FRI : 10:00AM – 16:00PM</p>
              <p className="text-xs md:text-sm font-mono mt-2">cs@oheshio.com</p>
              <p className="text-xs md:text-sm font-mono mt-1">+82 3144-2595</p>
            </div>
          </div>

          {/* RIGHT - Head Office Info */}
          <div
            className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-cover bg-center relative"
            // style={{ backgroundImage: `url(${bgRight})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
              <p className="text-xs md:text-sm font-mono tracking-wide">
                HEAD OFFICE : 3F, 47, Tojeong-ro, Mapo-gu,
                <br /> Seoul, Republic of Korea
              </p>
              <p className="text-xs md:text-sm font-mono mt-2">oheshio@gmail.com</p>
            </div>
          </div>
        </section>

        {/* 판매점 안내 */}
        <div>
          <div>All Store</div>
          <p>
            Our customer service hours are from 10:00 AM to 4:00 PM on weekdays, excluding public holidays. Please
            contact us by phone or email below and we will respond in order. For business-related inquiries, please
            contact us by email below.
          </p>
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <img
            src="/images/logo.png" // 로고 이미지가 따로 있다면 이 부분에 로고 이미지 src로 교체하세요.
            alt="이미지샘플"
            className="w-[180px] md:w-[220px] mx-auto lg:mx-0 mb-4"
          />
          <h3>OFFLINE</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-[400px] mx-auto lg:mx-0">
            MUSINSA SEONGSU
            <br />
            74, Seongsui-ro, Seongdong-gu, Seoul,
            <br /> Republic of Korea
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-[400px] mx-auto lg:mx-0">
            MUSINSA HONGDAE
            <br />
            164, Yanghwa-ro, Mapo-gu, Seoul,
            <br />
            Republic of Korea
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-[400px] mx-auto lg:mx-0">
            MUSINSA DAEGU
            <br />
            12-13, Dongseong-ro 6-gil, Jung-gu, Daegu
            <br /> Republic of Korea
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-[400px] mx-auto lg:mx-0">
            TRIPLE STORE JEJU
            <br />
            2F 29 Gusan-ro, Jeju-si, Jeju-do,
            <br /> Republic of Korea
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-[400px] mx-auto lg:mx-0">
            MUSINSA HANNAM
            <br />
            266, Itaewon-ro, Yongsan-gu, Seoul
            <br /> Republic of Korea
            <br />
          </p>
          <h3>ONLINE</h3>
          <p>MUSINSA</p>
          <p>29CM</p>
          <p>MUSINSA GLOBAL</p>
          <p>NUGU JAPAN</p>
        </div>
      </section>
    </div>
  );
};

export default About;
