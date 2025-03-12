import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 배송 정보
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
    // 신용카드 관련 정보
    cardInfo: {
      selectedCard: '',
      installmentPeriod: 0,
    },
    // 무통장입금 관련 정보
    bankTransferInfo: {
      bankName: '',
      depositorName: '',
    },
  },

  // 할인 코드
  discountType: 'percentage',
  discountValue: 0,

  formErrors: {},
  isFormValid: false,

  // 결제 프로세스 상태
  isProcessing: false,
  isComplete: false,

  // 결제 성공 시 생성되는 주문 번호
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

      // 필드 값이 변경될 때 해당 필드의 에러 메시지 초기화
      if (state.formErrors && state.formErrors[field]) {
        // 해당 필드의 에러만 제거
        const newErrors = { ...state.formErrors };
        delete newErrors[field];
        state.formErrors = newErrors;
      }

      // 주소 관련 필드인 경우 addressDetail 에러도 함께 초기화
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

      // 주소 관련 에러 제거
      if (state.formErrors) {
        // 직접 null로 설정하거나 객체에서 해당 속성 제거
        state.formErrors = { ...state.formErrors };
        delete state.formErrors.addressDetail;
      }
    },

    // 주문 메모 업데이트
    updateOrderMemo: (state, action) => {
      state.billingDetails.orderMemo = action.payload;
    },

    // 결제 방법 선택
    setPaymentMethod: (state, action) => {
      state.payment.method = action.payload;

      // 결제 방법 변경 시 해당 방법에 맞지 않는 정보 초기화
      if (action.payload === 'creditCard') {
        // 신용카드 외 결제 방법의 정보 초기화
        state.payment.bankTransferInfo.depositorName = '';
        state.payment.bankTransferInfo.bankName = '';

        // formErrors 초기화
        if (state.formErrors) {
          delete state.formErrors.depositorName;
          delete state.formErrors.bankName;
        }
      } else if (action.payload === 'bankTransfer') {
        // 무통장입금 외 결제 방법의 정보 초기화
        state.payment.cardInfo.selectedCard = '';
        state.payment.cardInfo.installmentPeriod = 0;

        // formErrors 초기화
        if (state.formErrors) {
          delete state.formErrors.cardSelection;
        }
      }

      // 다른 결제 방법으로 변경 시 모든 관련 상태 초기화
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

      // formErrors에서 cardSelection 에러 제거
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

      // formErrors에서 depositorName 에러 제거
      if (state.formErrors && state.formErrors.depositorName) {
        const newErrors = { ...state.formErrors };
        delete newErrors.depositorName;
        state.formErrors = newErrors;
      }
    },
    setBankName: (state, action) => {
      state.payment.bankTransferInfo.bankName = action.payload;

      // formErrors에서 bankName 에러 제거
      if (state.formErrors && state.formErrors.bankName) {
        const newErrors = { ...state.formErrors };
        delete newErrors.bankName;
        state.formErrors = newErrors;
      }
    },

    // 할인코드 검사
    applyDiscountCode: (state, action) => {
      const code = action.payload;

      if (code === '10') {
        state.appliedDiscountCode = code;
        state.discountType = 'percentage';
        state.discountValue = 10; // 10% 할인
        state.discountError = null;
      } else if (code === '20') {
        state.appliedDiscountCode = code;
        state.discountType = 'percentage';
        state.discountValue = 20; // 20% 할인
        state.discountError = null;
      } else if (code === '100') {
        state.appliedDiscountCode = code;
        state.discountType = 'percentage';
        state.discountValue = 100;
        state.discountError = null;
      } else {
        state.appliedDiscountCode = null;
        state.discountType = null;
        state.discountValue = 0;
        state.discountError = '유효하지 않은 할인 코드입니다.';
      }
    },

    // 폼 유효성 검사
    validateCheckoutForm: (state, action) => {
      let isValid = true;
      const newFormErrors = {};
      const cartTotal = action.payload || 0; // 장바구니 총액을 받아옴

      // 기존 주소/수취인 검증 로직
      if (!state.billingDetails.receiverName.trim()) {
        newFormErrors.receiverName = '받는사람을 입력해 주세요.';
        isValid = false;
      }

      if (!state.billingDetails.zipcode || !state.billingDetails.address) {
        newFormErrors.addressDetail = '주소검색을 진행해주세요.';
        isValid = false;
      }

      // 결제 방법에 따른 추가 검증
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
  },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice.reducer;
