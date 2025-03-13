import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutActions } from '../../store/modules/checkoutSlice';
import { authActions } from '../../store/modules/authSlice';
import BillingDetails from '../../components/checkout/BillingDetails';
import PaymentMethods from '../../components/checkout/PaymentMethods';
import OrderDetails from '../../components/checkout/OrderDetails';
import CustomLoader from '../../ui/CustomLoader';
import Buttons from '../../ui/Buttons';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderProcessed, setOrderProcessed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isProcessing, isFormValid, isComplete, orderNumber, billingDetails, appliedDiscountCode } = useSelector(
    (state) => state.checkoutR
  );
  const { items, subtotal, shipping, discount, total } = useSelector((state) => state.cartR);
  const { currentUser, authed } = useSelector((state) => state.authR);
  // 무통ㅏㅇ입금
  const { payment } = useSelector((state) => state.checkoutR);

  const handleCardChange = (e) => {
    setSelectedCard(e.target.value);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCheckout = () => {
    dispatch(checkoutActions.validateCheckoutForm(total));
  };

  useEffect(() => {
    dispatch(checkoutActions.resetCheckout());
  }, []);

  // checkout 버튼 클릭
  useEffect(() => {
    if (isFormValid) {
      const timeout = setTimeout(() => {
        dispatch(checkoutActions.completeCheckout());
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isFormValid, dispatch]);

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

  useEffect(() => {
    if (isComplete && orderNumber && authed && currentUser && !orderProcessed) {
      // 주문 데이터 생성
      const orderData = {
        id: orderNumber,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),

        billingDetails: {
          receiverName: billingDetails.receiverName,
          zipcode: billingDetails.zipcode,
          address: billingDetails.address,
          addressDetail: billingDetails.addressDetail,
          phone: billingDetails.phone,
          email: billingDetails.email,
          orderMemo: billingDetails.orderMemo,
        },
        items,
        subtotal,
        shipping,
        discount,
        total,
        // status: 'processing',
        // 결제완료
        status: payment.method === 'creditCard' ? 'paid' : 'pending',
        // 무통장입금 연ㅕ 추
        paymentMethod: payment.method,
      };

      // authSlice orders 주문 데이터 추가, 사용한 쿠폰 삭제
      dispatch(
        authActions.addOrderToUser({
          orderData,
          usedCouponCode: appliedDiscountCode,
        })
      );

      // cart 비우기
      // dispatch(cartActions.replaceCart([]));

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
              <BillingDetails />
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
    </>
  );
};

export default Checkout;
