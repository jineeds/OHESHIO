import React from 'react';
import Buttons from '../../ui/Buttons';

const MyPageWishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'TRENCH COLLAR JUMPER',
      color: 'BEIGE',
      quantity: 1,
      price: 'KRW 215,000',
      imageUrl: 'oheshio/outer/gray/p001_round_collar_semi-crop_jacket/p001.png',
    },
    {
      id: 2,
      name: 'TRENCH COLLAR JUMPER',
      color: 'BEIGE',
      quantity: 1,
      price: 'KRW 215,000',
      imageUrl: 'oheshio/outer/gray/p001_round_collar_semi-crop_jacket/p001.png',
    },
    {
      id: 3,
      name: 'TRENCH COLLAR JUMPER',
      color: 'BEIGE',
      quantity: 1,
      price: 'KRW 215,000',
      imageUrl: 'oheshio/outer/gray/p001_round_collar_semi-crop_jacket/p001.png',
    },
  ];

  return (
    <div className="border-t border-gray-300">
      <div className="w-full min-h-screen bg-white flex flex-col items-center pt-10">
        <div className="w-full max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-auto">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-row items-center p-5 gap-5 bg-[#FAFAFA] w-full max-w-[480px] h-auto rounded-lg shadow-md"
              >
                <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover" />

                <div className="flex flex-col flex-grow justify-between h-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-left">{item.name}</h3>
                    <button className="text-gray-600 text-xl">×</button>
                  </div>

                  <div className="text-left">
                    <p className="text-gray-500 text-sm">{item.color}</p>
                    <p className="text-gray-500 text-sm">QUANTITY {item.quantity}</p>
                    <p className="text-gray-900 font-semibold mt-2">{item.price}</p>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Buttons
                      size="small"
                      state="default"
                      className="border border-primary-400 text-primary-500 px-4 py-2"
                    >
                      장바구니
                    </Buttons>
                    <Buttons
                      size="small"
                      state="default"
                      className="border border-primary-400 text-primary-500 px-4 py-2"
                    >
                      주문하기
                    </Buttons>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageWishlist;
