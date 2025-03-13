import { useDispatch, useSelector } from 'react-redux';
import { checkoutActions } from '../../store/modules/checkoutSlice';
import Buttons from '../../ui/Buttons';
import InputCustom from '../../ui/InputCustom';
import SelectCustom from '../../ui/SelectCustom';

const PaymentMethods = () => {
  const { payment, formErrors } = useSelector((state) => state.checkoutR);
  const { total } = useSelector((state) => state.cartR);
  const dispatch = useDispatch();

  const handlePaymentMethodChange = (method) => {
    dispatch(checkoutActions.setPaymentMethod(method));
  };

  // 카드 선택
  const handleCardChange = (e) => {
    const selectedCard = e.target.value;
    dispatch(checkoutActions.setSelectedCard(selectedCard));
  };

  // 할부 기간 선택
  const handleInstallmentChange = (e) => {
    const installmentPeriod = e.target.value;
    dispatch(checkoutActions.setInstallmentPeriod(installmentPeriod));
  };

  // 입금자명 입력
  const handleDepositorNameChange = (e) => {
    dispatch(checkoutActions.setDepositorName(e.target.value));
  };

  // 은행명 선택
  const handleBankNameChange = (e) => {
    dispatch(checkoutActions.setBankName(e.target.value));
  };

  const cardOptions = [
    { value: '', label: '선택해주세요.', disabled: true },
    { value: 'samsung', label: '삼성카드' },
    { value: 'hyundai', label: '현대카드' },
    { value: 'kb', label: 'KB국민카드' },
    { value: 'shinhan', label: '신한카드' },
    { value: 'lotte', label: '롯데카드' },
    { value: 'hana', label: '하나카드' },
    { value: 'woori', label: '우리카드' },
    { value: 'bc', label: 'BC카드' },
    { value: 'nh', label: 'NH농협카드' },
  ];

  const installmentOptions = [
    { value: '0', label: '일시불' },
    { value: '2', label: '2개월' },
    { value: '3', label: '3개월' },
    { value: '6', label: '6개월' },
    { value: '12', label: '12개월' },
  ];

  const bankOptions = [
    { value: '', label: '선택해주세요.', disabled: true },
    { value: 'kb', label: '국민은행' },
    { value: 'woori', label: '우리은행' },
    { value: 'shinhan', label: '신한은행' },
    { value: 'hana', label: '하나은행' },
    { value: 'nh', label: 'NH농협은행' },
    { value: 'ibk', label: 'IBK기업은행' },
    { value: 'sc', label: 'SC제일은행' },
    { value: 'city', label: '씨티은행' },
    { value: 'kakao', label: '카카오뱅크' },
    { value: 'toss', label: '토스뱅크' },
    { value: 'kbank', label: '케이뱅크' },
    { value: 'post', label: '우체국' },
    { value: 'suhyup', label: '수협은행' },
    { value: 'daegu', label: '대구은행' },
    { value: 'busan', label: '부산은행' },
    { value: 'gwangju', label: '광주은행' },
    { value: 'jeju', label: '제주은행' },
  ];

  const paymentMethods = [
    { id: 'creditCard', label: '신용카드' },
    { id: 'bankTransfer', label: '무통장입금' },
    { id: 'naverPay', label: '네이버페이' },
    { id: 'kakaoPay', label: '카카오페이' },
    { id: 'easyPay', label: '간편결제' },
    { id: 'phonePay', label: '휴대폰결제' },
  ];

  const Label = ({ text, required = false }) => (
    <label className="flex gap-1 text-sm font-medium font-korean flex-shrink-0">
      {text}
      {required && <span className="text-xs text-primary-500">*</span>}
    </label>
  );

  if (total <= 0) return null;

  return (
    <>
      {/* 결제수단 선택 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 md:gap-x-4">
        {paymentMethods.map((method) => (
          <Buttons
            key={method.id}
            state={payment.method === method.id ? 'active' : 'default'}
            onClick={() => handlePaymentMethodChange(method.id)}
            className="font-korean"
          >
            {method.label}
          </Buttons>
        ))}
      </div>

      {/* 결제수단 별 필드 */}
      {payment.method === 'creditCard' && (
        <div className="space-y-3">
          <div className="md:w-[calc(67%-8px)] flex items-center gap-2">
            <Label text="카드선택" required={true} />
            <SelectCustom
              name="cardType"
              value={payment.cardInfo.selectedCard || ''}
              onChange={handleCardChange}
              options={cardOptions}
              error={formErrors?.cardSelection}
            />
          </div>

          <div className="md:w-[calc(67%-8px)] flex items-center gap-2">
            <Label text="할부기간" required={true} />
            <SelectCustom
              name="installmentPeriod"
              value={payment.cardInfo.installmentPeriod || '0'}
              onChange={handleInstallmentChange}
              options={installmentOptions}
              disabled={!payment.cardInfo.selectedCard}
            />
          </div>
        </div>
      )}

      {payment.method === 'bankTransfer' && (
        <div className="space-y-3">
          <div className="md:w-[calc(67%-8px)] flex items-center gap-2">
            <Label text="입금자명" required={true} />
            <div className="w-full">
              <InputCustom
                type="text"
                name="depositorName"
                value={payment.bankTransferInfo.depositorName}
                onChange={handleDepositorNameChange}
                placeholder="입금자명을 입력해주세요"
                success={false}
                className={`${formErrors?.depositorName ? '!bg-red-50 !border border-red-300' : ''}`}
              />
            </div>
          </div>

          <div className="md:w-[calc(67%-8px)] flex items-center gap-2">
            <Label text="입금은행" required={true} />
            <SelectCustom
              name="bankName"
              value={payment.bankTransferInfo.bankName || ''}
              onChange={handleBankNameChange}
              options={bankOptions}
              error={formErrors?.bankName}
            />
          </div>
        </div>
      )}

      {payment.method === 'naverPay' && (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="font-korean">- 네이버페이 결제를 이용하려면 네이버 아이디가 필요합니다.</p>
          <p className="font-korean">
            - 네이버페이 포인트를 사용하여 결제할 수 있으며, 일부 결제 방식에서는 포인트 적립이 제한될 수 있습니다.
          </p>
          <p className="font-korean">- 네이버페이로 결제 시, 현금영수증은 네이버페이 시스템에서 발급 가능합니다.</p>
        </div>
      )}

      {payment.method === 'kakaoPay' && (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="font-korean">- 카카오톡 앱을 설치한 후, 최초 1회 카드정보를 등록하셔야 사용 가능합니다.</p>
          <p className="font-korean">- 인터넷 익스플로러는 8 이상에서만 결제 가능합니다.</p>
          <p className="font-korean">- 카카오머니로 결제 시, 현금영수증 발급은 ㈜카카오페이에서 발급가능합니다.</p>
        </div>
      )}

      {payment.method === 'easyPay' && (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="font-korean">- 결제 서비스별로 회원 가입 및 결제 수단 등록이 필요할 수 있습니다.</p>
          <p className="font-korean">- 일부 결제 수단은 가맹점 정책에 따라 사용이 제한될 수 있습니다.</p>
          <p className="font-korean">
            - 간편결제 서비스의 결제 취소 및 환불 정책은 해당 결제 서비스 제공사의 정책을 따릅니다.
          </p>
        </div>
      )}

      {payment.method === 'phonePay' && (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="font-korean">- 소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.</p>
        </div>
      )}
    </>
  );
};

export default PaymentMethods;
