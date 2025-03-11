import React from 'react';

const MyPageNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['Home', 'Order', 'Coupon', 'Wishlist', 'History', 'Info'];

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-3 md:flex-nowrap md:gap-x-6 px-2 sm:px-4 lg:px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`min-w-[90px] text-sm md:text-base whitespace-nowrap font-semibold py-2 transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-700 hover:text-primary-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MyPageNavigation;
