// src/components/mypage/OrderDetailModal.jsx
import React from 'react';
import Buttons from '../../ui/Buttons';

const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">주문 상세정보</h2>
        <p className="text-sm mb-2">주문번호: {order.id}</p>
        <p className="text-sm mb-2">주문일: {order.date}</p>
        <p className="text-sm mb-2">상태: {order.displayStatus.join(', ')}</p>
        <ul className="text-sm mb-4 list-disc list-inside">
          {order.items.map((item, idx) => (
            <li key={idx}>
              {item.name} / {item.quantity}개 / {item.price.toLocaleString()}원
            </li>
          ))}
        </ul>

        <div className="flex gap-2 justify-end">
          <Buttons size="small" state="default" className="font-korean" onClick={() => alert('교환 요청 기능')}>
            교환 요청
          </Buttons>
          <Buttons size="small" state="default" className="font-korean" onClick={() => alert('환불 요청 기능')}>
            환불 요청
          </Buttons>
          <Buttons size="small" state="default" className="font-korean bg-gray-100" onClick={onClose}>
            닫기
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
