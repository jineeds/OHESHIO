import React, { useState, useEffect } from 'react';
import { SiOperagx } from 'react-icons/si';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full h-11 transition-all duration-300 z-50 ${
                    isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
                }`}
            >
                <div className='container mx-auto px-4 h-full relative'>
                    {/* 로고를 가운데 정렬 */}
                    <div className='absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2'>
                        <img src='/public/images/logo.png' alt='logo' width={144} />
                    </div>
                    <div className='text-xs md:text-sm font-medium absolute top-1/2 -translate-y-1/2 left-16 text-black'>
                        home
                    </div>

                    <div className='absolute top-1/2 -translate-y-1/2 right-36'>
                        <div className='group'>
                            <div className='text-sm  text-black cursor-pointer font-medium hover:opacity-80 mr-32 relative'>
                                collection
                            </div>
                            {/* Dropdown Menu */}
                            <div className='absolute left-0 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2'>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600'>
                                    uniform
                                </div>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600'>
                                    k-brand
                                </div>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600'>
                                    about
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='absolute top-1/2 -translate-y-1/2 right-44'>
                        <div className='group relative'>
                            <div className='text-sm text-black cursor-pointer font-medium hover:opacity-80 flex items-center justify-center'>
                                <SiOperagx className='text-lg' />
                            </div>
                            <div className='absolute left-1/2 -translate-x-1/2 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2'>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center'>
                                    sign up
                                </div>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center'>
                                    my page
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 장바구니 버튼 (우측 상단) */}
                    <div className='absolute top-1/2 -translate-y-1/2 right-16'>
                        <div className='text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80'>
                            bag
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
