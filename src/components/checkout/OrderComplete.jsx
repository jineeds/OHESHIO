import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutActions } from '../../store/modules/checkoutSlice';
import { cartActions } from '../../store/modules/cartSlice';
import { ProductContain } from '../product/style/style';

const OrderComplete = () => {
  const dispatch = useDispatch();
  const { orderNumber } = useParams();
  const { currentUser } = useSelector((state) => state.authR);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.orders && currentUser.orders.length > 0 && orderNumber) {
      const currentOrder = currentUser.orders.find((order) => order.id === orderNumber);
      if (currentOrder && currentOrder.items) {
        setOrderItems(currentOrder.items);
      }
    }

    dispatch(cartActions.replaceCart([]));
    dispatch(checkoutActions.resetCheckout());
  }, [dispatch, currentUser, orderNumber]);

  return (
    <div className="container h-[100svh] !relative">
      <div className="text-center absolute w-[90%] top-[30%] left-[50%] -translate-x-[50%]">
        <ProductContain className="!flex !justify-center !gap-5">
          {/* 모바일 */}
          {orderItems.slice(0, 3).map((item, index) => (
            <div key={index} className="product_detail_contain block md:hidden">
              <button className="w-16 h-16 cursor-default overflow-hidden rounded detail_small_img">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </button>
            </div>
          ))}

          {/* 태블릿, 데스크탑 */}
          {orderItems.slice(0, 5).map((item, index) => (
            <div key={index} className="product_detail_contain hidden md:block">
              <button className="w-16 h-16 cursor-default overflow-hidden rounded detail_small_img">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </button>
            </div>
          ))}
        </ProductContain>
        <strong className="block font-semibold text-base mt-5 md:text-lg text-gray-800">
          Your order has been confirmed.
        </strong>
        <p className="text-xs text-gray-500 mt-5">
          <span>Thank you for your purchase.</span>
          <span className="block">
            Your order is being processed, and a detailed confirmation will be sent to your registered email shortly.
          </span>
        </p>
        <Link to={'/mypage'} className="block text-sm text-gray-500 underline mt-8 hover:text-gray-700">
          view my orders
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
