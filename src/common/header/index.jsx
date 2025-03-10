import React, { useState, useEffect } from 'react';
import { SiOperagx } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions } from '../../store/modules/productsSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { selectedColor } = useSelector((state) => state.productR);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isBottomMenuVisible, setIsBottomMenuVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1281);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            // Reset bottom menu visibility when resizing to desktop
            if (window.innerWidth >= 1280) {
                setIsBottomMenuVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Remove event listeners on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 카테고리 필터링 함수
    const filterByCategory = (category) => {
        dispatch(productsActions.filterByCategory(category));
        setIsBottomMenuVisible(false); // 필터 선택 후 메뉴 닫기
    };

    // 색상 필터링 함수
    const filterByColor = (color) => {
        dispatch(productsActions.selectColor(color));
        setIsBottomMenuVisible(false); // 필터 선택 후 메뉴 닫기
    };

    // 현재 선택된 색상에 따른 스타일 지정
    const getColorButtonStyle = (color) => {
        return {
            border: selectedColor === color ? '2px solid black' : 'none',
            transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.2s ease',
        };
    };

    // Check if we're in desktop view
    const isDesktop = windowWidth >= 1280;

    return (
        <>
            {/* Top Header */}
            <header
                className={`fixed top-0 left-0 w-full h-11 transition-all duration-300 z-[8000] ${
                    isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
                }`}
            >
                <div className='container mx-auto px-4 h-full relative'>
                    {/* Desktop only "home" text */}
                    <div className='hidden xl:block text-xs md:text-sm font-medium absolute top-1/2 -translate-y-1/2 left-16 text-black'>
                        <a href='/'>home</a>
                    </div>

                    {/* Mobile/Tablet Icon */}
                    <div className='block xl:hidden absolute top-1/2 -translate-y-1/2 left-16'>
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

                    {/* Logo (always centered) */}
                    <div className='absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2'>
                        <a href='/'>
                            <img src='/public/images/logo.png' alt='logo' width={144} />
                        </a>
                    </div>

                    {/* Desktop only collection dropdown */}
                    <div className='hidden xl:block absolute top-1/2 -translate-y-1/2 right-36'>
                        <div className='group'>
                            <div className='text-sm text-black cursor-pointer font-medium hover:opacity-80 mr-32 relative'>
                                collection
                            </div>
                            {/* Dropdown Menu */}
                            <div className='absolute left-0 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2'>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 '>
                                    uniform
                                </div>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 '>
                                    k-brand
                                </div>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 '>
                                    about
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop only SiOperagx icon */}
                    <div className='hidden xl:block absolute top-1/2 -translate-y-1/2 right-44'>
                        <div className='group relative'>
                            <div className='text-sm text-black cursor-pointer font-medium hover:opacity-80 flex items-center justify-center'>
                                <SiOperagx className='text-lg' />
                            </div>
                            <div className='absolute left-1/2 -translate-x-1/2 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2'>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center '>
                                    sign up
                                </div>
                                <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center '>
                                    my page
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shopping bag button (always in top right) */}
                    <div className='absolute top-1/2 -translate-y-1/2 right-16'>
                        <div className='text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80'>
                            bag
                        </div>
                    </div>
                </div>
            </header>

            {/* Bottom navigation bar (mobile/tablet only - shows on screens smaller than xl) */}
            {!isDesktop && (
                <div className='fixed bottom-0 left-0 w-full h-14 shadow-lg z-50 '>
                    <div className='container mx-auto h-full flex justify-center items-center '>
                        <div className='w-full max-w-md flex justify-around items-center'>
                            {/* Collection button */}
                            <div className='group relative'>
                                <div className='text-sm text-black cursor-pointer font-medium hover:opacity-80'>
                                    collection
                                </div>
                                {/* Dropdown Menu (opens upward) */}
                                <div className='absolute left-1/2 -translate-x-1/2 bottom-12 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 '>
                                    <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center'>
                                        uniform
                                    </div>
                                    <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center'>
                                        k-brand
                                    </div>
                                    <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center'>
                                        about
                                    </div>
                                </div>
                            </div>

                            {/* Refine button (bottom navigation) */}
                            <div className='relative'>
                                <div
                                    className='text-sm text-black cursor-pointer font-medium hover:opacity-80'
                                    onClick={() => setIsBottomMenuVisible(!isBottomMenuVisible)}
                                >
                                    refine
                                </div>
                                {/* Toggle dropdown menu */}
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 bottom-14 transition-all duration-300 overflow-hidden z-[8010] w-[120px] 
                                        ${
                                            isBottomMenuVisible
                                                ? 'max-h-[500px] opacity-100'
                                                : 'max-h-0 opacity-0 pointer-events-none'
                                        }`}
                                >
                                    <div className='py-2 text-right pr-4'>
                                        <div
                                            className='text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80'
                                            onClick={() => filterByCategory('all')}
                                        >
                                            all
                                        </div>
                                        <div
                                            className='text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80'
                                            onClick={() => filterByCategory('outer')}
                                        >
                                            outer
                                        </div>
                                        <div
                                            className='text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80'
                                            onClick={() => filterByCategory('top')}
                                        >
                                            tops
                                        </div>
                                        <div
                                            className='text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80'
                                            onClick={() => filterByCategory('bottom')}
                                        >
                                            bottoms
                                        </div>
                                        <div
                                            className='text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80'
                                            onClick={() => filterByCategory('acc')}
                                        >
                                            acc
                                        </div>

                                        {/* Color selection section */}
                                        <div className='bg-[#cbd5e1] border-primary-500 shadow-md p-4 bottom-4 mt-2 border '>
                                            <div
                                                className='flex items-center justify-between mb-2 cursor-pointer'
                                                onClick={() => filterByColor('gray')}
                                            >
                                                <div
                                                    className='w-4 h-4 rounded-full bg-[#B7B7B7]'
                                                    style={getColorButtonStyle('gray')}
                                                ></div>
                                                <span className='text-gray-700 text-xs md:text-sm'>gray</span>
                                            </div>
                                            <div
                                                className='flex items-center justify-between mb-2 cursor-pointer'
                                                onClick={() => filterByColor('black')}
                                            >
                                                <div
                                                    className='w-4 h-4 rounded-full bg-[#000000]'
                                                    style={getColorButtonStyle('black')}
                                                ></div>
                                                <span className='text-gray-700 text-xs md:text-sm'>black</span>
                                            </div>
                                            <div
                                                className='flex items-center justify-between mb-2 cursor-pointer'
                                                onClick={() => filterByColor('white')}
                                            >
                                                <div
                                                    className='w-4 h-4 rounded-full bg-[#FFFFFF] border border-gray-200'
                                                    style={getColorButtonStyle('white')}
                                                ></div>
                                                <span className='text-gray-700 text-xs md:text-sm'>white</span>
                                            </div>
                                            <div
                                                className='flex items-center justify-between mb-2 cursor-pointer'
                                                onClick={() => filterByColor('beige')}
                                            >
                                                <div
                                                    className='w-4 h-4 rounded-full bg-[#FCF2D6]'
                                                    style={getColorButtonStyle('beige')}
                                                ></div>
                                                <span className='text-gray-700 text-xs md:text-sm'>beige</span>
                                            </div>
                                            <div
                                                className='flex items-center justify-between cursor-pointer'
                                                onClick={() => filterByColor('blue')}
                                            >
                                                <div
                                                    className='w-4 h-4 rounded-full bg-[#CEE3FC]'
                                                    style={getColorButtonStyle('blue')}
                                                ></div>
                                                <span className='text-gray-700 text-xs md:text-sm'>blue</span>
                                            </div>

                                            {/* 선택된 색상이 있는 경우 Reset 버튼 표시 */}
                                            {selectedColor && (
                                                <div
                                                    className='flex justify-center mt-4 cursor-pointer bg-gray-200 py-1 px-2 rounded hover:bg-gray-300 bottom-4'
                                                    onClick={() => filterByColor(null)}
                                                >
                                                    <span className='text-xs font-medium'>Reset</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 모바일에서는 선택된 색상 표시 제거 */}
        </>
    );
};

export default Header;
