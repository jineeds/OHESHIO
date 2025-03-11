import React from 'react';
import { Link } from 'react-router-dom';
import Buttons from '../../ui/Buttons';

const OrderDetails = () => {
  return (
    <>
      <div
        className="border  border-secondary-500 rounded-lg py-10 px-5 xl:px-10 space-y-10"
        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <h2 className="text-2xl text-center font-semibold text-gray-700">Order Details</h2>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="relative w-[20%] min-w-16 max-w-24 bg-gray-100 rounded-lg border border-gray-200">
              <Link to={'#'}>
                <img src="/images/RTBTANKROCK.png" alt="" className="block aspect-square object-cover" />
              </Link>
              <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-gray-800/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                1
              </div>
            </div>
            <div className="flex-1 flex justify-between items-baseline gap-2">
              <div>
                <strong className="block text-sm font-normal lg:mb-2">SHIRT HOODED ZIPUP</strong>
                <div>
                  <span className="lg:block text-xs text-gray-400">BEIGE</span>
                  <span className="text-xs text-gray-400 px-1 lg:hidden">/</span>
                  <span className="lg:block text-xs text-gray-400">XS</span>
                </div>
              </div>
              <div>
                <span className="text-sm">
                  <span className="mr-0.5">₩</span>198,000
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-[20%] min-w-16 max-w-24 bg-gray-100 rounded-lg border border-gray-200">
              <Link to={'#'}>
                <img src="/images/RTBTANKROCK.png" alt="" className="block aspect-square object-cover" />
              </Link>
              <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-gray-800/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                1
              </div>
            </div>
            <div className="flex-1 flex justify-between items-baseline gap-2">
              <div>
                <strong className="block text-sm font-normal lg:mb-2">SHIRT HOODED ZIPUP</strong>
                <div>
                  <span className="lg:block text-xs text-gray-400">BEIGE</span>
                  <span className="text-xs text-gray-400 px-1 lg:hidden">/</span>
                  <span className="lg:block text-xs text-gray-400">XS</span>
                </div>
              </div>
              <div>
                <span className="text-sm">
                  <span className="mr-0.5">₩</span>198,000
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm py-5 border-y border-secondary-200 space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal · 2 items</span>
              <span>
                <span className="mr-0.5">₩</span>300,000
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>
                <span className="mr-0.5">₩</span>3,500
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xl font-semibold mt-5">
            <span>Total</span>
            <span>
              <span className="text-sm font-light text-secondary-400 mr-2">KRW</span>
              <span className="mr-0.5">₩</span>303,500
            </span>
          </div>
        </div>
        <div className="text-sm text-secondary-400 !mt-5">
          <p className="flex items-center justify-between font-korean">
            주문 내용을 확인했으며, 결제에 동의합니다.
            <button className="underline font-korean">보기</button>
          </p>
        </div>
      </div>
      <Buttons state="active" className="w-full h-[60px] flex-1 !text-2xl !font-semibold mt-10">
        CHECK OUT
      </Buttons>
    </>
  );
};

export default OrderDetails;
