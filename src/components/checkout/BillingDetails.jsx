import { useEffect, useState } from 'react';
import InputCustom from '../../ui/InputCustom';
import PostcodeModal from './PostcodeModal';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutActions } from '../../store/modules/checkoutSlice';

const BillingDetails = () => {
  const dispatch = useDispatch();
  const { billingDetails, formErrors } = useSelector((state) => state.checkoutR);
  const { currentUser } = useSelector((state) => state.authR);

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    receiverName: '',
    addressDetail: '',
  });

  useEffect(() => {
    dispatch(checkoutActions.updateBillingDetail({ field: 'phone', value: currentUser.phone }));
    dispatch(checkoutActions.updateBillingDetail({ field: 'email', value: currentUser.userEmail }));
  }, [currentUser, dispatch]);

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'receiverName':
        if (!value.trim()) {
          errorMessage = '받는사람을 입력해 주세요.';
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(checkoutActions.updateBillingDetail({ field: name, value }));
    validateField(name, value);
  };

  const handleComplete = (data) => {
    dispatch(
      checkoutActions.setAddressInfo({
        zonecode: data.zonecode,
        address: data.address,
      })
    );
    setErrors((prev) => ({
      ...prev,
      addressDetail: '',
    }));
    setIsOpen(false);
  };

  const handleMemoChange = (e) => {
    const text = e.target.value;
    if (text.length <= 100) {
      dispatch(checkoutActions.updateOrderMemo(text));
    }
  };

  return (
    <>
      <div className="md:w-[calc(50%-8px)]">
        <label className="flex gap-1 text-sm font-medium font-korean mb-2">
          받는사람<span className="text-xs text-primary-500">*</span>
        </label>
        <InputCustom
          type="text"
          name="receiverName"
          placeholder="받는사람"
          value={billingDetails.receiverName}
          onChange={handleChange}
          error={formErrors?.receiverName || errors.receiverName}
          success={false}
        />
      </div>
      <div>
        <label className="flex gap-1 text-sm font-medium font-korea mb-2">
          주소<span className="text-xs text-primary-500">*</span>
        </label>

        <div className="space-y-3">
          <div className="flex gap-2 md:gap-4">
            <div className="w-full lg:w-[calc(50%-8px)]">
              <InputCustom
                type="text"
                name="zipcode"
                placeholder="우편번호"
                value={billingDetails.zipcode}
                readOnly
                success={false}
                className={`pointer-events-none !bg-gray-100 ${
                  billingDetails.zipcode ? 'text-black' : 'text-gray-400'
                } ${formErrors?.addressDetail ? '!bg-red-50 !border border-red-300' : ''}`}
              />
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="py-3 px-4 h-12 rounded bg-primary-300 text-gray-500 hover:bg-primary-500 hover:text-gray-50 duration-200 flex-shrink-0"
            >
              주소검색
            </button>
          </div>
          <InputCustom
            type="text"
            name="address"
            placeholder="기본주소"
            value={billingDetails.address}
            readOnly
            success={false}
            className={`pointer-events-none !bg-gray-100 ${billingDetails.address ? 'text-black' : 'text-gray-400'} ${
              formErrors?.addressDetail ? '!bg-red-50 !border border-red-300' : ''
            }`}
          />
          <div>
            <InputCustom
              type="text"
              name="addressDetail"
              placeholder="상세주소(선택입력)"
              value={billingDetails.addressDetail}
              onChange={handleChange}
              error={formErrors?.addressDetail || ''}
              success={false}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <label className="flex gap-1 text-sm font-medium font-korean mb-2">
            휴대폰<span className="text-xs text-primary-500">*</span>
          </label>
          <InputCustom
            type="text"
            name="phone"
            value={currentUser.phone ? currentUser.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : ''}
            readOnly
            success={false}
            className="pointer-events-none !bg-gray-100"
          />
        </div>
        <div className="md:w-1/2">
          <label className="flex gap-1 text-sm font-medium font-korean mb-2">
            이메일<span className="text-xs text-primary-500">*</span>
          </label>
          <InputCustom
            type="email"
            name="email"
            value={currentUser.userEmail}
            readOnly
            success={false}
            className="pointer-events-none !bg-gray-100"
          />
        </div>
      </div>
      <div>
        <label className="flex gap-1 text-sm font-medium font-korean mb-2">주문메모</label>
        <textarea
          name="orderMemo"
          value={billingDetails.orderMemo}
          onChange={handleMemoChange}
          placeholder="요청 사항 입력"
          className="w-full px-4 py-3 font-korean rounded bg-primary-100 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)] resize-none"
          rows={3}
        ></textarea>
        <div className="text-right text-gray-500 text-sm mt-1">{billingDetails.orderMemo.length}/100</div>
      </div>

      {isOpen && <PostcodeModal onClose={() => setIsOpen(false)} onComplete={handleComplete} />}
    </>
  );
};

export default BillingDetails;
