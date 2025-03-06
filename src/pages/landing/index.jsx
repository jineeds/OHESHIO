// src/pages/Landing.jsx
import React, { useState } from 'react';
import BackgroundVideo from '../landing/BackgroundVideo';

const Landing = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [hoverCategory, setHoverCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        // 여기에 네비게이션이나 컨텐츠 변경 로직을 추가할 수 있습니다
    };

    // 마우스 호버 이벤트 핸들러
    const handleMouseEnter = (category) => {
        setHoverCategory(category);
    };

    const handleMouseLeave = () => {
        setHoverCategory(null);
    };

    return (
        <div className='w-screen h-screen overflow-hidden bg-gray-100'>
            <div className='relative w-full h-full max-w-[1920px] max-h-[1080px] mx-auto'>
                {/* 배경 비디오 컴포넌트 */}
                <BackgroundVideo category={hoverCategory} />

                {/* 컨텐츠 컨테이너 */}
                <div className='absolute inset-0 flex flex-col items-center justify-center z-20'>
                    {/* 로고 */}
                    <img src='/public/images/logo.png' alt='logo' />
                    {/* 카테고리 */}
                    <div className='flex space-x-10 mt-8'>
                        <button
                            className={`bg-E2E8F0 text-gray-400 px-10 py-4 rounded-full text-lg min-w-44 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:-translate-y-1 border-2 border-slate-500 ${
                                activeCategory === 'uniform' ? 'bg-opacity-100 -translate-y-1 shadow-lg' : ''
                            }`}
                            onClick={() => handleCategoryClick('uniform')}
                            onMouseEnter={() => handleMouseEnter('uniform')}
                            onMouseLeave={handleMouseLeave}
                        >
                            uniform
                        </button>
                        <button
                            className={`bg-E2E8F0 text-gray-400 px-10 py-4 rounded-full text-lg min-w-44 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:-translate-y-1 border-2 border-slate-500 ${
                                activeCategory === 'oheshio' ? 'bg-opacity-100 -translate-y-1 shadow-lg' : ''
                            }`}
                            onClick={() => handleCategoryClick('oheshio')}
                            onMouseEnter={() => handleMouseEnter('oheshio')}
                            onMouseLeave={handleMouseLeave}
                        >
                            About
                        </button>
                        <button
                            className={`bg-primary-500 text-gray-400 px-10 py-4 rounded-full text-lg min-w-44 transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg hover:-translate-y-1 border-2 border-slate-500 ${
                                activeCategory === 'about' ? 'bg-opacity-100 -translate-y-1 shadow-lg' : ''
                            }`}
                            onClick={() => handleCategoryClick('about')}
                            onMouseEnter={() => handleMouseEnter('about')}
                            onMouseLeave={handleMouseLeave}
                        >
                            oheshio-k
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
