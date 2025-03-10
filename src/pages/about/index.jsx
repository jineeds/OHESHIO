import React, { useEffect, useRef, useState } from 'react';
import { IoMdHeadset } from 'react-icons/io';
import { SiOperagx } from 'react-icons/si';

const FadeUpSection = ({ children }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const About = () => {
  const images = ['/about/aboutmodel1.png', '/about/aboutmodel2.png', '/about/aboutmodel3.png'];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      {/* 메인페이지 유튜브 코드 가져옴 */}
      <section className="youtube">
        <div className="youtube__area">
          <iframe
            className="player"
            src="https://www.youtube.com/embed/-4Rhx3Eev6I?autoplay=1&mute=1&controls=0&loop=1&playlist=-4Rhx3Eev6I&rel=0&modestbranding=1"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="youtube__cover"></div>
      </section>
      {/* 어바웃어스 소개글 섹션 */}
      <div className="w-full max-w-[1920px] mx-auto bg-white">
        <FadeUpSection>
          <section className="text-center py-16 px-4">
            <button
              className="inline-flex items-center justify-center px-12
           py-2 border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full text-lg font-medium mb-6"
            >
              About us
            </button>
            <p className="text-body1 text-gray-500 leading-relaxed max-w-[1280px] mx-auto">
              Oheshio is a brand that pursues new trends with unrefined values <br /> and allows you to freely express
              your own values and personalities.
            </p>
          </section>
        </FadeUpSection>

        {/* 브랜드 소개글 */}
        <FadeUpSection>
          <section className="flex flex-nowrap lg:flex-row items-center justify-center px-4 lg:px-16 py-16">
            <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
              <img
                src={images[currentIndex]}
                alt="Ohesho Model"
                className="max-w-[300px] md:max-w-[400px] lg:max-w-[450px] object-contain transition-opacity duration-700"
              />
            </div>
            <div className="lg:w-1/2 text-left lg:text-left">
              <img
                src="/images/logo.png"
                alt="OHESHIO Logo"
                className="w-[180px] md:w-[220px] mx-auto lg:mx-0 mb-4 items-start"
              />
              <p className="text-body1 md:text-base text-gray-500 leading-relaxed max-w-[600px] mx-auto lg:mx-0 font-korean">
                오헤시오는 정체되지 않은 가치를 담아 트렌드를 새롭게 구축하며,
                <br />
                자신의 가치관과 개성을 자유롭게 표현할 수 있도록 하는 브랜드입니다.
              </p>
            </div>
          </section>
        </FadeUpSection>

        <FadeUpSection>
          <section className="text-center py-16 px-4">
            <button
              className="inline-flex items-center justify-center px-12
           py-2 border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full text-lg font-medium mb-6"
            >
              Contact Information
            </button>
            <p className="text-body1 text-gray-500 leading-relaxed max-w-[1280px] mx-auto">
              Our customer service hours are from 10:00 AM to 4:00 PM on weekdays, excluding public holidays. <br />
              Please contact us by phone or email below and we will respond in order. <br />
              For business-related inquiries, please contact us by email below.
            </p>
          </section>
        </FadeUpSection>

        {/* 고객센터 / 오피스 정보 */}
        <FadeUpSection>
          <section className="w-full flex flex-col md:flex-row">
            <div
              className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-cover bg-center relative"
              style={{ backgroundImage: "url('/about/contactimg1.jpg')" }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
                <IoMdHeadset size={24} className="mb-4" />
                <p className="text-xs md:text-sm font-mono tracking-wide">MON–FRI : 10:00AM – 16:00PM</p>
                <p className="text-xs md:text-sm font-mono mt-2">cs@oheshio.com</p>
                <p className="text-xs md:text-sm font-mono mt-1">+82 3144-2595</p>
              </div>
            </div>
            <div
              className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-cover bg-center relative"
              style={{ backgroundImage: "url('/about/contactimg2.jpg')" }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
                <SiOperagx size={24} className="mb-4" />
                <p className="text-xs md:text-sm font-mono tracking-wide">
                  HEAD OFFICE : 3F, 47, Tojeong-ro, Mapo-gu,
                  <br />
                  Seoul, Republic of Korea
                </p>
                <p className="text-xs md:text-sm font-mono mt-2">oheshio@gmail.com</p>
              </div>
            </div>
          </section>
        </FadeUpSection>

        {/* All Store */}
        <FadeUpSection>
          <section className="text-center py-16 px-4 mt-">
            <button
              className="inline-flex items-center justify-center px-12
           py-2 border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full text-lg font-medium mb-6"
            >
              All Store
            </button>
            <p className="text-body1 text-gray-500 leading-relaxed max-w-[1280px] mx-auto">
              You can find OHESHIO products offline and online at the following stores.
            </p>
          </section>
        </FadeUpSection>

        <FadeUpSection>
          <section className="w-full lg:px-16 pb-16">
            <img src="/about/storeimg.jpg" alt="store" className="mb-10 w-full object-cover h-[300px] md:h-[400px]" />
            <div className="px-4 flex flex-col lg:flex-row justify-between gap-8">
              {/* OFFLINE */}
              <div className="w-full lg:w-2/3">
                <h3 className="text-lg font-semibold mb-4">OFFLINE</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">MUSINSA SEONGSU</p>
                    <p>
                      74, Seongsui-ro, Seongdong-gu, Seoul,
                      <br />
                      Republic of Korea
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">TRIPLE STORE JEJU</p>
                    <p>
                      2F 29 Gusan-ro, Jeju-si, Jeju-do,
                      <br />
                      Republic of Korea
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">MUSINSA HONGDAE</p>
                    <p>
                      164, Yanghwa-ro, Mapo-gu, Seoul,
                      <br />
                      Republic of Korea
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">MUSINSA HANNAM</p>
                    <p>
                      266, Itaewon-ro, Yongsan-gu, Seoul,
                      <br />
                      Republic of Korea
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">MUSINSA DAEGU</p>
                    <p>
                      12-13, Dongseong-ro 6-gil, Jung-gu, Daegu,
                      <br />
                      Republic of Korea
                    </p>
                  </div>
                </div>
              </div>
              {/* ONLINE */}
              <div className="w-full lg:w-1/3">
                <h3 className="text-lg font-semibold mb-4">ONLINE</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>MUSINSA</p>
                  <p>29CM</p>
                  <p>MUSINSA GLOBAL</p>
                  <p>NUGU JAPAN</p>
                </div>
              </div>
            </div>
          </section>
        </FadeUpSection>
      </div>
    </div>
  );
};

export default About;
