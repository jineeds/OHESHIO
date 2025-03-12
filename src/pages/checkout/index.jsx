import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutActions } from '../../store/modules/checkoutSlice';
import { authActions } from '../../store/modules/authSlice';
import { cartActions } from '../../store/modules/cartSlice';
import BillingDetails from '../../components/checkout/BillingDetails';
import PaymentMethods from '../../components/checkout/PaymentMethods';
import OrderDetails from '../../components/checkout/OrderDetails';
import CustomLoader from '../../ui/CustomLoader';
import Buttons from '../../ui/Buttons';

import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [orderMemo, setOrderMemo] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderProcessed, setOrderProcessed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isProcessing, isFormValid, isComplete, orderNumber, billingDetails } = useSelector(
    (state) => state.checkoutR
  );
  const { items, subtotal, shipping, discount, total } = useSelector((state) => state.cartR);
  const { currentUser, authed } = useSelector((state) => state.authR);

  const handleMemoChange = (e) => {
    const text = e.target.value;
    if (text.length <= 100) {
      setOrderMemo(text);
    }
  };

  const handleCardChange = (e) => {
    setSelectedCard(e.target.value);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCheckout = () => {
    dispatch(checkoutActions.validateCheckoutForm(total));
  };

  // 폼 유효성 검사 이후 결제 진행
  useEffect(() => {
    if (isFormValid) {
      const timeout = setTimeout(() => {
        dispatch(checkoutActions.completeCheckout());
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isFormValid, dispatch]);

  // 처리 중일 때 스크롤 방지
  useEffect(() => {
    if (isProcessing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isProcessing]);

  // 결제 완료 시 사용자 주문 내역 업데이트 및 카트 비우기
  useEffect(() => {
    if (isComplete && orderNumber && authed && currentUser && !orderProcessed) {
      // 주문 데이터 생성
      const orderData = {
        id: orderNumber,
        date: new Date().toISOString(),
        billingDetails: {
          receiverName: billingDetails.receiverName,
          zipcode: billingDetails.zipcode,
          address: billingDetails.address,
          addressDetail: billingDetails.addressDetail,
          phone: billingDetails.phone,
          email: billingDetails.email,
          orderMemo: orderMemo,
        },
        items,
        subtotal,
        shipping,
        discount,
        total,
        status: 'processing',
      };

      // 주문 내역에 추가
      dispatch(authActions.addOrderToUser(orderData));

      // 카트 비우기
      dispatch(cartActions.replaceCart([]));

      // dispatch(authActions.clearUserCart());

      navigate(`/checkout/complete/${orderNumber}`);

      setOrderProcessed(true);
    }
  }, [isComplete, orderNumber, authed, currentUser, orderProcessed]);

  return (
    <>
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 z-[9999]">
          <CustomLoader />
        </div>
      )}
      <div className="container !max-w-[1536px] mb-10">
        <div className="pt-20 flex flex-col lg:flex-row justify-between gap-14">
          <div className="lg:w-[55%]">
            <h2 className="text-2xl font-semibold text-gray-700 pb-10">Billing Details</h2>
            <div className="space-y-6">
              <BillingDetails orderMemo={orderMemo} handleMemoChange={handleMemoChange} />
              <PaymentMethods
                paymentMethod={paymentMethod}
                handlePaymentMethodChange={handlePaymentMethodChange}
                selectedCard={selectedCard}
                handleCardChange={handleCardChange}
              />
            </div>
          </div>
          <div className="lg:w-[45%] lg:max-w-xl">
            <OrderDetails />
            <Buttons
              state="active"
              className="w-full h-[60px] flex-1 !text-2xl !font-semibold mt-10"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              CHECK OUT
            </Buttons>
          </div>
        </div>
      </div>
      s
    </>
  );
};

export default Checkout;
