import React, { useState, useEffect } from 'react';

const SideMenuBar = ({ setIsChatOpen }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 탑 버튼 클릭 시 페이지 최상단으로 스크롤
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div
            className={`fixed right-4 bottom-4 bg-[#64748B] rounded-lg p-3 flex flex-col gap-3 transition-all duration-300 z-40 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
        >
            {/* Top Button */}
            <button
                onClick={scrollToTop}
                className='w-12 h-12 bg-[#F1F5F9] rounded-full flex justify-center items-center hover:bg-white transition-colors duration-200 cursor-pointer'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='#64748B'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                </svg>
            </button>

            {/* Chat Button - 이벤트 핸들러 추가 */}
            <button
                onClick={setIsChatOpen}
                className='w-12 h-12 bg-[#F1F5F9] rounded-full flex justify-center items-center hover:bg-white transition-colors duration-200 cursor-pointer'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='#64748B'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                    />
                </svg>
            </button>

            {/* Instagram */}
            <button className='w-12 h-12 bg-[#F1F5F9] rounded-full flex justify-center items-center hover:bg-white transition-colors duration-200 cursor-pointer'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='#64748B'
                >
                    <rect x='2' y='2' width='20' height='20' rx='5' strokeWidth={2} />
                    <circle cx='12' cy='12' r='4' strokeWidth={2} />
                    <circle cx='18' cy='6' r='1' strokeWidth={2} fill='#64748B' />
                </svg>
            </button>

            {/* Clock / History */}
            <button className='w-12 h-12 bg-[#F1F5F9] rounded-full flex justify-center items-center hover:bg-white transition-colors duration-200 cursor-pointer'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='#64748B'
                >
                    <circle cx='12' cy='12' r='9' strokeWidth={2} />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 7v5l3 3' />
                </svg>
            </button>
        </div>
    );
};

export default SideMenuBar;
