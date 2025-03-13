import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/modules/authSlice';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SideMenuBar = ({ setIsChatOpen, onAddRecentItem }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux store에서 현재 사용자 정보 가져오기 (authR 리듀서 사용)
    const currentUser = useSelector((state) => state.authR.currentUser);

    // 빈 배열로 초기화 - main 페이지에서 제품을 클릭해야만 항목이 추가됨
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    // 첫 마운트 시 currentUser의 recentlyViewed 데이터 가져오기
    useEffect(() => {
        if (currentUser) {
            // 객체가 존재하는지 && 프로퍼티가 존재하는지 확인
            setRecentlyViewed(currentUser?.recentlyViewed || []);
        } else {
            // setRecentCategories([]);
            setRecentlyViewed([]);
        }
    }, [currentUser]);

    // 화면 크기 변경 감지하여 isDesktop 상태 업데이트
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1280);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 스크롤 이벤트 처리
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

    // 스와이퍼 초기화 - 고유 ID를 사용하여 여러 인스턴스 충돌 방지
    useEffect(() => {
        let swiperInstance = null;

        if (isHistoryOpen) {
            try {
                swiperInstance = new Swiper('.side-menu-swiper-container', {
                    modules: [Pagination, Autoplay],
                    slidesPerView: 1,
                    spaceBetween: 10,
                    loop: true,
                    autoplay: {
                        delay: 1500,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.side-menu-swiper-pagination',
                        clickable: true,
                    },
                });
            } catch (error) {
                console.error('Swiper initialization error:', error);
            }
        }

        // 컴포넌트 언마운트 시 정리 - null 체크 추가
        return () => {
            if (swiperInstance) {
                swiperInstance.destroy();
            }
        };
    }, [isHistoryOpen]);

    // 탑 버튼 클릭 시 페이지 최상단으로 스크롤
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // 히스토리 패널 토글 - useCallback으로 최적화
    const toggleHistory = useCallback(() => {
        setIsHistoryOpen((prevState) => !prevState);
    }, []);

    // 최근 본 상품 추가 (제품 페이지에서 호출) - useCallback으로 최적화
    const addRecentlyViewedItem = useCallback(
        (product) => {
            if (!product) return;

            // 이미 있는 경우 제외하고 최신 항목을 앞에 추가
            setRecentlyViewed((prevItems) => [product, ...prevItems.filter((item) => item.id !== product.id)]);

            // Redux 액션 디스패치 (필요한 경우)
            if (currentUser) {
                dispatch(authActions.addRecentlyViewed(product));
            }
        },
        [currentUser, dispatch]
    );

    // 외부에서 전달된 onAddRecentItem prop이 있으면 addRecentlyViewedItem 함수 연결
    useEffect(() => {
        if (onAddRecentItem) {
            onAddRecentItem(addRecentlyViewedItem);
        }
    }, [onAddRecentItem, addRecentlyViewedItem]);

    // 최근 본 상품 제거 - useCallback으로 최적화
    const handleRemoveItem = useCallback(
        (itemId) => {
            setRecentlyViewed((prevItems) => prevItems.filter((item) => item.id !== itemId));

            // Redux 액션 디스패치
            if (currentUser) {
                dispatch(authActions.removeRecentlyViewed(itemId));
            }
        },
        [currentUser, dispatch]
    );

    // 최근 본 상품 전체 삭제 - useCallback으로 최적화
    const clearAllRecentlyViewed = useCallback(() => {
        // 로컬 상태 업데이트
        setRecentlyViewed([]);

        if (currentUser) {
            dispatch(authActions.clearAllRecentlyViewed());
        }
    }, [currentUser, dispatch]);

    // 상품 클릭 핸들러 - 상품 상세 페이지로 이동 - useCallback으로 최적화
    const handleProductClick = useCallback(
        (productId) => {
            navigate(`/product/${productId}`);
        },
        [navigate]
    );

    // 채팅 창 열기 핸들러 - setIsChatOpen을 함수로 전달받았을 때 처리
    const handleChatOpen = useCallback(() => {
        // setIsChatOpen이 함수인 경우 토글 방식으로 호출, 아니면 true로 설정
        if (typeof setIsChatOpen === 'function') {
            setIsChatOpen((prev) => (typeof prev === 'boolean' ? !prev : true));
        }
    }, [setIsChatOpen]);

    // 데스크탑이 아닌 경우 아무것도 렌더링하지 않음
    if (!isDesktop) {
        return null;
    }

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
                    onClick={handleChatOpen}
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

                {/* Instagram - a 태그 유지 */}
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

                {/* Clock / History - 히스토리 토글 기능 */}
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

                {/* 히스토리 패널 (isHistoryOpen이 true일 때만 렌더링) */}
                {isHistoryOpen && (
                    <div className='fixed right-20 bottom-0 bg-primary-200 rounded-lg shadow-lg z-50 w-[776px] h-[317px] transition-all duration-300'>
                        <div className='flex h-full'>
                            {/* 왼쪽 섹션 - 사진 스와이퍼 */}
                            <div className='w-1/2 p-6 relative'>
                                {/* 중간에만 표시되는 세로 구분선 */}
                                <div className='absolute right-0 top-[20px] h-[280px] w-[1px] bg-primary-400' />

                                {/* 스와이퍼 컴포넌트 */}
                                <div className='relative h-[275px] rounded-md overflow-hidden'>
                                    {/* 스와이퍼 컨테이너 - 클래스 이름 변경 */}
                                    <div className='side-menu-swiper-container'>
                                        <div className='swiper-wrapper'>
                                            {/* 지정된 안경 이미지 표시 */}
                                            {[
                                                '/images/glasses1.jpg',
                                                '/images/glasses2.jpg',
                                                '/images/glasses3.jpg',
                                                '/images/glasses4.jpg',
                                                '/images/glasses5.jpg',
                                            ].map((imagePath, index) => (
                                                <div key={index} className='swiper-slide'>
                                                    <div
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            window.location.href = '/kbrand';
                                                        }}
                                                    >
                                                        <img
                                                            src={imagePath}
                                                            alt={`안경 ${index + 1}`}
                                                            className='w-full h-full object-cover'
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* 스와이퍼 페이지네이션 - 클래스 이름 변경 */}
                                        <div className='side-menu-swiper-pagination'></div>
                                    </div>
                                </div>
                            </div>

                            {/* 오른쪽 섹션 - 최근 본 상품 */}
                            <div className='w-1/2 p-6'>
                                <div className='flex justify-between items-center mb-6'>
                                    <h2 className='text-base font-bold text-gray-800'>Recently Viewed</h2>

                                    {/* 전체 삭제 버튼 */}
                                    {recentlyViewed.length > 0 && (
                                        <button
                                            onClick={clearAllRecentlyViewed}
                                            className='font-mono text-xs mt-1 text-gray-500 hover:text-gray-700 transition-colors'
                                        >
                                            All Delete
                                        </button>
                                    )}
                                </div>

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
                                                {/* 아이템 제거 버튼 (호버시 표시) */}
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

                        {/* 닫기 버튼 */}
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
