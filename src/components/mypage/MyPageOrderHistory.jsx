import React, { useState } from 'react';
import Buttons from '../../ui/Buttons';

const MyPageOrderHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('오늘');
  const [selectedButton, setSelectedButton] = useState('주문내역');
  const [selectedStatus, setSelectedStatus] = useState('');

  return (
    <div className="border-t border-gray-300">
      <div className="w-full min-h-screen flex flex-col pt-10 px-4 sm:px-6 lg:px-8">
        {/* 필터 영역 */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-6 w-full">
          {/* 왼쪽 필터 + 날짜 버튼 */}
          <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
            {/* 주문 상태 셀렉트 */}
            <div className="relative w-full md:w-[340px]">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-[48px] md:h-[56px] px-3 md:px-4 pr-10 border border-gray-300 bg-[#F1F5F9] rounded-md text-sm md:text-base text-gray-700 focus:outline-primary-600 hover:shadow-sm transition-all duration-200 appearance-none"
              >
                <option value="">전체 주문처리 상태</option>
                <option value="입금대기">입금대기</option>
                <option value="결제완료">결제완료</option>
                <option value="배송준비중">배송준비중</option>
                <option value="배송중">배송중</option>
                <option value="배송완료">배송완료</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-sm md:text-base">
                ▼
              </div>
            </div>

            {/* 날짜 선택 버튼 */}
            <div className="flex flex-row flex-wrap gap-2">
              {['오늘', '3개월', '6개월'].map((period) => (
                <Buttons
                  key={period}
                  size="medium"
                  state={selectedPeriod === period ? 'active' : 'default'}
                  className="w-[70px] md:w-[76px] h-[42px] md:h-[54px] text-xs md:text-base"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </Buttons>
              ))}
            </div>
          </div>

          {/* 오른쪽 버튼 그룹 */}
          <div className="flex flex-col md:flex-row gap-2 md:space-x-4 w-full md:w-auto">
            <Buttons
              size="large"
              state={selectedButton === '주문내역' ? 'active' : 'default'}
              className="w-full md:w-auto h-[44px] md:h-[54px] text-xs md:text-base"
              onClick={() => setSelectedButton('주문내역')}
            >
              주문내역
            </Buttons>
            <Buttons
              size="large"
              state={selectedButton === '취소/교환/반품 내역' ? 'active' : 'default'}
              className="w-full md:w-auto h-[44px] md:h-[54px] text-xs md:text-base"
              onClick={() => setSelectedButton('취소/교환/반품 내역')}
            >
              취소/교환/반품 내역
            </Buttons>
          </div>
        </div>

        {/* 주문 내역 없음 안내 */}
        <div className="w-full flex justify-center items-center text-gray-400 text-sm md:text-base lg:text-lg py-10 mt-14 text-center">
          주문 내역이 없습니다.
        </div>
      </div>
    </div>
  );
};

export default MyPageOrderHistory;
