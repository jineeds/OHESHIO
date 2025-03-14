import React, { useState, useEffect } from 'react';
import { SiOperagx } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/modules/authSlice';
import { showToast } from '/src/ui/toast/showToast';
import { productsActions } from '../../store/modules/productsSlice';
import { PiChatsCircle } from 'react-icons/pi';
import { TbBrandAzure } from 'react-icons/tb';
import LiveChat from '../../components/main/LiveChatBot';

const Header = () => {
  const { selectedColor } = useSelector((state) => state.productR);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const { authed } = useSelector((state) => state.authR);
  const [showCloudEffect, setShowCloudEffect] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Default to closed
  const [isDesktop, setIsDesktop] = useState(windowWidth >= 1280);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onGo = () => {
    navigate('/login');
  };
  const onLogout = () => {
    dispatch(authActions.logout());
    showToast('auth', { message: '로그아웃이 완료 되었습니다.' });
    navigate('/login');
  };
  const onMypage = () => {
    if (!authed) {
      showToast('auth', { message: '로그인이 필요한 기능입니다.' });
      navigate('/login');
    } else {
      navigate('/mypage');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      // 1280px 이상일 때만 구름 효과 활성화
      setShowCloudEffect(width >= 1280);

      // Update desktop state
      const desktop = width >= 1280;
      setIsDesktop(desktop);

      // If desktop, menu should be visible by default, otherwise hidden
      setIsMenuVisible(desktop);
    };

    // 초기 실행
    handleResize();

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 마우스 호버 이벤트 핸들러
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const filterByCategory = (category) => {
    // 카테고리 필터링 액션 디스패치
    dispatch(productsActions.filterByCategory(category));

    // 로그인한 사용자만 최근 본 카테고리에 추가
    if (authed) {
      // 카테고리 정보 객체 생성
      const categoryInfo = {
        id: category, // 카테고리 ID
        name: getCategoryName(category), // 카테고리 이름 함수 호출
      };

      // 최근 본 카테고리에 추가하는 액션 디스패치
      dispatch(authActions.addRecentCategory(categoryInfo));
    }

    // Only close menu on mobile
    if (!isDesktop) {
      setIsMenuVisible(false);
    }
  };

  const toggleMenu = () => {
    // For desktop, clicking refine should close the menu if it's open
    // For mobile/tablet, clicking refine should toggle the menu
    setIsMenuVisible(!isMenuVisible);
  };
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const getColorButtonStyle = (color) => {
    return {
      border: selectedColor === color ? '2px solid black' : 'none',
      transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
      transition: 'all 0.2s ease',
    };
  };

  const filterByColor = (color) => {
    dispatch(productsActions.selectColor(color));
    // Only close menu on mobile
    if (!isDesktop) {
      setIsMenuVisible(false);
    }
  };

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

  const location = useLocation();
  const isCheckoutCompletePage = location.pathname.includes('/checkout/complete');
  const isCheckoutOrCartPage =
    (location.pathname.includes('/checkout') && !isCheckoutCompletePage) || location.pathname.includes('/cart');

  return (
    <>
      {showCloudEffect && (
        <div
          className='cloud-effect'
          style={{
            background: 'linear-gradient(180deg, rgba(231, 236, 234, 1) 10%, rgba(231, 236, 234, 0) 80%)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 90,
            opacity: isHovering ? 1 : 0,
            marginTop: '-30px',
            width: '100%',
            height: '250px',
            transition: 'all 0.5s ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top Header */}
      <header
        className={`fixed top-0 left-0 w-full h-11 transition-all duration-300 z-[8000] ${
          isScrolled ? 'bg-secondary-50 shadow-md' : 'bg-transparent'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='container mx-auto px-4 h-full relative'>
          {/* Desktop only "home" text */}
          <div className='hidden xl:block text-xs md:text-sm font-medium absolute top-1/2 -translate-y-1/2 left-16 text-black'>
            {isCheckoutOrCartPage ? (
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className='text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80'
              >
                back
              </button>
            ) : (
              <Link to='/main'>home</Link>
            )}
          </div>

          {/* Mobile/Tablet Icon */}
          <div className='block xl:hidden absolute top-1/2 -translate-y-1/2 left-16'>
            {isCheckoutOrCartPage ? (
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className='text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80'
              >
                back
              </button>
            ) : (
              <div className='group relative'>
                <div className='text-sm text-black cursor-pointer font-medium hover:opacity-80 flex items-center justify-center'>
                  <SiOperagx className='text-lg' />
                </div>
                <div className='absolute  flex flex-col left-1/2 -translate-x-1/2 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2'>
                  {authed ? (
                    <>
                      <button
                        onClick={onLogout}
                        className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center'
                      >
                        logout
                      </button>

                      <button
                        onClick={onMypage}
                        className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center '
                      >
                        my page
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={onGo}
                        className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center '
                      >
                        sign up
                      </button>
                      <button
                        onClick={onMypage}
                        className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center '
                      >
                        my page
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Logo (always centered) */}
          <div className='absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2'>
            <Link to='/'>
              <img src='/images/logo.png' alt='logo' width={144} />
            </Link>
          </div>
          {/* Desktop only collection dropdown */}
          {!isCheckoutOrCartPage && (
            <div className='hidden xl:block absolute top-1/2 -translate-y-1/2 right-36'>
              <div className='group'>
                <div className='text-sm text-black cursor-pointer font-medium hover:opacity-80 mr-32 relative'>
                  collection
                </div>
                {/* Dropdown Menu */}
                <div className='absolute left-0 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2'>
                  <Link to='/main' className='block'>
                    <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 '>
                      uniform
                    </div>
                  </Link>
                  <Link to='/kbrand' className='block'>
                    <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 '>
                      oheshio-k
                    </div>
                  </Link>
                  <Link to='/about' className='block'>
                    <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 '>
                      about
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* Desktop only SiOperagx icon */}
          {!isCheckoutOrCartPage && (
            <div className='hidden xl:block absolute top-1/2 -translate-y-1/2 right-44'>
              <div className='group relative'>
                <div className='text-sm text-black cursor-pointer font-medium hover:opacity-80 flex items-center justify-center'>
                  <SiOperagx className='text-lg' />
                </div>
                <div className='absolute flex flex-col justify-center left-1/2 -translate-x-1/2 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2'>
                  {authed ? (
                    <>
                      {!isCheckoutOrCartPage && (
                        <button
                          onClick={onLogout}
                          className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center'
                        >
                          logout
                        </button>
                      )}
                      <button
                        onClick={onMypage}
                        className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center '
                      >
                        my page
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={onGo}
                        className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center '
                      >
                        sign up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className='absolute top-1/2 -translate-y-1/2 right-16'>
            <div className='group relative'>
              <Link to={'/cart'} className='block'>
                <div className='text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80'>bag</div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom navigation bar (mobile/tablet only - shows on screens smaller than lg) */}
      {!isDesktop && !isCheckoutOrCartPage && (
        <div className='fixed bottom-0 left-0 w-full h-16 bg-secondary-50 border-t border-gray-200 shadow-lg z-[9999] select-none'>
          <div className='container mx-auto h-full flex justify-center items-center'>
            <div className='w-full flex justify-around items-center'>
              {/* Collection button */}
              <div className='group relative flex flex-col items-center justify-center'>
                <div className='text-gray-700 cursor-pointer hover:text-primary-500'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
                  </svg>
                </div>
                <span className='text-xs text-gray-700 mt-1'>Collection</span>

                {/* Dropdown Menu (opens upward) */}
                <div className='absolute left-1/2 -translate-x-1/2 bottom-16 w-32 z-50 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                  <Link to='/main' className='block'>
                    <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:bg-gray-100'>
                      uniform
                    </div>
                  </Link>
                  <Link to='/kbrand' className='block'>
                    <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:bg-gray-100'>
                      k-brand
                    </div>
                  </Link>
                  <Link to='/about' className='block'>
                    <div className='py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:bg-gray-100'>
                      about
                    </div>
                  </Link>
                </div>
              </div>

              {/* Refine button */}
              <div className='relative flex flex-col items-center justify-center select-none'>
                <div className='text-gray-700 cursor-pointer hover:text-primary-500' onClick={toggleMenu}>
                  <TbBrandAzure className='w-7 h-7' />
                </div>
                <span className='text-xs text-gray-700 mt-1'>Refine</span>

                {/* 토글되는 드롭다운 메뉴 */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-16 bg-white shadow-lg rounded-md transition-all duration-300 overflow-hidden z-[8010] w-[150px] 
${!isMenuVisible ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[500px] opacity-100'}`}
                >
                  <div className='py-2'>
                    <div
                      className='text-right text-xs md:text-sm text-gray-700 py-2 px-4 cursor-pointer hover:bg-gray-100'
                      onClick={() => filterByCategory('all')}
                    >
                      all
                    </div>
                    <div
                      className='text-right text-xs md:text-sm text-gray-700 py-2 px-4 cursor-pointer hover:bg-gray-100'
                      onClick={() => filterByCategory('outer')}
                    >
                      outer
                    </div>
                    <div
                      className='text-right text-xs md:text-sm text-gray-700 py-2 px-4 cursor-pointer hover:bg-gray-100'
                      onClick={() => filterByCategory('top')}
                    >
                      tops
                    </div>
                    <div
                      className='text-right text-xs md:text-sm text-gray-700 py-2 px-4 cursor-pointer hover:bg-gray-100'
                      onClick={() => filterByCategory('bottom')}
                    >
                      bottoms
                    </div>
                    <div
                      className='text-right text-xs md:text-sm text-gray-700 py-2 px-4 cursor-pointer hover:bg-gray-100'
                      onClick={() => filterByCategory('acc')}
                    >
                      acc
                    </div>

                    {/* 색상 선택 섹션 */}
                    <div className='border-t border-gray-200 mt-2 pt-2'>
                      <div
                        className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100'
                        onClick={() => filterByColor('gray')}
                      >
                        <div
                          className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#B7B7B7]'
                          style={getColorButtonStyle('gray')}
                        ></div>
                        <span className='text-gray-700 text-xs md:text-sm'>gray</span>
                      </div>
                      <div
                        className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100'
                        onClick={() => filterByColor('black')}
                      >
                        <div
                          className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#000000]'
                          style={getColorButtonStyle('black')}
                        ></div>
                        <span className='text-gray-700 text-xs md:text-sm'>black</span>
                      </div>
                      <div
                        className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100'
                        onClick={() => filterByColor('white')}
                      >
                        <div
                          className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FFFFFF] border border-gray-200'
                          style={getColorButtonStyle('white')}
                        ></div>
                        <span className='text-gray-700 text-xs md:text-sm'>white</span>
                      </div>
                      <div
                        className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100'
                        onClick={() => filterByColor('beige')}
                      >
                        <div
                          className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FCF2D6]'
                          style={getColorButtonStyle('beige')}
                        ></div>
                        <span className='text-gray-700 text-xs md:text-sm'>beige</span>
                      </div>
                      <div
                        className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100'
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
              {/* Live Chat Button */}
              <div className='flex flex-col items-center justify-center select-none'>
                <div
                  className='text-gray-700 cursor-pointer hover:text-primary-500'
                  onClick={toggleChat} // setIsChatOpen에서 toggleChat 함수로 변경
                >
                  <PiChatsCircle className='w-7 h-7' />
                </div>
                <span className='text-xs text-gray-700 mt-1'>Live Chat</span>
              </div>

              {isChatOpen && <LiveChat isOpen={isChatOpen} onClose={toggleChat} />}

              {/* Top Button */}
              <div className='flex flex-col items-center justify-center'>
                <div
                  className='text-gray-700 cursor-pointer hover:text-primary-500'
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                  </svg>
                </div>
                <span className='text-xs text-gray-700 mt-1'>Top</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
