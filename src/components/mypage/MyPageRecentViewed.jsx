import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';
import { cartActions } from '../../store/modules/cartSlice';
import Buttons from '../../ui/Buttons';
import { showToast } from '/src/ui/toast/showToast';
const MyPageRecentViewed = ({ recentlyViewed, wishlist }) => {
  const dispatch = useDispatch();
  const removeRecentlyViewed = (itemId) => {
    dispatch(authActions.removeRecentlyViewed(itemId));
  };

  const addCart = (item) => {
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

  const addWishlist = (item) => {
    const isAlreadyInWishlist = wishlist.some((wishItem) => wishItem.id === item.id);

    if (isAlreadyInWishlist) {
      showToast('centerInfo', { message: `${item.name}은 이미 위시리스트에 있습니다.` });
    } else {
      dispatch(authActions.addWishlist(item));
      showToast('centerSuccess', { message: `${item.name}을 위시리스트에 담았습니다.` });
    }
  };

  return (
    <div className='border-t border-gray-300'>
      <div className='w-full min-h-screen bg-white flex flex-col items-center pt-10'>
        <div className='w-full max-w-[1100px] mx-auto'>
          {recentlyViewed.length === 0 ? (
            <div className='text-center py-10'>
              <p className='text-gray-500'>최근 본 상품이 없습니다.</p>
            </div>
          ) : (
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-auto'>
              {recentlyViewed.map((item) => (
                <div
                  key={item.id}
                  className='relative flex flex-row items-center p-5 gap-5 bg-[#FAFAFA] w-full max-w-[480px] h-auto rounded-lg shadow-md'
                >
                  <img src={item.imageUrl} alt={item.name} className='w-32 h-32 object-cover' />

                  <div className='flex flex-col flex-grow justify-between h-full'>
                    <div className='flex justify-between items-start'>
                      <h3 className='text-lg font-semibold text-left'>{item.name.toUpperCase()}</h3>
                      <button className='text-gray-600 text-xl' onClick={() => removeRecentlyViewed(item.id)}>
                        ×
                      </button>
                    </div>

                    <div className='text-left'>
                      <p className='text-gray-500 text-sm'>{item.color.toUpperCase()}</p>
                      <p className='text-gray-500 text-sm'>QUANTITY {item.quantity}</p>
                      <p className='text-gray-900 font-semibold mt-2'>{item.price}</p>
                    </div>

                    <div className='flex justify-end gap-4'>
                      <Buttons
                        size='small'
                        state='default'
                        className='border border-primary-400 text-primary-500 px-4 py-2'
                        onClick={() => addCart(item)}
                      >
                        장바구니
                      </Buttons>
                      <Buttons
                        size='small'
                        state='default'
                        className='border border-primary-400 text-primary-500 px-4 py-2'
                        onClick={() => addWishlist(item)}
                      >
                        찜하기
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

export default MyPageRecentViewed;
