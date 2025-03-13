import React from 'react';
import Buttons from '../../ui/Buttons';

const MyPageCoupons = ({ coupons = [] }) => {
  return (
    <div className="border-t border-gray-300">
      <div className="w-full min-h-screen pt-10">
        <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-10 text-center">보유 쿠폰 목록 ({coupons.length})</h2>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-300 bg-[#F1F5F9]">
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">No</th>
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">쿠폰명</th>
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">최소 구매금액</th>
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">할인코드</th>
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">할인 혜택</th>
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">유효기간</th>
                </tr>
              </thead>

              <tbody>
                {coupons.map((coupon, index) => (
                  <tr key={coupon.id || index} className="border-b border-gray-200 text-gray-700 text-sm">
                    <td className="py-5 px-6 text-center">{index + 1}</td>
                    <td className="py-5 px-6 text-center font-korean">{coupon?.name || '-'}</td>
                    <td className="py-5 px-6 text-center font-korean">
                      {(coupon?.purchaseAmount ?? 0).toLocaleString()}원
                    </td>
                    <td className="py-6 px-10 text-center">{coupon?.code || '-'}</td>
                    <td className="py-5 px-6 text-center font-korean">
                      {coupon?.discountType === 'percentage'
                        ? `${coupon?.discountValue ?? 0}% 할인`
                        : `${(coupon?.discountValue ?? 0).toLocaleString()}원 할인`}
                    </td>
                    <td className="py-5 px-6 text-center font-korean">{coupon?.validity || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden space-y-4 mt-6">
            {coupons.map((coupon, index) => (
              <div key={coupon.id} className="bg-[#F8FAFC] border border-gray-200 rounded-md p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 font-korean">쿠폰 {index + 1}</span>
                  <span className="text-sm text-gray-500 font-korean">
                    {coupon.purchaseAmount.toLocaleString()}원 이상
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1 font-korean">{coupon.name}</p>
                <p className="text-sm text-gray-600 mb-1 font-korean">
                  혜택:{' '}
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}% 할인`
                    : `${coupon.discountValue.toLocaleString()}원 할인`}
                </p>
                <p className="text-sm text-gray-600 mb-1 font-korean">유효기간: {coupon.validity}</p>
                <div className="mt-3 flex justify-end">
                  <Buttons
                    size="small"
                    state="default"
                    className="border border-primary-400 text-primary-500 rounded-md px-4 py-1 text-sm font-korean"
                  >
                    {coupon.code}
                  </Buttons>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageCoupons;
