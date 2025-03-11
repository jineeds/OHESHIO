import { useState } from 'react';
import BillingDetails from '../../components/checkout/BillingDetails';
import PaymentMethods from '../../components/checkout/PaymentMethods';
import OrderDetails from '../../components/checkout/OrderDetails';

const Checkout = () => {
  const [orderMemo, setOrderMemo] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

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

  return (
    <>
      <div className="container !max-w-[1536px] mb-10">
        <div className="min-h-[100svh] pt-20 flex flex-col lg:flex-row justify-between gap-14">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
