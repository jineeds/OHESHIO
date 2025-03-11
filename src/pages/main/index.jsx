import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SideMenuBar from '../../components/main/SideMenuBar';
import LiveChat from '../../components/main/LiveChatBot';
import Header from '../../common/header';
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../../store/modules/productsSlice';
import { authActions } from '../../store/modules/authSlice';

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
  // Redux에서 제품 정보와 commonDetails 가져오기
  const { products, filteredProducts, commonDetails, selectedColor } = useSelector((state) => state.productR);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const { authed, currentUser } = useSelector((state) => state.authR);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const goToProductPage = (productId) => {
    const product = products.find((p) => p.id === productId);

    if (product) {
      if (authed) {
        dispatch(
          authActions.addRecentlyViewed({
            id: product.id,
            name: product.name,
            color: product.color,
            price: `KRW ${product.price.toLocaleString()}`,
            quantity: 1,
            imageUrl: product.image,
          })
        );
      }
      dispatch(productsActions.selectProduct(productId));
      navigate(`/product/${productId}`);
    }
  };
  const addToWishlist = (productId, event) => {
    event.stopPropagation();
    if (!authed) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    const product = products.find((p) => p.id === productId);

    if (product) {
      dispatch(
        authActions.addWishlist({
          id: product.id,
          name: product.name,
          color: product.color,
          price: `KRW ${product.price.toLocaleString()}`,
          quantity: 1,
          imageUrl: product.image,
        })
      );
    }
  };
  // 카테고리 필터링 함수
  const filterByCategory = (category) => {
    dispatch(productsActions.filterByCategory(category));
    setIsMenuVisible(false); // 필터 선택 후 메뉴 닫기
  };

  // 색상 필터링 함수
  const filterByColor = (color) => {
    dispatch(productsActions.selectColor(color));
    setIsMenuVisible(false); // 필터 선택 후 메뉴 닫기
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

  // 초기 데이터 로드
  useEffect(() => {
    // 컴포넌트 마운트 시 모든 제품을 filteredProducts로 설정
    if (!filteredProducts || filteredProducts.length === 0) {
      dispatch(productsActions.filterByCategory('all'));
    }
  }, [dispatch, filteredProducts]);

  // YouTube API 로드 및 초기화
  useEffect(() => {
    // YouTube IFrame API를 비동기로 로드하는 함수
    const loadYouTubeAPI = () => {
      // 이미 스크립트가 로드되어 있는지 확인
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else if (window.YT && window.YT.Player) {
        // 이미 API가 로드된 경우 바로 플레이어 초기화
        initializePlayer();
      }
    };

    // 플레이어 초기화 함수
    const initializePlayer = () => {
      // 이미 플레이어가 초기화되어 있으면 제거 (재생성을 위해)
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      if (document.getElementById('player') && window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player('player', {
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
      }
    };

    // API가 준비되면 호출될 콜백 함수
    window.onYouTubePlayerAPIReady = initializePlayer;

    // popstate 이벤트 리스너 (뒤로가기 감지)
    const handlePopState = () => {
      if (window.location.pathname === '/main') {
        // 약간의 딜레이를 주어 DOM이 완전히 렌더링된 후에 초기화하도록 함
        setTimeout(() => {
          initializePlayer();
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // 현재 경로가 /main인 경우에만 YouTube API 로드
    if (location.pathname === '/main') {
      loadYouTubeAPI();
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.onYouTubePlayerAPIReady = null;
      window.removeEventListener('popstate', handlePopState);
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [location.pathname]);

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

  // 반응형 그리드 클래스
  const gridColumnClass = getGridColumnClass();

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    return `KRW   ` + price.toLocaleString();
  };

  // 반응형에 따라 refine 메뉴 표시 여부 결정
  // 1280px 이상에서만 refine 버튼 표시
  const showRefine = windowWidth >= 1280;

  // 현재 선택된 색상에 따른 스타일 지정
  const getColorButtonStyle = (color) => {
    return {
      border: selectedColor === color ? '2px solid black' : 'none',
      transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
      transition: 'all 0.2s ease',
    };
  };

  // 데스크탑 체크
  const isDesktop = windowWidth >= 1280;

  // 실제 렌더링할 제품 목록 (filteredProducts가 없으면 products 사용)
  const productsToDisplay = filteredProducts && filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className='w-full max-w-[1920px] h-full mx-auto'>
      {/* 인라인 스타일 추가 */}
      <style>{youtubeStyles}</style>

      {/* 헤더 컴포넌트 - z-index 충돌을 방지하기 위해 위치 변경 */}
      <Header />

      {/* 메인 콘텐츠 섹션 - <header> 태그를 <div>로 변경하여 충돌 방지 */}
      <div className='relative'>
        {/* 유튜브 비디오 섹션 - 원래 구조 유지 */}
        <section className='youtube'>
          <div className='youtube__area'>
            <div id='player' className='player'></div>
          </div>
          <div className='youtube__cover'></div>
        </section>

        {/* 우측 refine 메뉴 (더 아래에 위치) - 반응형, z-index 조정 */}
        {showRefine && (
          <div className='fixed top-10 md:top-14 xl:top-20 right-4 md:right-8 xl:right-12 text-right z-[8000]'>
            <div className='relative'>
              <div
                className='text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80 mr-4'
                onClick={toggleMenu}
              >
                refine
              </div>

              {/* 토글되는 드롭다운 메뉴 - z-index 조정 */}
              <div
                className={`absolute right-0 top-full mt-2 transition-all duration-300 overflow-hidden z-[8010] w-[100px] md:w-[120px]
                                    ${
                                      isMenuVisible
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

                  {/* 색상 선택 섹션 - z-index 조정 */}
                  <div className='absolute right-0 top-0 z-[8020]'></div>
                  <div className='bg-[#cbd5e1] shadow-md p-2 md:p-4 mt-2 border border-primary-500'>
                    <div
                      className='flex items-center justify-between mb-2 cursor-pointer'
                      onClick={() => filterByColor('gray')}
                    >
                      <div
                        className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#B7B7B7]'
                        style={getColorButtonStyle('gray')}
                      ></div>
                      <span className='text-gray-700 text-xs md:text-sm'>gray</span>
                    </div>
                    <div
                      className='flex items-center justify-between mb-2 cursor-pointer'
                      onClick={() => filterByColor('black')}
                    >
                      <div
                        className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#000000]'
                        style={getColorButtonStyle('black')}
                      ></div>
                      <span className='text-gray-700 text-xs md:text-sm'>black</span>
                    </div>
                    <div
                      className='flex items-center justify-between mb-2 cursor-pointer'
                      onClick={() => filterByColor('white')}
                    >
                      <div
                        className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FFFFFF] border border-gray-200'
                        style={getColorButtonStyle('white')}
                      ></div>
                      <span className='text-gray-700 text-xs md:text-sm'>white</span>
                    </div>
                    <div
                      className='flex items-center justify-between mb-2 cursor-pointer'
                      onClick={() => filterByColor('beige')}
                    >
                      <div
                        className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FCF2D6]'
                        style={getColorButtonStyle('beige')}
                      ></div>
                      <span className='text-gray-700 text-xs md:text-sm'>beige</span>
                    </div>
                    <div
                      className='flex items-center justify-between cursor-pointer'
                      onClick={() => filterByColor('blue')}
                    >
                      <div
                        className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#CEE3FC]'
                        style={getColorButtonStyle('blue')}
                      ></div>
                      <span className='text-gray-700 text-xs md:text-sm'>blue</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 제품 그리드 - 헤더와 겹치지 않도록 상단 마진 추가 */}
      <div className='flex flex-wrap p-3 md:p-6 xl:p-8 2xl:p-12 mt-11'>
        {/* productsToDisplay를 사용하여 제품 표시 */}
        {productsToDisplay.map((product) => (
          <div
            key={product.id}
            className={`${gridColumnClass} px-2 md:px-3 xl:px-4 mb-4 md:mb-6 xl:mb-8 `}
            onClick={() => goToProductPage(product.id)}
          >
            <div className='w-full h-auto md:h-[400px] xl:h-[450px] 2xl:h-[500px] rounded-lg overflow-hidden flex flex-col items-center'>
              {/* <button
                className='absolute top-2 right-2 z-10 bg-white bg-opacity-70 rounded-full p-1.5 hover:bg-opacity-100 transition-all duration-200'
                onClick={(e) => addToWishlist(product.id, e)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </button> */}
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
                <p className='text-xs md:text-sm xl:text-[16px]'>{formatPrice(product.price)}</p>
                <p className='text-xs md:text-xs xl:text-[14px] text-[#9CA3AF] mt-1 md:mt-2 xl:mt-3'>
                  {commonDetails.size.join(' ')}
                </p>
                {/* 색상 표시 추가 */}
                <p className='text-xs md:text-xs xl:text-[14px] text-[#9CA3AF] mt-1'>{product.color}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 색상이 있을 경우 표시 - 반응형 위치 적용 */}
      {selectedColor && (
        <div
          className={`fixed left-4 bg-white p-1.5 rounded-lg shadow-md z-40 max-w-fit ${
            isDesktop ? 'bottom-4' : 'bottom-14'
          }`}
        >
          <div className='flex items-center space-x-2'>
            <div
              className='w-3 h-3 rounded-full'
              style={{
                backgroundColor:
                  selectedColor === 'gray'
                    ? '#B7B7B7'
                    : selectedColor === 'black'
                    ? '#000000'
                    : selectedColor === 'white'
                    ? '#FFFFFF'
                    : selectedColor === 'beige'
                    ? '#FCF2D6'
                    : selectedColor === 'blue'
                    ? '#CEE3FC'
                    : '#FFFFFF',
                border: selectedColor === 'white' ? '1px solid #e5e7eb' : 'none',
              }}
            ></div>
            <p className='text-xs capitalize font-medium'>{selectedColor}</p>
            <button
              className='text-xs bg-gray-200 px-1.5 py-0.5 rounded hover:bg-gray-300'
              onClick={() => filterByColor(null)}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* 사이드메뉴바 - z-index 조정 */}
      <SideMenuBar isChatOpen={isChatOpen} setIsChatOpen={toggleChat} />

      {/* 채팅 컴포넌트 - z-index 조정 */}
      {isChatOpen && <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}

export default App;
