import React from 'react';
import Buttons from '../../ui/Buttons';

const MyPageCoupons = ({ coupons }) => {
  return (
    <div className="border-t border-gray-300">
      <div className="w-full min-h-screen pt-10">
        <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-10 text-center ">Available Coupons({coupons.length})</h2>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-300 bg-[#F1F5F9]  ">
                  {/* 네임 영어로 변경 */}
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">No</th>
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">Coupon name</th>
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">Purchase amount</th>
                  {/* 구매상품을 할인코드로 변경함 */}
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">Discount code</th>
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">Discount benefits</th>
                  <th className="py-4 px-6 text-center text-base font-semibold text-gray-700">Period of use</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, index) => (
                  <tr key={coupon.id} className="border-b border-gray-200 text-gray-700">
                    <td className="py-5 px-6 text-center text-sm">{index + 1}</td>
                    <td className="py-5 px-6 text-center text-sm font-korean">{coupon.name}</td>
                    <td className="py-5 px-6 text-center text-sm font-korean">{coupon.amount}</td>
                    <td className="py-6 px-10 text-center">
                      <Buttons
                        size="large"
                        state="default"
                        className="border border-primary-400 text-primary-500 rounded-md font-korean text-sm "
                      >
                        코드명
                      </Buttons>
                    </td>
                    <td className="py-5 px-6 text-center text-sm font-korean">{coupon.discount}</td>
                    <td className="py-5 px-6 text-center text-sm font-korean">{coupon.validity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 버전 다르게 적용 수정필요 */}
          <div className="block md:hidden space-y-4 ">
            {coupons.map((coupon, index) => (
              <div key={coupon.id} className="bg-[#F8FAFC] border border-gray-200 rounded-md p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 font-korean">쿠폰 {index + 1}</span>
                  <span className="text-sm text-gray-500 font-korean">{coupon.amount}</span>
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1 font-korean">{coupon.name}</p>
                <p className="text-sm text-gray-600 mb-1 font-korean">혜택: {coupon.discount}</p>
                <p className="text-sm text-gray-600 mb-1 font-korean">기간: {coupon.validity}</p>
                <div className="mt-3 flex justify-end">
                  <Buttons
                    size="small"
                    state="default"
                    className="border border-primary-400 text-primary-500 rounded-md px-4 py-1 text-sm font-korean"
                  >
                    코드명
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
