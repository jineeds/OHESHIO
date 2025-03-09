import React from 'react';
import Buttons from '../../ui/Buttons';

const MyPageHome = () => {
  return (
    <div className="border-t border-gray-300">
      <div className="border-t border-gray-300">
        <div className="text-[#262626] text-[16px] font-['JetBrains_Mono'] font-normal flex items-center justify-start mb-4 mt-4">
          주문내역
        </div>
        <div className="flex items-center justify-center gap-16 mt-12 mb-14">
          {['입금전', '배송준비중', '배송중', '배송완료'].map((status, index, array) => (
            <React.Fragment key={status}>
              <div className="w-[100px] h-[100px] flex flex-col items-center justify-center bg-[#CBD5E1] text-center rounded-full shadow-md">
                <p className="text-lg font-semibold">0</p>
                <p className="text-xs text-gray-600">{status}</p>
              </div>
              {index < array.length - 1 && <span className="text-lg text-gray-500"> &gt; </span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300">
        <div className="text-[#262626] text-[16px] font-['JetBrains_Mono'] font-normal flex items-center justify-start mb-4 mt-4">
          취소/교환/반품 내역
        </div>

        <div className="flex justify-center space-x-6 mt-14 mb-14">
          {['취소 0', '교환 0', '반품 0'].map((action) => (
            <Buttons
              key={action}
              size="large"
              state="default"
              className="w-[350px] h-[62px] border border-[#375785] bg-[rgba(226,232,240,0.2)] text-[#375785] rounded-full px-8 py-4 shadow-md"
            >
              {action}
            </Buttons>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300"></div>

      <div className="max-w-5xl mx-auto px-6 py-10 mt-6">
        <div className="flex justify-center space-x-6">
          <Buttons
            size="large"
            state="default"
            className="w-[350px] h-[62px] border border-[#375785] bg-[#375785] text-white shadow-md"
          >
            관심상품
          </Buttons>
          <Buttons
            size="large"
            state="default"
            className="w-[350px] h-[62px] border border-[#375785] bg-[#375785] text-white shadow-md"
          >
            최근 본 상품
          </Buttons>
          <Buttons
            size="large"
            state="default"
            className="w-[350px] h-[62px] border border-[#375785] bg-[#375785] text-white shadow-md"
          >
            나의 쿠폰
          </Buttons>
        </div>
      </div>
      <div className="mt-6 text-gray-600 text-sm cursor-pointer hover:underline">로그아웃</div>
    </div>
  );
};

export default MyPageHome;
