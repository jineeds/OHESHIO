import React from 'react';
import Buttons from '../../ui/Buttons';

const MyPageHome = ({ orders = [], exchangeOrders = [], refundOrders = [], setActiveTab }) => {
  const statusCount = {
    입금대기: 0,
    결제완료: 0,
    배송준비중: 0,
    배송중: 0,
    배송완료: 0,
    주문취소: 0,
  };

  orders.forEach((order) => {
    const statuses = order.displayStatus || [];
    statuses.forEach((status) => {
      if (statusCount[status] !== undefined) {
        statusCount[status] += 1;
      }
    });
  });

  const statusLabels = [
    { label: '입금대기', key: '입금대기' },
    { label: '배송준비중', key: '배송준비중' },
    { label: '배송중', key: '배송중' },
    { label: '배송완료', key: '배송완료' },
  ];

  return (
    <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* 주문내역 */}
      <div className="border-t border-gray-300">
        <div className="text-gray-800 text-base font-medium flex justify-start my-4 font-korean">주문내역</div>
        <div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:gap-12 my-8 px-2">
          {statusLabels.map((statusObj, index) => (
            <div
              key={statusObj.key}
              className="flex flex-col items-center justify-center bg-[#CBD5E1] rounded-full shadow-md w-full h-[80px] md:w-[100px] md:h-[100px]"
            >
              <p className="text-lg font-semibold font-korean">{statusCount[statusObj.key] || 0}</p>
              <p className="text-sm text-gray-600 font-korean">{statusObj.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 취소/교환/반품 내역 */}
      <div className="border-t border-gray-300">
        <div className="text-gray-800 text-base font-medium flex justify-start my-4 font-korean">
          취소 / 교환 / 반품 내역
        </div>
        <div className="grid grid-cols-3 gap-3 my-8 px-2">
          {[
            { label: '취소', count: statusCount['주문취소'] },
            { label: '교환', count: exchangeOrders.length },
            { label: '반품', count: refundOrders.length },
          ].map((action) => (
            <Buttons
              key={action.label}
              className="w-full h-[60px] border border-[#375785] bg-gray-100  text-gray-700 text-[#375785] rounded-full text-sm md:text-base font-korean"
            >
              {`${action.label} ${action.count}`}
            </Buttons>
          ))}
        </div>
      </div>

      {/* 관심상품/최근 본 상품/나의 쿠폰 */}
      <div className="border-t border-gray-300 pt-6 pb-8">
        <div className="grid grid-cols-3 gap-3 px-2">
          {[
            { label: '관심상품', tab: 'Wishlist' },
            { label: '최근 본 상품', tab: 'History' },
            { label: '나의 쿠폰', tab: 'Coupon' },
          ].map(({ label, tab }) => (
            <Buttons
              key={label}
              className="w-full h-[60px] border border-[#375785] bg-[#375785] text-gray-700 rounded-full text-sm md:text-base font-korean"
              onClick={() => setActiveTab(tab)}
            >
              {label}
            </Buttons>
          ))}
        </div>
      </div>

      <div className="text-center my-6 text-gray-400 text-sm md:text-base cursor-pointer hover:underline">logout</div>
    </div>
  );
};

export default MyPageHome;
