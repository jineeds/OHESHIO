import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Buttons from '../../ui/Buttons';
import { authActions } from '../../store/modules/authSlice';
import { cartActions } from '../../store/modules/cartSlice';
import { IoIosClose } from 'react-icons/io';

const MyPageWishlist = ({ wishlist }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeWishlist = (itemId) => {
    dispatch(authActions.removeWishlist(itemId));
  };

  const addToCart = (item) => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        name: item.name,
        color: item.color,
        price: parseInt(item.price.replace(/[^0-9]/g, '')),
        quantity: 1,
        image: item.imageUrl,
      })
    );
  };

  const handleOrder = (item) => {
    addToCart(item);
    navigate('/checkout');
  };

  return (
    <div className="border-t border-gray-300">
      <div className="w-full min-h-screen bg-white flex flex-col items-center pt-10">
        <div className="w-full max-w-[1100px] px-4 sm:px-6 md:px-8 mx-auto">
          {wishlist.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 font-korean">위시리스트에 상품이 없습니다.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="relative flex flex-row items-center p-5 gap-5 bg-[#F1F5F9] w-full max-w-[480px] h-auto rounded-lg shadow-md"
                >
                  <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover" />

                  <div className="flex flex-col flex-grow justify-between h-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-left">{item.name.toUpperCase()}</h3>
                      <button className="text-gray-600 text-xl" onClick={() => removeWishlist(item.id)}>
                        <IoIosClose />
                      </button>
                    </div>

                    <div className="text-left">
                      <p className="text-gray-500 text-sm">{item.color.toUpperCase()}</p>
                      <p className="text-gray-500 text-sm">QUANTITY {item.quantity}</p>
                      <p className="text-gray-900 font-semibold mt-2">{item.price}</p>
                    </div>

                    <div className="flex justify-end gap-2 mt-5">
                      <Buttons
                        size="small"
                        state="default"
                        className="border border-primary-400 text-primary-500 px-4 py-2 font-korean"
                        onClick={() => addToCart(item)}
                      >
                        장바구니
                      </Buttons>
                      <Buttons
                        size="small"
                        state="default"
                        className="border border-primary-400 text-primary-500 px-4 py-2 font-korean"
                        onClick={() => handleOrder(item)}
                      >
                        주문하기
                      </Buttons>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageWishlist;
