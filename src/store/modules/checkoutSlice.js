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

  // 결제 방법
  paymentMethod: 'creditCard',

  // 할인 코드
  appliedDiscountCode: null,

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
    // // 개별 필드 업데이트
    // updateBillingDetail: (state, action) => {
    //   const { field, value } = action.payload;
    //   state.billingDetails[field] = value;
    // },

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

    // // 주소 검색 결과 설정
    // setAddressInfo: (state, action) => {
    //   const { zonecode, address } = action.payload;
    //   state.billingDetails.zipcode = zonecode;
    //   state.billingDetails.address = address;
    // },
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

    // 결제 시작 액션
    // startCheckout: (state) => {
    //   state.isProcessing = true;
    // },

    // // 결제 완료 액션
    // completeCheckout: (state, action) => {
    //   state.isProcessing = false;
    //   state.isComplete = true;
    //   state.orderNumber = action.payload.orderNumber;
    // },

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    validateCheckoutForm: (state) => {
      console.log('validateCheckoutForm 실행');
      console.log('zipcode:', state.billingDetails.zipcode);
      console.log('address:', state.billingDetails.address);

      let isValid = true;
      const newFormErrors = {};

      // 받는 사람 검증
      if (!state.billingDetails.receiverName.trim()) {
        console.log('receiverName 실패');
        newFormErrors.receiverName = '받는사람을 입력해 주세요.';
        isValid = false;
      }

      // 주소 검증
      if (!state.billingDetails.zipcode || !state.billingDetails.address) {
        console.log('주소 검증 실패');
        newFormErrors.addressDetail = '주소검색을 진행해주세요.';
        isValid = false;
      } else {
        console.log('주소 검증 성공');
      }

      console.log('최종 isValid:', isValid);
      console.log('newFormErrors:', newFormErrors);

      state.formErrors = newFormErrors;
      state.isFormValid = isValid;

      if (isValid) {
        state.isProcessing = true;
      }
    },

    // 결제 완료 처리
    completeCheckout: (state) => {
      state.isProcessing = false;
      state.isComplete = true;

      // 주문번호 생성 - 현재 시간 기반 (수정 전)
      state.orderNumber = 'ORD-' + Date.now().toString().slice(-8);

      console.log('주문 완료! 주문번호:', state.orderNumber); // 디버깅용
    },
  },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice.reducer;
