import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const ProductCharacter = ({ product, commonDetails }) => {
  const { id, name, category, price, color, image, model_images } = product;
  const { description, material, care, size_info } = commonDetails;
  const typedElement1 = useRef(null);
  const typedElement2 = useRef(null);
  const typedInstance1 = useRef(null);
  const typedInstance2 = useRef(null);

  const handleMouseEnterLine1 = () => {
    if (!typedInstance1.current) {
      const options1 = {
        strings: ["height '166cm'"],
        typeSpeed: 50,

        loop: false,
      };
      typedInstance1.current = new Typed(typedElement1.current, options1);
    }
  };

  // 두 번째 줄 마우스 오버 핸들러
  const handleMouseEnterLine2 = () => {
    if (!typedInstance2.current) {
      const options2 = {
        strings: ["wears size : 'S'"],
        typeSpeed: 50,

        loop: false,
      };
      typedInstance2.current = new Typed(typedElement2.current, options2);
    }
  };

  // 첫 번째 줄 마우스 치우기 핸들러
  const handleMouseLeaveLine1 = () => {
    if (typedInstance1.current) {
      typedInstance1.current.destroy(); // 첫 번째 Typed.js 인스턴스 제거
      typedInstance1.current = null;
    }
  };

  // 두 번째 줄 마우스 치우기 핸들러
  const handleMouseLeaveLine2 = () => {
    if (typedInstance2.current) {
      typedInstance2.current.destroy(); // 두 번째 Typed.js 인스턴스 제거
      typedInstance2.current = null;
    }
  };

  const images = model_images;

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleMouseLeave = (e) => {
    const container = e.currentTarget;

    // 마커 먼저 사라지기
    const marker = container.querySelector('.animation-marker');
    marker.style.opacity = 0;
    marker.style.transitionDelay = '0ms';

    // 두 번째 라인 사라지기
    const line2 = container.querySelector('.animation-line-02 span');
    line2.style.transform = 'scaleX(0)';
    line2.style.transitionDelay = '100ms';

    // 첫 번째 라인 사라지기
    const line1 = container.querySelector('.animation-line-01 span');
    line1.style.transform = 'scaleX(0)';
    line1.style.transitionDelay = '600ms';
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-[60%] ml-[5%] min-h-[80vh] flex items-center pl-5 justify-center flex-wrap'>
      <div
        className=' top_character_img group select-none'
        onMouseEnter={() => {
          handleMouseEnterLine1();
          handleMouseEnterLine2();
        }}
        onMouseLeave={() => {
          handleMouseLeaveLine1();
          handleMouseLeaveLine2();
        }}
      >
        <div>
          <div className='character_animation_contain absolute top-[6%] left-[-30%] z-[1000] w-[60%] h-[200px] flex items-end justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in '>
            <div className='animation_text text-sm text-black w-[200px]  absolute bottom-[-50%] right-[10%]   '>
              <span ref={typedElement1}></span>
              <div ref={typedElement2}></div>
            </div>
            <div className='animation_line_01 w-[200px] h-[1px] block -mt-[10px] relative'>
              <span className='w-full h-[1px] bg-black block transform scale-x-0 origin-right transition-transform duration-500 ease-in group-hover:scale-x-100 delay-300'></span>
            </div>

            <div className='animation_line_02 w-[50px] h-[1px] block -mt-[10px] rotate-[-45deg] origin-right absolute bottom-0 right-[200px]'>
              <span className='w-full h-[1px] bg-black block transform scale-x-0 origin-right transition-transform duration-300 ease-in delay-700 group-hover:scale-x-100'></span>
            </div>

            <div className='animation_marker w-[5px] h-[5px] bg-black block rounded-full absolute bottom-[-2px] right-0 opacity-0 transition-opacity duration-300 ease-in delay-200 group-hover:opacity-100'></div>
          </div>
        </div>

        <div className='flex flex-col gap-20'>
          <div className='w-full max-h-screen  relative'>
            <img src={images[currentIndex]} className='w-full h-full mt-[-150px] ' alt={name} />
          </div>
          <div className='w-full max-h-screen '>
            <img src={image} className='w-full h-full ' alt={name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCharacter;
