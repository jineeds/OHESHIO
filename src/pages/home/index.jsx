import React, { useState, useEffect } from 'react';
import BackgroundVideo from '../home/BackgroundVideo';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoverCategory, setHoverCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine device type based on width
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1280;

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    // Update navigation based on category
    if (category === 'uniform') {
      navigate('/main');
    } else if (category === 'oheshio-k' || category === 'about') {
      navigate('/kbrand');
    } else if (category === 'oheshio') {
      navigate('/about');
    }
  };

  const handleMouseEnter = (category) => {
    setHoverCategory(category);
  };

  const handleMouseLeave = () => {
    setHoverCategory(null);
  };

  return (
    <div className='w-screen h-screen overflow-hidden bg-gray-100'>
      <div className='relative w-full h-full max-w-[1920px] max-h-[1080px] mx-auto'>
        {/* Background Video Component */}
        <BackgroundVideo category={hoverCategory} />

        {/* Content Container */}
        <div className='absolute inset-0 flex flex-col items-center justify-center z-20'>
          {/* Logo */}
          <img src='/images/logo.png' alt='logo' width={200} />

          {/* Categories - Desktop & Tablet */}
          {!isMobile && (
            <div className='flex space-x-10 mt-8'>
              <button
                className={`bg-E2E8F0 text-gray-400 px-10 py-4 rounded-full text-lg min-w-44 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:-translate-y-1 border-2 border-slate-500 ${
                  activeCategory === 'uniform' ? 'bg-opacity-100 -translate-y-1 shadow-lg' : ''
                }`}
                onClick={() => handleCategoryClick('uniform')}
                onMouseEnter={() => handleMouseEnter('uniform')}
                onMouseLeave={handleMouseLeave}
              >
                uniform
              </button>
              <button
                className={`bg-E2E8F0 text-gray-400 px-10 py-4 rounded-full text-lg min-w-44 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:-translate-y-1 border-2 border-slate-500 ${
                  activeCategory === 'oheshio' ? 'bg-opacity-100 -translate-y-1 shadow-lg' : ''
                }`}
                onClick={() => handleCategoryClick('oheshio')}
                onMouseEnter={() => handleMouseEnter('oheshio')}
                onMouseLeave={handleMouseLeave}
              >
                About
              </button>
              <button
                className={`bg-primary-500 text-gray-400 px-10 py-4 rounded-full text-lg min-w-44 transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg hover:-translate-y-1 border-2 border-slate-500 ${
                  activeCategory === 'about' ? 'bg-opacity-100 -translate-y-1 shadow-lg' : ''
                }`}
                onClick={() => handleCategoryClick('about')}
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                oheshio-k
              </button>
            </div>
          )}

          {/* Categories - Mobile */}
          {isMobile && (
            <div className='absolute bottom-16 right-6 flex flex-col space-y-3'>
              <button
                className={`w-24 h-8 rounded-full  text-gray-400 text-sm font-medium transition-all duration-300 hover:bg-primary-500 hover:text-white border-2 border-slate-500 ${
                  activeCategory === 'uniform' ? 'bg-primary-500 text-white shadow-lg' : ''
                }`}
                onClick={() => handleCategoryClick('uniform')}
                onMouseEnter={() => handleMouseEnter('uniform')}
                onMouseLeave={handleMouseLeave}
              >
                uniform
              </button>
              <button
                className={`w-24 h-8 rounded-full  text-gray-400 text-sm font-medium transition-all duration-300 hover:bg-primary-500 hover:text-white border-2 border-slate-500 ${
                  activeCategory === 'oheshio' ? 'bg-primary-500 text-white shadow-lg' : ''
                }`}
                onClick={() => handleCategoryClick('oheshio')}
                onMouseEnter={() => handleMouseEnter('oheshio')}
                onMouseLeave={handleMouseLeave}
              >
                about
              </button>
              <button
                className={`w-24 h-8 rounded-full bg-primary-500 text-gray-400 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black border-2 border-slate-500 ${
                  activeCategory === 'about' ? 'bg-white text-black shadow-lg' : ''
                }`}
                onClick={() => handleCategoryClick('about')}
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                oheshio-k
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
