import { IoIosArrowDown } from 'react-icons/io';
import Buttons from '../../ui/Buttons';
import Checkbox from '../../ui/Checkbox';
import InputCustom from '../../ui/InputCustom';

const PaymentMethods = ({ paymentMethod, handlePaymentMethodChange, selectedCard, handleCardChange }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 md:gap-x-4">
        <Buttons
          state={paymentMethod === 'creditCard' ? 'active' : 'default'}
          onClick={() => handlePaymentMethodChange('creditCard')}
        >
          신용카드
        </Buttons>
        <Buttons
          state={paymentMethod === 'bankTransfer' ? 'active' : 'default'}
          onClick={() => handlePaymentMethodChange('bankTransfer')}
        >
          무통장입금
        </Buttons>
        <Buttons
          state={paymentMethod === 'naverPay' ? 'active' : 'default'}
          onClick={() => handlePaymentMethodChange('naverPay')}
        >
          네이버페이
        </Buttons>
        <Buttons
          state={paymentMethod === 'kakaoPay' ? 'active' : 'default'}
          onClick={() => handlePaymentMethodChange('kakaoPay')}
        >
          카카오페이
        </Buttons>
        <Buttons
          state={paymentMethod === 'easyPay' ? 'active' : 'default'}
          onClick={() => handlePaymentMethodChange('easyPay')}
        >
          간편결제
        </Buttons>
        <Buttons
          state={paymentMethod === 'phonePay' ? 'active' : 'default'}
          onClick={() => handlePaymentMethodChange('phonePay')}
        >
          휴대폰결제
        </Buttons>
      </div>

      {paymentMethod === 'creditCard' && (
        <div className="space-y-3">
          <div className="relative md:w-[calc(67%-8px)] flex items-center gap-2">
            <label className="flex gap-1 text-sm font-medium flex-shrink-0">
              카드선택<span className="text-xs text-primary-500">*</span>
            </label>
            <select
              name="cardType"
              value={selectedCard}
              onChange={handleCardChange}
              className="appearance-none w-full px-4 py-3 font-korean rounded bg-primary-100 border-0 transition-all duration-200 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)]"
            >
              <option value="">선택해주세요.</option>
              <option value="samsung">삼성카드</option>
              <option value="hyundai">현대카드</option>
              <option value="kb">KB국민카드</option>
              <option value="shinhan">신한카드</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown />
            </div>
          </div>
          <div className="relative md:w-[calc(67%-8px)] flex items-center gap-2">
            <label className="flex gap-1 text-sm font-medium flex-shrink-0">
              할부기간<span className="text-xs text-primary-500">*</span>
            </label>
            <select
              name="installmentPeriod"
              disabled={!selectedCard}
              className={`appearance-none w-full px-4 py-3 font-korean rounded border-0 transition-all duration-200 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)] ${
                !selectedCard ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary-100'
              }`}
            >
              <option value="0">일시불</option>
              <option value="2">2개월</option>
              <option value="3">3개월</option>
              <option value="6">6개월</option>
              <option value="12">12개월</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown className={!selectedCard ? 'text-gray-400' : 'text-gray-700'} />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'bankTransfer' && (
        <div className="space-y-3">
          <div className="md:w-[calc(67%-8px)] flex items-center gap-2">
            <label className="flex gap-1 text-sm font-medium flex-shrink-0">
              입금자명<span className="text-xs text-primary-500">*</span>
            </label>
            <div className="w-full">
              <InputCustom type="text" name="depositorName" placeholder="입금자명을 입력해주세요" success={false} />
            </div>
          </div>
          <div className="relative md:w-[calc(67%-8px)] flex items-center gap-2">
            <label className="flex gap-1 text-sm font-medium flex-shrink-0">
              입금은행<span className="text-xs text-primary-500">*</span>
            </label>
            <select
              name="bank"
              className="appearance-none w-full px-4 py-3 font-korean rounded bg-primary-100 border-0 transition-all duration-200 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)]"
              defaultValue=""
            >
              <option value="" disabled>
                선택해주세요.
              </option>
              <option value="kb">국민은행</option>
              <option value="woori">우리은행</option>
              <option value="shinhan">신한은행</option>
              <option value="hana">하나은행</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'naverPay' && (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="font-korean">- 네이버페이 결제를 이용하려면 네이버 아이디가 필요합니다.</p>
          <p className="font-korean">
            - 네이버페이 포인트를 사용하여 결제할 수 있으며, 일부 결제 방식에서는 포인트 적립이 제한될 수 있습니다.
          </p>
          <p className="font-korean">- 네이버페이로 결제 시, 현금영수증은 네이버페이 시스템에서 발급 가능합니다.</p>
        </div>
      )}

      {paymentMethod === 'kakaoPay' && (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="font-korean">- 카카오톡 앱을 설치한 후, 최초 1회 카드정보를 등록하셔야 사용 가능합니다.</p>
          <p className="font-korean">- 인터넷 익스플로러는 8 이상에서만 결제 가능합니다.</p>
          <p className="font-korean">- 카카오머니로 결제 시, 현금영수증 발급은 ㈜카카오페이에서 발급가능합니다.</p>
        </div>
      )}

      {paymentMethod === 'easyPay' && (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="font-korean">- 결제 서비스별로 회원 가입 및 결제 수단 등록이 필요할 수 있습니다.</p>
          <p className="font-korean">- 일부 결제 수단은 가맹점 정책에 따라 사용이 제한될 수 있습니다.</p>
          <p className="font-korean">
            - 간편결제 서비스의 결제 취소 및 환불 정책은 해당 결제 서비스 제공사의 정책을 따릅니다.
          </p>
        </div>
      )}

      {paymentMethod === 'phonePay' && (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="font-korean">- 소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.</p>
        </div>
      )}
      <Checkbox id="all-agreements" label="결제수단과 입력정보를 다음에도 사용" />
    </>
  );
};

export default PaymentMethods;
