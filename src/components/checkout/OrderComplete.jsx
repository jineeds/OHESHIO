import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkoutActions } from '../../store/modules/checkoutSlice';

const OrderComplete = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkoutActions.resetCheckout());
  }, [dispatch]);

  return (
    <div className="container h-[100svh] !relative">
      <div className="text-center absolute w-[90%] top-[30%] left-[50%] -translate-x-[50%]">
        <strong className="font-semibold text-gray-800">Your order has been confirmed.</strong>
        <p className="text-xs text-gray-500 mt-5">
          <span>Thank you for your purchase.</span>
          <span className="block">
            Your order is being processed, and a detailed confirmation will be sent to your registered email shortly.
          </span>
        </p>
        <Link to={'/mypage'} className="block text-xs text-gray-500 underline underline-offset-2 mt-8">
          view my orders
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
