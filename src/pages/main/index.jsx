import React, { useState, useEffect } from 'react';
import SideMenuBar from '../../components/main/SideMenuBar';
import LiveChat from '../../components/main/LiveChatBot';

// YouTube 비디오 스타일
const youtubeStyles = `
  .youtube {
    position: relative;
    height: 600px;
    overflow: hidden;
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
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

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

    return (
        <div className='w-full max-w-[1920px] h-full mx-auto '>
            {/* 인라인 스타일 추가 */}
            <style>{youtubeStyles}</style>

            {/* 헤더 섹션 (유튜브 영상 배경) */}
            <header className='relative'>
                {/* 유튜브 비디오 섹션 */}
                <section className='youtube'>
                    <div className='youtube__area'>
                        <div id='player' className='player'></div>
                    </div>
                    <div className='youtube__cover'></div>
                </section>

                {/* 상단 메뉴 */}
                <div className='absolute top-5 left-1/2 transform -translate-x-1/2 text-center'>
                    <div className='text-base font-medium text-white tracking-wider mb-1'>
                        <img src='/public/images/logo.png' alt='logo' width={144} height={44} />
                    </div>
                </div>

                {/* 상단 우측 bag 메뉴 */}
                <div className='absolute top-5 right-5 text-right'>
                    <div className='text-sm text-white cursor-pointer font-medium hover:opacity-80'>bag</div>
                </div>

                {/* 우측 refine 메뉴 (더 아래에 위치) */}
                <div className='absolute top-20 right-12 text-right'>
                    <div className='relative'>
                        <div
                            className='text-sm text-white cursor-pointer font-medium hover:opacity-80'
                            onClick={toggleMenu}
                        >
                            refine
                        </div>

                        {/* 토글되는 드롭다운 메뉴 */}
                        <div
                            className={`absolute right-0 top-full mt-2 /90 transition-all duration-300 overflow-hidden z-10 w-[120px]
                            ${isMenuVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                        >
                            <div className='py-2 text-right pr-4'>
                                <div className='text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    all
                                </div>
                                <div className='text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    outer
                                </div>
                                <div className='text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    tops
                                </div>
                                <div className='text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    bottoms
                                </div>
                                <div className='text-sm text-white py-2 cursor-pointer font-medium hover:opacity-80'>
                                    acc
                                </div>

                                {/* 색상 선택 섹션 */}
                                <div className='bg-[#cbd5e1] shadow-md p-4 mt-2'>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='w-4 h-4 rounded-full bg-[#B7B7B7]'></div>
                                        <span className='text-gray-700 text-sm'>gray</span>
                                    </div>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='w-4 h-4 rounded-full bg-[#000000]'></div>
                                        <span className='text-gray-700 text-sm'>black</span>
                                    </div>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='w-4 h-4 rounded-full bg-[#FFFFFF] border border-gray-200'></div>
                                        <span className='text-gray-700 text-sm'>white</span>
                                    </div>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='w-4 h-4 rounded-full bg-[#FCF2D6]'></div>
                                        <span className='text-gray-700 text-sm'>begie</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='w-4 h-4 rounded-full bg-[#CEE3FC]'></div>
                                        <span className='text-gray-700 text-sm'>blue</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SideMenuBar 컴포넌트를 여기서 제거하고 아래에서 별도로 추가합니다 */}
                </div>
            </header>

            {/* 제품 그리드 - 한 그리드 안에 모든 제품을 표시합니다 */}
            <div className='flex flex-wrap p-12 bg-white'>
                {products.map((product) => (
                    <div key={product.id} className='w-1/5 px-4 mb-8'>
                        <div className='w-full h-[500px] rounded-lg overflow-hidden flex flex-col items-center transition-transform'>
                            <div className='w-[215px] h-[283px] flex justify-center items-center rounded-lg mt-[60px] mb-10 transition-all duration-300'>
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
                                <p className='text-[16px]'>{product.name}</p>
                                <p className='text-[16px]'>{product.price}</p>
                                <p className='text-[14px] text-[#9CA3AF] mt-3'>{product.sizes}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 사이드메뉴바와 라이브챗 컴포넌트 */}
            <SideMenuBar isChatOpen={isChatOpen} setIsChatOpen={toggleChat} />

            <div className='relative'>
                {/* Other content of your main component */}

                {/* 사이드메뉴바와 라이브챗 컴포넌트 - 항상 같은 위치에 있도록 배치 */}
                <div className='relative z-30'>
                    <SideMenuBar isChatOpen={isChatOpen} setIsChatOpen={toggleChat} />
                </div>

                {/* 라이브챗 컴포넌트 - isChatOpen 상태에 따라 조건부 렌더링 */}
                {isChatOpen && <LiveChat isOpen={isChatOpen} onClose={toggleChat} />}
            </div>
        </div>
    );
}

export default App;
