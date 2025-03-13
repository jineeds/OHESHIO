// OrderDetailModal.jsx
import React from 'react';
import Buttons from '../../ui/Buttons';

const OrderDetailModal = ({
  order,
  onClose,
  exchangeOrders = [],
  refundOrders = [],
  setExchangeOrders,
  setRefundOrders,
}) => {
  if (!order) return null;

  const handleExchange = () => {
    if (!exchangeOrders.includes(order.id)) {
      const updated = [...exchangeOrders, order.id];
      setExchangeOrders(updated);
      localStorage.setItem('exchangeOrders', JSON.stringify(updated)); // ✅ 로컬 저장 추가
      alert('교환 요청이 접수되었습니다.');
    } else {
      alert('이미 교환 요청한 주문입니다.');
    }
  };

  const handleRefund = () => {
    if (!refundOrders.includes(order.id)) {
      const updated = [...refundOrders, order.id];
      setRefundOrders(updated);
      localStorage.setItem('refundOrders', JSON.stringify(updated)); // ✅ 로컬 저장 추가
      alert('반품 요청이 접수되었습니다.');
    } else {
      alert('이미 반품 요청한 주문입니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <p className="text-sm mb-2 font-korean">주문번호: {order.id}</p>
        <p className="text-sm mb-2 font-korean">주문일: {order.date}</p>
        <p className="text-sm mb-2 ">상태: {order.displayStatus.join(', ')}</p>
        <ul className="text-sm mb-4 list-disc list-inside">
          {order.items.map((item, idx) => (
            <li key={idx}>
              {item.name} / {item.quantity}개 / {item.price.toLocaleString()}원
            </li>
          ))}
        </ul>

        <div className="flex gap-2 justify-end">
          <Buttons size="small" className="font-korean" onClick={handleExchange}>
            교환 요청
          </Buttons>
          <Buttons size="small" className="font-korean" onClick={handleRefund}>
            반품 요청
          </Buttons>
          <Buttons size="small" className="font-korean bg-gray-100" onClick={onClose}>
            닫기
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
