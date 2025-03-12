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
    if (statuses.includes('주문취소')) statusCount['주문취소'] += 1;
    if (statuses.includes('입금대기')) statusCount['입금대기'] += 1;
    if (statuses.includes('결제완료')) statusCount['결제완료'] += 1;
    if (statuses.includes('배송준비중')) statusCount['배송준비중'] += 1;
    if (statuses.includes('배송중')) statusCount['배송중'] += 1;
    if (statuses.includes('배송완료')) statusCount['배송완료'] += 1;
  });

  const statusLabels = [
    { label: '입금대기', key: '입금대기' },
    { label: '배송준비중', key: '배송준비중' },
    { label: '배송중', key: '배송중' },
    { label: '배송완료', key: '배송완료' },
  ];

  return (
    <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-300">
        <div className="text-gray-800 text-sm md:text-base font-medium flex items-center justify-start mb-4 mt-4 font-korean">
          주문내역
        </div>
        <div className="flex items-center justify-center gap-4 md:gap-12 flex-nowrap mt-8 mb-10 overflow-x-auto px-2">
          {statusLabels.map((statusObj, index, array) => (
            <React.Fragment key={statusObj.key}>
              <div className="min-w-[80px] md:w-[100px] h-[80px] md:h-[100px] flex flex-col items-center justify-center bg-[#CBD5E1] text-center rounded-full shadow-md flex-shrink-0 mb-2">
                <p className="text-base md:text-lg font-semibold font-korean">{statusCount[statusObj.key] || 0}</p>
                <p className="text-xs md:text-sm text-gray-600 font-korean">{statusObj.label}</p>
              </div>
              {index < array.length - 1 && (
                <span className="text-sm md:text-lg text-gray-500 flex-shrink-0"> &gt; </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300">
        <div className="text-gray-800 text-sm md:text-base font-medium flex items-center justify-start mb-4 mt-4 font-korean">
          취소/교환/반품 내역
        </div>
        <div className="flex justify-start md:justify-center gap-3 md:gap-6 mt-10 mb-12 flex-nowrap overflow-x-auto px-2">
          {[`취소 ${statusCount['주문취소'] || 0}`, `교환 ${exchangeOrders.length}`, `반품 ${refundOrders.length}`].map(
            (action) => (
              <Buttons
                key={action}
                size="large"
                state="default"
                className="min-w-[140px] md:w-[250px] h-[48px] md:h-[62px] border border-[#375785] bg-[rgba(226,232,240,0.2)] text-gray-700 rounded-full px-4 py-2 text-sm md:text-base flex-shrink-0 font-korean"
              >
                {action}
              </Buttons>
            )
          )}
        </div>
      </div>
      <div className="border-t border-gray-300 pt-8 pb-12">
        <div className="flex justify-start md:justify-center gap-3 md:gap-6 flex-nowrap overflow-x-auto px-2">
          {[
            { label: '관심상품', tab: 'Wishlist' },
            { label: '최근 본 상품', tab: 'History' },
            { label: '나의 쿠폰', tab: 'Coupon' },
          ].map(({ label, tab }) => (
            <Buttons
              key={label}
              size="large"
              state="default"
              className="min-w-[140px] md:w-[250px] h-[48px] md:h-[62px] border border-[#375785] bg-[#375785] text-gray-50 rounded-full px-4 py-2 text-sm md:text-base flex-shrink-0 font-korean"
              onClick={() => setActiveTab(tab)}
            >
              {label}
            </Buttons>
          ))}
        </div>
      </div>

      <div className="text-center mt-4 mb-10 text-gray-400 text-sm md:text-base cursor-pointer hover:underline">
        logout
      </div>
    </div>
  );
};

export default MyPageHome;
