import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 주문 정보
  billingDetails: {
    receiverName: '',
    zipcode: '',
    address: '',
    addressDetail: '',
    phone: '',
    email: '',
    orderMemo: '',
  },
  payment: {
    method: 'creditCard',
    cardInfo: {
      selectedCard: '',
      installmentPeriod: 0,
    },
    bankTransferInfo: {
      bankName: '',
      depositorName: '',
    },
  },
  formErrors: {},
  isFormValid: false,
  isProcessing: false,
  isComplete: false,
  orderNumber: null,
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    //
    updateBillingDetail: (state, action) => {
      const { field, value } = action.payload;
      state.billingDetails[field] = value;

      if (state.formErrors && state.formErrors[field]) {
        const newErrors = { ...state.formErrors };
        delete newErrors[field];
        state.formErrors = newErrors;
      }

      if ((field === 'zipcode' || field === 'address') && state.formErrors && state.formErrors.addressDetail) {
        const newErrors = { ...state.formErrors };
        delete newErrors.addressDetail;
        state.formErrors = newErrors;
      }
    },

    setAddressInfo: (state, action) => {
      const { zonecode, address } = action.payload;
      state.billingDetails.zipcode = zonecode;
      state.billingDetails.address = address;

      if (state.formErrors) {
        state.formErrors = { ...state.formErrors };
        delete state.formErrors.addressDetail;
      }
    },

    updateOrderMemo: (state, action) => {
      state.billingDetails.orderMemo = action.payload;
    },

    // 결제
    setPaymentMethod: (state, action) => {
      state.payment.method = action.payload;

      if (action.payload === 'creditCard') {
        state.payment.bankTransferInfo.depositorName = '';
        state.payment.bankTransferInfo.bankName = '';

        if (state.formErrors) {
          delete state.formErrors.depositorName;
          delete state.formErrors.bankName;
        }
      } else if (action.payload === 'bankTransfer') {
        state.payment.cardInfo.selectedCard = '';
        state.payment.cardInfo.installmentPeriod = 0;

        if (state.formErrors) {
          delete state.formErrors.cardSelection;
        }
      }

      if (action.payload !== 'creditCard') {
        state.payment.cardInfo.selectedCard = '';
        state.payment.cardInfo.installmentPeriod = 0;
      }
      if (action.payload !== 'bankTransfer') {
        state.payment.bankTransferInfo.depositorName = '';
        state.payment.bankTransferInfo.bankName = '';
      }
    },

    setSelectedCard: (state, action) => {
      state.payment.cardInfo.selectedCard = action.payload;

      if (state.formErrors && state.formErrors.cardSelection) {
        const newErrors = { ...state.formErrors };
        delete newErrors.cardSelection;
        state.formErrors = newErrors;
      }
    },

    setInstallmentPeriod: (state, action) => {
      state.payment.cardInfo.installmentPeriod = Number(action.payload);
    },

    setDepositorName: (state, action) => {
      state.payment.bankTransferInfo.depositorName = action.payload;

      if (state.formErrors && state.formErrors.depositorName) {
        const newErrors = { ...state.formErrors };
        delete newErrors.depositorName;
        state.formErrors = newErrors;
      }
    },

    setBankName: (state, action) => {
      state.payment.bankTransferInfo.bankName = action.payload;

      if (state.formErrors && state.formErrors.bankName) {
        const newErrors = { ...state.formErrors };
        delete newErrors.bankName;
        state.formErrors = newErrors;
      }
    },

    // 할인코드
    applyDiscountCode: (state, action) => {
      const code = action.payload.code;
      const total = action.payload.total;

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const coupon = currentUser.coupons.find((c) => c.code === code);

      if (coupon) {
        if (coupon.purchaseAmount && total < coupon.purchaseAmount) {
          state.appliedDiscountCode = null;
          state.discountType = null;
          state.discountValue = 0;
          state.discountError = `최소 구매 금액은 ${coupon.purchaseAmount.toLocaleString()}원입니다.`;
          return;
        }

        state.appliedDiscountCode = code;
        state.discountType = coupon.discountType || 'percentage';
        state.discountValue = coupon.discountValue;
        state.discountError = null;
      } else {
        state.appliedDiscountCode = null;
        state.discountType = null;
        state.discountValue = 0;
        state.discountError = '유효하지 않은 할인 코드입니다.';
      }
    },

    validateCheckoutForm: (state, action) => {
      let isValid = true;
      const newFormErrors = {};
      const cartTotal = action.payload || 0;

      if (!state.billingDetails.receiverName.trim()) {
        newFormErrors.receiverName = '받는사람을 입력해 주세요.';
        isValid = false;
      }

      if (!state.billingDetails.zipcode || !state.billingDetails.address) {
        newFormErrors.addressDetail = '주소검색을 진행해주세요.';
        isValid = false;
      }

      if (cartTotal > 0) {
        if (state.payment.method === 'creditCard') {
          if (!state.payment.cardInfo.selectedCard) {
            newFormErrors.cardSelection = '카드를 선택해 주세요.';
            isValid = false;
            state.payment.cardInfo.isCardInvalid = true;
          } else {
            state.payment.cardInfo.isCardInvalid = false;
          }
        } else if (state.payment.method === 'bankTransfer') {
          if (!state.payment.bankTransferInfo.depositorName.trim()) {
            newFormErrors.depositorName = '입금자명을 입력해 주세요.';
            isValid = false;
            state.payment.bankTransferInfo.isDepositorNameInvalid = true;
          } else {
            state.payment.bankTransferInfo.isDepositorNameInvalid = false;
          }

          if (!state.payment.bankTransferInfo.bankName) {
            newFormErrors.bankName = '은행을 선택해 주세요.';
            isValid = false;
            state.payment.bankTransferInfo.isBankNameInvalid = true;
          } else {
            state.payment.bankTransferInfo.isBankNameInvalid = false;
          }
        }
      }

      state.formErrors = newFormErrors;
      state.isFormValid = isValid;

      if (isValid) {
        state.isProcessing = true;
      }
    },

    completeCheckout: (state) => {
      state.isProcessing = false;
      state.isComplete = true;

      const timestamp = new Date();
      const randomSuffix = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0');
      state.orderNumber = `ORD-${timestamp.getFullYear()}${(timestamp.getMonth() + 1)
        .toString()
        .padStart(2, '0')}${timestamp.getDate().toString().padStart(2, '0')}-${randomSuffix}`;
    },

    // 초기화
    resetCheckout: (state) => {
      return initialState;
    },
  },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice.reducer;
