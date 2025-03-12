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

// import { useState } from 'react';
// import BillingDetails from '../../components/checkout/BillingDetails';
// import PaymentMethods from '../../components/checkout/PaymentMethods';
// import OrderDetails from '../../components/checkout/OrderDetails';

// import CustomLoading from '../../ui/CustomLoading';
// import CustomLoader from '../../ui/CustomLoader';
// import Buttons from '../../ui/Buttons';

// const Checkout = () => {
//   const [orderMemo, setOrderMemo] = useState('');
//   const [selectedCard, setSelectedCard] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('creditCard');

//   const handleMemoChange = (e) => {
//     const text = e.target.value;
//     if (text.length <= 100) {
//       setOrderMemo(text);
//     }
//   };

//   const handleCardChange = (e) => {
//     setSelectedCard(e.target.value);
//   };

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };

//   return (
//     <>
//       <div className="container !max-w-[1536px] mb-10">
//         <div className="pt-20 flex flex-col lg:flex-row justify-between gap-14">
//           <div className="lg:w-[55%]">
//             <h2 className="text-2xl font-semibold text-gray-700 pb-10">Billing Details</h2>
//             <div className="space-y-6">
//               <BillingDetails orderMemo={orderMemo} handleMemoChange={handleMemoChange} />
//               <PaymentMethods
//                 paymentMethod={paymentMethod}
//                 handlePaymentMethodChange={handlePaymentMethodChange}
//                 selectedCard={selectedCard}
//                 handleCardChange={handleCardChange}
//               />
//             </div>
//           </div>
//           <div className="lg:w-[45%] lg:max-w-xl">
//             <OrderDetails />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Checkout;

// import { useState } from 'react';
// import BillingDetails from '../../components/checkout/BillingDetails';
// import PaymentMethods from '../../components/checkout/PaymentMethods';
// import OrderDetails from '../../components/checkout/OrderDetails';

// const Checkout = () => {
//   // 기존 상태
//   const [orderMemo, setOrderMemo] = useState('');
//   const [selectedCard, setSelectedCard] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('creditCard');

//   // BillingDetails에서 필요한 상태들을 부모 컴포넌트로 끌어올림
//   const [formData, setFormData] = useState({
//     receiverName: '',
//     zipcode: '',
//     address: '',
//     addressDetail: '',
//   });

//   const [errors, setErrors] = useState({
//     receiverName: '',
//     addressDetail: '',
//     zipcode: '',
//     address: '',
//   });

//   const handleMemoChange = (e) => {
//     const text = e.target.value;
//     if (text.length <= 100) {
//       setOrderMemo(text);
//     }
//   };

//   const handleCardChange = (e) => {
//     setSelectedCard(e.target.value);
//   };

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };

//   // 폼 입력값 변경 핸들러
//   const handleFormChange = (name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // 유효성 검증 로직
//     validateField(name, value);
//   };

//   // 유효성 검증 함수
//   const validateField = (name, value) => {
//     let errorMessage = '';

//     switch (name) {
//       case 'receiverName':
//         if (!value.trim()) {
//           errorMessage = '받는사람을 입력해 주세요.';
//         }
//         break;
//       // 필요한 다른 필드 유효성 검증 추가
//     }

//     setErrors((prev) => ({
//       ...prev,
//       [name]: errorMessage,
//     }));
//   };

//   // 주소 검색 완료 핸들러
//   const handleAddressComplete = (data) => {
//     setFormData((prev) => ({
//       ...prev,
//       zipcode: data.zonecode,
//       address: data.address,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       addressDetail: '',
//       zipcode: '',
//       address: '',
//     }));
//   };

//   // 폼 제출 핸들러
//   const handleSubmit = () => {
//     let isValid = true;
//     const newErrors = { ...errors };

//     // 주소 검증
//     if (!formData.zipcode || !formData.address) {
//       newErrors.addressDetail = '주소검색을 진행해주세요.';
//       newErrors.zipcode = ' ';
//       newErrors.address = ' ';
//       isValid = false;
//     }

//     // 받는 사람 검증
//     if (!formData.receiverName.trim()) {
//       newErrors.receiverName = '받는 사람을 입력해주세요.';
//       isValid = false;
//     }

//     setErrors(newErrors);

//     if (!isValid) {
//       return false;
//     }

//     // 결제 진행 로직
//     alert('결제를 진행합니다.');
//     console.log('제출 데이터:', { formData, orderMemo, paymentMethod, selectedCard });
//     return true;
//   };

//   return (
//     <>
//       <div className="container !max-w-[1536px] mb-10">
//         <div className="pt-20 flex flex-col lg:flex-row justify-between gap-14">
//           <div className="lg:w-[55%]">
//             <h2 className="text-2xl font-semibold text-gray-700 pb-10">Billing Details</h2>
//             <div className="space-y-6">
//               <BillingDetails
//                 formData={formData}
//                 errors={errors}
//                 orderMemo={orderMemo}
//                 handleMemoChange={handleMemoChange}
//                 handleFormChange={handleFormChange}
//                 handleAddressComplete={handleAddressComplete}
//               />
//               <PaymentMethods
//                 paymentMethod={paymentMethod}
//                 handlePaymentMethodChange={handlePaymentMethodChange}
//                 selectedCard={selectedCard}
//                 handleCardChange={handleCardChange}
//               />
//             </div>
//           </div>
//           <div className="lg:w-[45%] lg:max-w-xl">
//             <OrderDetails onSubmit={handleSubmit} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Checkout;
