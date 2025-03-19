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

function Main() {
  // Redux에서 제품 정보와 commonDetails 가져오기
  const { products, filteredProducts, commonDetails, selectedColor } = useSelector((state) => state.productR);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);

  // 기본값은 false로 설정하고, 컴포넌트 마운트 시 창 크기에 따라 업데이트됨
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 기본값을 window.innerWidth 대신 0으로 설정하여 SSR 문제 방지
  const [windowWidth, setWindowWidth] = useState(0);

  const { authed } = useSelector((state) => state.authR);

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // 채팅 토글 함수
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // 제품 페이지로 이동 함수
  const goToProductPage = (productId) => {
    const product = products.find((p) => p.id === productId);

    if (product) {
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
      window.scrollTo(0, 0);
      dispatch(productsActions.selectProduct(productId));
      navigate(`/product/${productId}`);
    }
  };

  // 카테고리 필터링 함수 - 메뉴를 닫는 로직 추가
  const filterByCategory = (category) => {
    // 카테고리 필터링 액션 디스패치
    dispatch(productsActions.filterByCategory(category));

    // 로그인한 사용자만 최근 본 카테고리에 추가
    if (authed) {
      // 카테고리 정보 객체 생성
      const categoryInfo = {
        id: category,
        name: getCategoryName(category),
      };

      // 최근 본 카테고리에 추가하는 액션 디스패치
      dispatch(authActions.addRecentCategory(categoryInfo));
    }

    // 모바일/태블릿에서만 메뉴 닫기 (1280px 미만)
    if (windowWidth < 1280) {
      setIsMenuVisible(false);
    }
  };

  // 카테고리 ID에 따른 이름 반환 함수
  const getCategoryName = (categoryId) => {
    switch (categoryId) {
      case 'all':
        return 'all';
      case 'outer':
        return 'outer';
      case 'top':
        return 'tops';
      case 'bottom':
        return 'bottoms';
      case 'acc':
        return 'acc';
      default:
        return categoryId; // 기본값으로 ID 그대로 반환
    }
  };

  // 색상 필터링 함수 - 메뉴를 닫는 로직 추가
  const filterByColor = (color) => {
    dispatch(productsActions.selectColor(color));

    // 모바일/태블릿에서만 메뉴 닫기 (1280px 미만)
    if (windowWidth < 1280) {
      setIsMenuVisible(false);
    }
  };

  // 컴포넌트 마운트 시 창 크기 초기화 useEffect 추가
  useEffect(() => {
    // 초기 창 크기 가져오기
    const width = window.innerWidth;
    setWindowWidth(width);

    // 데스크탑(1280px 이상)에서는 메뉴를 열고, 모바일/태블릿에서는 메뉴를 닫음
    setIsMenuVisible(width >= 1280);

    // 초기 데이터 로드
    if (!filteredProducts || filteredProducts.length === 0) {
      dispatch(productsActions.filterByCategory('all'));
    }
  }, [dispatch, filteredProducts]); // filteredProducts 의존성 유지

  // 창 크기 변경 감지 useEffect
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      // 화면 크기에 따라 메뉴 가시성 업데이트
      // 데스크탑(1280px 이상)에서는 메뉴 표시, 그 이하에서는 숨김
      setIsMenuVisible(width >= 1280);
    };

    // 이벤트 리스너 등록 및 초기 실행
    handleResize(); // 컴포넌트 마운트 시 한 번 실행
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 배열로 컴포넌트 마운트 시에만 실행

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
            start: 56,
            end: 75,
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
          <div className='fixed top-10 md:top-14 xl:top-20 right-4 md:right-8 xl:right-12 text-right z-[8000] select-none'>
            <div className='relative'>
              <div
                className='text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80 mr-4'
                onClick={toggleMenu}
              >
                refine
              </div>

              {/* 토글되는 드롭다운 메뉴 - 기본적으로 열려있음 */}
              <div
                className={`absolute right-0 top-full mt-2 transition-all duration-300 overflow-hidden z-[8010] w-[100px] md:w-[120px]
          ${
            !isMenuVisible // isMenuVisible 논리 반전
              ? 'max-h-0 opacity-0 pointer-events-none'
              : 'max-h-[500px] opacity-100'
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
            className={`${gridColumnClass} px-2 md:px-3 xl:px-4 mb-8 md:mb-10 xl:mb-12 cursor-pointer`}
            onClick={() => goToProductPage(product.id)}
          >
            <div className='w-full h-auto md:h-[400px] xl:h-[450px] 2xl:h-[500px] rounded-lg overflow-hidden flex flex-col items-center'>
              <div className='w-auto h-auto md:w-[180px] md:h-[240px] xl:w-[215px] xl:h-[283px] flex justify-center items-center rounded-lg mt-4 md:mt-[30px] xl:mt-[40px] mb-2 md:mb-1 xl:mb-2 transition-all duration-300'>
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
              <div className='text-center text-sm text-gray-700 leading-relaxed w-full h-[120px] md:h-[130px] xl:h-[140px] flex flex-col justify-start'>
                <p className='text-xs md:text-sm xl:text-[16px] px-1 h-10 flex items-center justify-center line-clamp-2'>
                  {product.name}
                </p>
                <p className='text-xs mt-1 mb-1 md:text-sm xl:text-[16px]'>{formatPrice(product.price)}</p>
                <p className='text-xs md:text-xs xl:text-[14px] text-[#9CA3AF] mt-2 md:mt-1 xl:mt-2 px-1 line-clamp-1'>
                  {commonDetails.size.join(' ')}
                </p>
                {/* 색상 표시 추가 */}
                <p className='text-xs md:text-xs xl:text-[14px] text-[#9CA3AF] mt-1'>{product.color}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 사이드메뉴바 - z-index 조정 */}
      <SideMenuBar isChatOpen={isChatOpen} setIsChatOpen={toggleChat} />

      {/* 채팅 컴포넌트 - z-index 조정 */}
      {isChatOpen && <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}

export default Main;
