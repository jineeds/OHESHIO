import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import SideMenuBar from '../../components/main/SideMenuBar';
import LiveChat from '../../components/main/LiveChatBot';

// YouTube 비디오 스타일 - 원래 방식을 유지하되 반응형으로 조정
const youtubeStyles = `
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
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

function App() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Function to navigate to product page
    const goToProductPage = () => {
        navigate('/product');
    };

    // 창 크기 변경 감지
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // YouTube API 로드 및 초기화
    useEffect(() => {
        // YouTube IFrame API를 비동기로 로드
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // API가 준비되면 호출될 콜백 함수
        window.onYouTubePlayerAPIReady = () => {
            new window.YT.Player('player', {
                videoId: 'pSUydWEqKwE', // 제공한 유튜브 영상 ID
                playerVars: {
                    autoplay: 1, // 자동 재생
                    loop: 1, // 반복 재생
                    playlist: 'pSUydWEqKwE', // 반복 재생할 영상 ID
                    controls: 0, // 컨트롤 숨김
                    showinfo: 0, // 영상 정보 숨김
                    rel: 0, // 관련 영상 숨김
                    disablekb: 1, // 키보드 컨트롤 비활성화
                    iv_load_policy: 3, // 주석 숨김
                    start: 66,
                    end: 90,
                },
                events: {
                    onReady: (event) => {
                        event.target.mute(); // 음소거
                        event.target.playVideo(); // 재생 시작
                    },
                },
            });
        };

        // 컴포넌트 언마운트 시 정리
        return () => {
            window.onYouTubePlayerAPIReady = null;
        };
    }, []);

    // 그리드 열 수 계산 (반응형)
    const getGridColumnClass = () => {
        if (windowWidth < 768) {
            return 'w-1/2'; // 모바일: 2열
        } else if (windowWidth < 1280) {
            return 'w-1/3'; // 태블릿: 3열
        } else if (windowWidth < 1536) {
            return 'w-1/4'; // 작은 데스크탑: 4열
        } else {
            return 'w-1/5'; // 큰 데스크탑: 5열
        }
    };

    // Sample product data - you could replace this with your actual data source
    const products = [
        {
            id: 1,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 2,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 3,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 4,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 5,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 6,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 7,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 8,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 9,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 10,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 11,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 12,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 13,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 14,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
        {
            id: 15,
            name: 'HEAVY HOOD',
            price: '145.00 USD',
            sizes: 'XS S M L XL XXL',
            image: '/public/images/RTBTANKROCK.png',
        },
    ];

    // 반응형 그리드 클래스
    const gridColumnClass = getGridColumnClass();

    return (
        <div className='w-full max-w-[1920px] h-full mx-auto'>
            {/* 인라인 스타일 추가 */}
            <style>{youtubeStyles}</style>

            {/* 헤더 섹션 (유튜브 영상 배경) */}
            <header className='relative'>
                {/* 유튜브 비디오 섹션 - 원래 구조 유지 */}
                <section className='youtube'>
                    <div className='youtube__area'>
                        <div id='player' className='player'></div>
                    </div>
                    <div className='youtube__cover'></div>
                </section>

                {/* 상단 메뉴 - 반응형 */}
                <div className='absolute top-2 md:top-3 xl:top-5 left-1/2 transform -translate-x-1/2 text-center'>
                    <div className='text-base font-medium text-white tracking-wider mb-1'>
                        <img
                            src='/public/images/logo.png'
                            alt='logo'
                            className='w-24 md:w-32 xl:w-36 2xl:w-44 h-auto'
                        />
                    </div>
                </div>

                {/* 상단 우측 bag 메뉴 - 반응형 */}
                <div className='absolute top-2 md:top-3 xl:top-5 right-2 md:right-3 xl:right-5 text-right'>
                    <div className='text-xs md:text-sm text-white cursor-pointer font-medium hover:opacity-80'>bag</div>
                </div>

                {/* 우측 refine 메뉴 (더 아래에 위치) - 반응형 */}
                <div className='absolute top-10 md:top-14 xl:top-20 right-4 md:right-8 xl:right-12 text-right'>
                    <div className='relative'>
                        <div
                            className='text-xs md:text-sm text-white cursor-pointer font-medium hover:opacity-80'
                            onClick={toggleMenu}
                        >
                            refine
                        </div>

                        {/* 토글되는 드롭다운 메뉴 */}
                        <div
                            className={`absolute right-0 top-full mt-2 transition-all duration-300 overflow-hidden z-10 w-[100px] md:w-[120px]
                            ${isMenuVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                        >
                            <div className='py-2 text-right pr-4'>
                                <div className='text-xs md:text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    all
                                </div>
                                <div className='text-xs md:text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    outer
                                </div>
                                <div className='text-xs md:text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    tops
                                </div>
                                <div className='text-xs md:text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    bottoms
                                </div>
                                <div className='text-xs md:text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    acc
                                </div>

                                {/* 색상 선택 섹션 */}
                                <div className='bg-[#cbd5e1] shadow-md p-2 md:p-4 mt-2'>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#B7B7B7]'></div>
                                        <span className='text-gray-700 text-xs md:text-sm'>gray</span>
                                    </div>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#000000]'></div>
                                        <span className='text-gray-700 text-xs md:text-sm'>black</span>
                                    </div>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FFFFFF] border border-gray-200'></div>
                                        <span className='text-gray-700 text-xs md:text-sm'>white</span>
                                    </div>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FCF2D6]'></div>
                                        <span className='text-gray-700 text-xs md:text-sm'>begie</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#CEE3FC]'></div>
                                        <span className='text-gray-700 text-xs md:text-sm'>blue</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 제품 그리드 - 반응형으로 수정 */}
            <div className='flex flex-wrap p-3 md:p-6 xl:p-8 2xl:p-12'>
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={`${gridColumnClass} px-2 md:px-3 xl:px-4 mb-4 md:mb-6 xl:mb-8`}
                        onClick={goToProductPage} // Add onClick handler to navigate to product page
                    >
                        <div className='w-full h-auto md:h-[400px] xl:h-[450px] 2xl:h-[500px] rounded-lg overflow-hidden flex flex-col items-center '>
                            <div className='w-auto h-auto md:w-[180px] md:h-[240px] xl:w-[215px] xl:h-[283px] flex justify-center items-center rounded-lg mt-4 md:mt-[40px] xl:mt-[60px] mb-4 md:mb-6 xl:mb-10 transition-all duration-300'>
                                <img
                                    src={product.image}
                                    className='h-full w-full object-contain transition-all duration-300'
                                    style={{ filter: 'drop-shadow(0px 0px 0px transparent)' }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.filter = 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4))';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.filter = 'drop-shadow(0px 0px 0px transparent)';
                                    }}
                                    alt={product.name}
                                />
                            </div>
                            <div className='text-center text-sm text-gray-700 leading-relaxed'>
                                <p className='text-xs md:text-sm xl:text-[16px]'>{product.name}</p>
                                <p className='text-xs md:text-sm xl:text-[16px]'>{product.price}</p>
                                <p className='text-xs md:text-xs xl:text-[14px] text-[#9CA3AF] mt-1 md:mt-2 xl:mt-3'>
                                    {product.sizes}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 사이드메뉴바 */}
            <SideMenuBar isChatOpen={isChatOpen} setIsChatOpen={toggleChat} />

            {/* 채팅 컴포넌트 */}
            {isChatOpen && <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
        </div>
    );
}

export default App;
