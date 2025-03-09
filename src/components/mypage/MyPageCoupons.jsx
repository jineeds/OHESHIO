import React from 'react';
import Buttons from '../../ui/Buttons';

const MyPageCoupons = () => {
  const coupons = [
    {
      id: 1,
      name: '[자주배송 전용] 가입 축하 할인 쿠폰',
      amount: '10,000원',
      discount: '70% 할인',
      validity: '2025-03-09 - 2025-03-16',
    },
    {
      id: 2,
      name: '회원 가입 축하 할인 쿠폰',
      amount: '50,000원',
      discount: '15% 할인',
      validity: '2025-03-09 - 2025-03-16',
    },
    {
      id: 3,
      name: '회원 가입 축하 할인 쿠폰',
      amount: '300,000원',
      discount: '10% 할인',
      validity: '2025-03-09 - 2025-03-16',
    },
  ];

  return (
    <div className="border-t border-gray-300">
      <div className="w-full pt-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">사용 가능 쿠폰 ({coupons.length})</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 bg-primary-200/30">
              <th className="py-4 px-6 text-center text-lg font-semibold text-gray-700">번호</th>
              <th className="py-4 px-6 text-center text-lg font-semibold text-gray-700">쿠폰명</th>
              <th className="py-4 px-6 text-center text-lg font-semibold text-gray-700">구매금액</th>
              <th className="py-4 px-6 text-center text-lg font-semibold text-gray-700">쿠폰적용상품</th>
              <th className="py-4 px-6 text-center text-lg font-semibold text-gray-700">쿠폰 혜택</th>
              <th className="py-4 px-6 text-center text-lg font-semibold text-gray-700">사용가능 기간</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon.id} className="border-b border-gray-200 text-gray-700">
                <td className="py-5 px-6 text-center text-lg">{index + 1}</td>
                <td className="py-5 px-6 text-center text-lg">{coupon.name}</td>
                <td className="py-5 px-6 text-center text-lg">{coupon.amount}</td>
                <td className="py-5 px-6 text-center">
                  <Buttons
                    size="large"
                    state="default"
                    className="border border-primary-400 text-primary-500 rounded-md px-4 py-1"
                  >
                    상품보기
                  </Buttons>
                </td>
                <td className="py-5 px-6 text-center text-lg">{coupon.discount}</td>
                <td className="py-5 px-6 text-center text-lg">{coupon.validity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPageCoupons;
