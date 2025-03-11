import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/modules/authSlice';

const SideMenuBar = ({ setIsChatOpen }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux store에서 현재 사용자 정보 가져오기 (authR 리듀서 사용)
    const currentUser = useSelector((state) => state.authR.currentUser);
    const recentlyViewed = currentUser?.recentlyViewed || [];
    const recentCategories = currentUser?.recentCategories || [];

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

    // 히스토리 패널 토글
    const toggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
    };

    // 최근 본 상품 제거
    const handleRemoveItem = (itemId) => {
        dispatch(authActions.removeRecentlyViewed(itemId));
    };

    // 최근 본 카테고리 제거
    const handleRemoveCategory = (categoryId) => {
        dispatch(authActions.removeRecentCategory(categoryId));
    };

    // 상품 클릭 핸들러 - 상품 상세 페이지로 이동
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // 카테고리 클릭 핸들러 - 카테고리 페이지로 이동
    const handleCategoryClick = (category) => {
        navigate(`/category/${category.id}`);
    };

    return (
        <>
            {/* 사이드 메뉴 버튼들 */}
            <div
                className={`fixed right-4 bottom-4 bg-primary-300 rounded-lg p-3 flex flex-col gap-3 transition-all duration-300 z-40 ${
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
                        stroke='#375785'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                    </svg>
                </button>

                {/* Chat Button */}
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
                <button>
                    <a
                        href='https://www.instagram.com/oheshio/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-12 h-12 bg-[#F1F5F9] rounded-full flex justify-center items-center hover:bg-white transition-colors duration-200 cursor-pointer'
                    >
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
                    </a>
                </button>

                {/* Clock / History - 히스토리 토글 기능 추가 */}
                <button
                    onClick={toggleHistory}
                    className={`w-12 h-12 ${
                        isHistoryOpen ? 'bg-white' : 'bg-[#F1F5F9]'
                    } rounded-full flex justify-center items-center hover:bg-white transition-colors duration-200 cursor-pointer`}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke={isHistoryOpen ? '#375785' : '#64748B'}
                    >
                        <circle cx='12' cy='12' r='9' strokeWidth={2} />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 7v5l3 3' />
                    </svg>
                </button>
                {isHistoryOpen && (
                    <div className='fixed right-20 bottom-0 bg-primary-200 rounded-lg shadow-lg z-50 w-[776px] h-[317px] transition-all duration-300'>
                        <div className='flex h-full'>
                            {/* 왼쪽 섹션 - 최근 본 카테고리 */}
                            <div className='w-1/2 p-6 relative'>
                                {/* 중간에만 표시되는 세로 구분선 */}
                                <div className='absolute right-0 top-[20px] h-[280px] w-[1px] bg-primary-400' />
                                <h2 className='font-mono text-2xl font-bold text-gray-800 mb-6'>History</h2>

                                {recentCategories && recentCategories.length > 0 ? (
                                    <div className='space-y-4 overflow-y-auto max-h-[200px]'>
                                        {recentCategories.map((category) => (
                                            <div key={category.id} className='relative group'>
                                                <div
                                                    onClick={() => handleCategoryClick(category)}
                                                    className='flex items-center p-1 cursor-pointer transition-colors'
                                                >
                                                    {/* 카테고리 이름 */}
                                                    <span className='font-korean text-gray-500'>{category.name}</span>
                                                </div>

                                                {/* 카테고리 제거 버튼 (호버시 표시) - 위치 수정 및 X 중앙 정렬 */}
                                                <button
                                                    className='absolute top-1 right-1 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                                                    onClick={() => handleRemoveCategory(category.id)}
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        className='h-3 w-3'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        stroke='currentColor'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M12 6L12 18M6 12l12 0'
                                                            transform='rotate(45 12 12)'
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-gray-400'>No recent categories.</p>
                                )}
                            </div>

                            {/* 오른쪽 섹션 - 최근 본 상품 */}
                            <div className='w-1/2 p-6'>
                                <h2 className='text-base font-bold text-gray-800 mb-6'>Recently Viewed</h2>
                                {recentlyViewed.length > 0 ? (
                                    <div className='flex flex-wrap gap-4 overflow-y-auto max-h-[200px]'>
                                        {recentlyViewed.map((item) => (
                                            <div key={item.id} className='relative group'>
                                                <div
                                                    className='w-20 h-20 overflow-hidden cursor-pointer'
                                                    onClick={() => handleProductClick(item.id)}
                                                >
                                                    <img
                                                        src={item.imageUrl}
                                                        alt='Product'
                                                        className='w-full h-full object-cover'
                                                    />
                                                </div>
                                                {/* 아이템 제거 버튼 (호버시 표시) - 위치 수정 및 X 중앙 정렬 */}
                                                <button
                                                    className='absolute top-1 right-1 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        className='h-3 w-3'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        stroke='currentColor'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth={2}
                                                            d='M12 6L12 18M6 12l12 0'
                                                            transform='rotate(45 12 12)'
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-gray-400'>No recently viewed items.</p>
                                )}
                            </div>
                        </div>

                        {/* 닫기 버튼 - X 중앙 정렬 */}
                        <button
                            onClick={toggleHistory}
                            className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 6L12 18M6 12l12 0'
                                    transform='rotate(45 12 12)'
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SideMenuBar;
