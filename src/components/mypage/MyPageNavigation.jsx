import React from 'react';

const MyPageNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['홈', '주문내역', '쿠폰/적립금', '관심상품', '최근 본 상품', '회원정보'];
  return (
    <>
      <nav className="flex justify-center space-x-8 text-lg font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`hover:underline ${activeTab === tab ? 'text-blue-600' : 'text-black'}`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </>
  );
};

export default MyPageNavigation;
