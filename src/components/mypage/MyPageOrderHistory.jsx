import React, { useState } from 'react';
import Buttons from '../../ui/Buttons';

const MyPageOrderHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('오늘');
  const [selectedButton, setSelectedButton] = useState('주문내역');
  const [selectedStatus, setSelectedStatus] = useState('');

  return (
    <div className="border-t border-gray-300">
      <div className="w-full min-h-screen flex flex-col pt-10">
        <div className="flex justify-between items-center w-full mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-[340px]">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-[56px] px-4 pr-10 border border-gray-300 bg-[#F1F5F9] rounded-md text-gray-700 focus:outline-primary-600 hover:shadow-sm transition-all duration-200 appearance-none"
              >
                <option value="">전체 주문처리 상태</option>
                <option value="입금대기">입금대기</option>
                <option value="결제완료">결제완료</option>
                <option value="배송준비중">배송준비중</option>
                <option value="배송중">배송중</option>
                <option value="배송완료">배송완료</option>
              </select>

              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">▼</div>
            </div>

            {['오늘', '3개월', '6개월'].map((period) => (
              <Buttons
                key={period}
                size="medium"
                state={selectedPeriod === period ? 'active' : 'default'}
                className="w-[76px] h-[54px]"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Buttons>
            ))}
          </div>

          <div className="flex space-x-4">
            <Buttons
              size="large"
              state={selectedButton === '주문내역' ? 'active' : 'default'}
              onClick={() => setSelectedButton('주문내역')}
            >
              주문내역
            </Buttons>
            <Buttons
              size="large"
              state={selectedButton === '취소/교환/반품 내역' ? 'active' : 'default'}
              onClick={() => setSelectedButton('취소/교환/반품 내역')}
            >
              취소/교환/반품 내역
            </Buttons>
          </div>
        </div>

        <div className="w-full flex justify-center items-center text-gray-400 text-lg py-10 mt-14">
          주문 내역이 없습니다.
        </div>
      </div>
    </div>
  );
};

export default MyPageOrderHistory;
