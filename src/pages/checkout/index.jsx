// Updated Checkout.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutActions } from '../../store/modules/checkoutSlice';
import BillingDetails from '../../components/checkout/BillingDetails';
import PaymentMethods from '../../components/checkout/PaymentMethods';
import OrderDetails from '../../components/checkout/OrderDetails';
import CustomLoader from '../../ui/CustomLoader';
import Buttons from '../../ui/Buttons';
import OrderComplete from '../../components/checkout/OrderComplete';

const Checkout = () => {
  const [orderMemo, setOrderMemo] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const dispatch = useDispatch();
  const { isProcessing, isFormValid, isComplete } = useSelector((state) => state.checkoutR);
  const { total } = useSelector((state) => state.cartR);

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

  return (
    <>
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 z-[9999]">
          <CustomLoader />
        </div>
      )}
      {isComplete ? (
        <OrderComplete />
      ) : (
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
      )}
    </>
  );
};

export default Checkout;
