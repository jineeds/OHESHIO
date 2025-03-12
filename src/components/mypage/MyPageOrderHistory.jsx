import React, { useState } from 'react';
import Buttons from '../../ui/Buttons';
import { FaChevronDown } from 'react-icons/fa';
import OrderDetailModal from './OrderDetailModal'; // ✅ 추가할 모달 컴포넌트 import

const MyPageOrderHistory = ({ orders = [] }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('오늘');
  const [selectedButton, setSelectedButton] = useState('주문내역');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [detailModalOrder, setDetailModalOrder] = useState(null); // ✅ 상세 모달 상태

  const filterByPeriod = (orderDate) => {
    const now = new Date();
    const orderDay = new Date(orderDate);
    const diff = now - orderDay;
    const days = diff / (1000 * 60 * 60 * 24);

    if (selectedPeriod === '오늘') return days < 1;
    if (selectedPeriod === '3개월') return days <= 90;
    if (selectedPeriod === '6개월') return days <= 180;
    return true;
  };

  const formattedOrders = orders.map((order) => {
    const displayStatus = [];

    if (order.status === 'pending' && order.paymentMethod === 'bankTransfer') displayStatus.push('입금대기');
    if (order.status === 'paid') displayStatus.push('결제완료', '배송준비중');
    if (order.status === 'preparing') displayStatus.push('배송준비중');
    if (order.status === 'shipping') displayStatus.push('배송중');
    if (order.status === 'delivered') displayStatus.push('배송완료');
    if (displayStatus.length === 0) displayStatus.push('입금대기');

    return { ...order, displayStatus };
  });

  const updatedOrders = formattedOrders.map((order) => {
    if (cancelledOrders.includes(order.id)) {
      return { ...order, displayStatus: ['주문취소'] };
    }
    return order;
  });

  const filteredOrders = updatedOrders.filter(
    (order) => (!selectedStatus || order.displayStatus.includes(selectedStatus)) && filterByPeriod(order.date)
  );

  const handleCancel = (orderId) => {
    if (window.confirm('정말 이 주문을 취소하시겠습니까?')) {
      setCancelledOrders((prev) => [...prev, orderId]);
    }
  };

  return (
    <div className="border-t border-gray-300">
      <div className="w-full min-h-screen flex flex-col pt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 w-full">
          <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
            <div className="relative w-full md:w-[340px]">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-[48px] md:h-[56px] px-3 md:px-4 pr-10 border border-gray-300 bg-[#F1F5F9] rounded-md text-sm md:text-base text-gray-700 focus:outline-primary-600 hover:shadow-sm transition-all duration-200 appearance-none font-korean"
              >
                <option value="">전체 주문처리 상태</option>
                <option value="입금대기">입금대기</option>
                <option value="결제완료">결제완료</option>
                <option value="배송준비중">배송준비중</option>
                <option value="배송중">배송중</option>
                <option value="배송완료">배송완료</option>
                <option value="주문취소">주문취소</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-sm md:text-base">
                <FaChevronDown />
              </div>
            </div>

            <div className="flex flex-row flex-wrap gap-2">
              {['오늘', '3개월', '6개월'].map((period) => (
                <Buttons
                  key={period}
                  size="medium"
                  state={selectedPeriod === period ? 'active' : 'default'}
                  className="w-[70px] md:w-[76px] h-[42px] md:h-[54px] text-xs md:text-base font-korean"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </Buttons>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:space-x-4 w-full md:w-auto">
            <Buttons
              size="large"
              state={selectedButton === '주문내역' ? 'active' : 'default'}
              className="w-full md:w-auto h-[44px] md:h-[54px] text-xs md:text-base font-korean"
              onClick={() => setSelectedButton('주문내역')}
            >
              주문내역
            </Buttons>
            <Buttons
              size="large"
              state={selectedButton === '취소/교환/반품 내역' ? 'active' : 'default'}
              className="w-full md:w-auto h-[44px] md:h-[54px] text-xs md:text-base font-korean"
              onClick={() => setSelectedButton('취소/교환/반품 내역')}
            >
              취소/교환/반품 내역
            </Buttons>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center text-gray-500 py-10 font-korean">주문 내역이 없습니다.</div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-base mb-2">주문번호: {order.id}</div>
                <div className="text-sm text-gray-600 mb-1">주문일: {order.date}</div>
                <div className="text-sm text-gray-700 mb-2">
                  상태:{' '}
                  {order.displayStatus.map((status, idx) => (
                    <span key={idx}>
                      {status}
                      {idx !== order.displayStatus.length - 1 && ' / '}
                    </span>
                  ))}
                </div>
                <ul className="text-sm text-gray-800 list-disc list-inside">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} / {item.quantity}개 / {item.price.toLocaleString()}원
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 mt-4 justify-center">
                  {!cancelledOrders.includes(order.id) && (
                    <Buttons
                      size="small"
                      state="default"
                      className="border border-red-400 text-red-500 font-korean"
                      onClick={() => handleCancel(order.id)}
                    >
                      주문취소
                    </Buttons>
                  )}
                  <Buttons
                    size="small"
                    state="default"
                    className="border border-primary-400 text-primary-500 font-korean"
                    onClick={() => setDetailModalOrder(order)}
                  >
                    상세보기
                  </Buttons>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* ✅ 모달 렌더링 */}
      {detailModalOrder && <OrderDetailModal order={detailModalOrder} onClose={() => setDetailModalOrder(null)} />}
    </div>
  );
};

export default MyPageOrderHistory;
