import React from 'react';
import Buttons from '../../ui/Buttons';

const MyPageHome = () => {
  return (
    <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-300">
        <div className="text-gray-800 text-sm md:text-base font-medium flex items-center justify-start mb-4 mt-4 font-korean">
          주문내역
        </div>
        <div className="flex items-center justify-center gap-4 md:gap-12 flex-nowrap mt-8 mb-10 overflow-x-auto px-2 ">
          {['입금전', '배송준비중', '배송중', '배송완료'].map((status, index, array) => (
            <React.Fragment key={status}>
              <div className="min-w-[80px] md:w-[100px] h-[80px] md:h-[100px] flex flex-col items-center justify-center bg-[#CBD5E1] text-center rounded-full shadow-md flex-shrink-0 mb-2">
                <p className="text-base md:text-lg font-semibold font-korean">0</p>
                <p className="text-xs md:text-sm text-gray-600 font-korean">{status}</p>
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
          {['취소 0', '교환 0', '반품 0'].map((action) => (
            <Buttons
              key={action}
              size="large"
              state="default"
              className="min-w-[140px] md:w-[250px] h-[48px] md:h-[62px] border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full px-4 py-2 text-sm md:text-base text-gray-500  flex-shrink-0 font-korean"
            >
              {action}
            </Buttons>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8 pb-12">
        <div className="flex justify-start md:justify-center gap-3 md:gap-6 flex-nowrap overflow-x-auto px-2">
          {['관심상품', '최근 본 상품', '나의 쿠폰'].map((label) => (
            <Buttons
              key={label}
              size="large"
              state="default"
              className="min-w-[140px] md:w-[250px] h-[48px] md:h-[62px] border border-[#375785] bg-[#375785] text-gray-500 rounded-full px-4 py-2 text-sm md:text-base flex-shrink-0 font-korean"
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
