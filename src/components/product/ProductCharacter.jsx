import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const ProductCharacter = ({ product, commonDetails }) => {
  const { id, name, category, price, color, image, model_images } = product;
  const { description, material, care, size_info } = commonDetails;
  const typedElement1 = useRef(null);
  const typedElement2 = useRef(null);
  const typedElementmo1 = useRef(null);
  const typedElementmo2 = useRef(null);
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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full xl:w-2/3 px-4 py-6 md:py-0 md:px-6 lg:px-0'>
      <div
        className='relative group select-none'
        onMouseEnter={() => {
          handleMouseEnterLine1();
          handleMouseEnterLine2();
        }}
        onMouseLeave={() => {
          handleMouseLeaveLine1();
          handleMouseLeaveLine2();
        }}
      >
        <div className='character_animation_contain absolute top-[6%] hidden xl:flex xl:overflow-visible  xl:left-[-22%] z-10 w-[60%] h-[200px]  items-end justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in'>
          <div className='animation_text text-xs sm:text-sm text-black w-[140px] sm:w-[180px] md:w-[200px] absolute bottom-[-50%] right-[10%]'>
            <span ref={typedElement1}></span>
            <div ref={typedElement2}></div>
          </div>
          <div className='animation_line_01 w-[120px] sm:w-[160px] md:w-[200px] h-[1px] block -mt-[10px] relative'>
            <span className='w-full h-[1px] bg-black block transform scale-x-0 origin-right transition-transform duration-500 ease-in group-hover:scale-x-100 delay-300'></span>
          </div>

          <div className='animation_line_02 w-[30px] sm:w-[40px] md:w-[50px] h-[1px] block -mt-[10px] rotate-[-45deg] origin-right absolute bottom-0 right-[120px] sm:right-[160px] md:right-[200px]'>
            <span className='w-full h-[1px] bg-black block transform scale-x-0 origin-right transition-transform duration-300 ease-in delay-700 group-hover:scale-x-100'></span>
          </div>

          <div className='animation_marker w-[4px] h-[4px] md:w-[5px] md:h-[5px] bg-black block rounded-full absolute bottom-[-2px] right-0 opacity-0 transition-opacity duration-300 ease-in delay-200 group-hover:opacity-100'></div>
        </div>

        <div className='flex md:flex-row lg:flex-row xl:flex-col items-center'>
          <div className='lg:w-2/6 xl:w-3/5 mx-auto relative'>
            <img src={images[currentIndex]} className='w-full object-cover' alt={`${name} - model view`} />
          </div>

          <div className='lg:w-2/6 xl:w-3/5 mx-auto mt-4 md:mt-8'>
            <img src={image} className='w-full object-cover' alt={name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCharacter;
