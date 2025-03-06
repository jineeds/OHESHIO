import React, { useRef, useState } from 'react';
import Typed from 'typed.js';

const ProductCharacter = () => {
    const typedElement1 = useRef(null); // 첫 번째 줄을 출력할 요소 참조
    const typedElement2 = useRef(null); // 두 번째 줄을 출력할 요소 참조
    const typedInstance1 = useRef(null); // 첫 번째 Typed.js 인스턴스 관리
    const typedInstance2 = useRef(null); // 두 번째 Typed.js 인스턴스 관리

    // 첫 번째 줄 마우스 오버 핸들러
    const handleMouseEnterLine1 = () => {
        if (!typedInstance1.current) {
            const options1 = {
                strings: ["OHESHIO fit 5'9 "], // 첫 번째 줄 텍스트
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
                strings: ['wears size : M'], // 두 번째 줄 텍스트
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
    return (
        <div className="w-[60%] ml-[5%] min-h-[80vh] flex items-center pl-5 justify-center flex-wrap">
            <div
                className=" top_character_img group"
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
                    <div className="character_animation_contain absolute top-[3%] left-[-30%] z-[1000] w-[60%] h-[200px] flex items-end justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in ">
                        <div className="animation_text text-sm text-black w-[200px]  absolute bottom-[-50px] right-[5%]   ">
                            <div ref={typedElement1}></div> {/* 첫 번째 줄 */}
                            <div ref={typedElement2}></div> {/* 두 번째 줄 */}
                        </div>
                        <div className="animation_line_01 w-[200px] h-[1px] block -mt-[10px]">
                            <span className="w-full h-[1px] bg-black block float-right transition-all duration-200 ease-in delay-500"></span>
                        </div>
                        <div className="animation_line_02 w-[50px] h-[1px] block -mt-[10px] origin-bottom-right">
                            <span className="w-full h-[1px] bg-black block float-right transition-all duration-200 ease-in delay-500"></span>
                        </div>
                        <div className="animation_marker w-[5px] h-[5px] bg-black block rounded-full absolute bottom-[-2px] right-0 transition-opacity duration-100 ease-in delay-700"></div>
                    </div>
                </div>

                <div>
                    <img src="public/images/model_thumbnail.png" alt="" />
                </div>
            </div>
            <div className="lower_character_img">
                <img src="public/images/model_2.png" alt="" />
            </div>
            <div className="lower_character_img">
                <img src="public/images/clothes.png" alt="" />
            </div>
        </div>
    );
};

export default ProductCharacter;
