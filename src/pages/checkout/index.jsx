import { IoSearch } from 'react-icons/io5';
import Buttons from '../../ui/Buttons';
import Checkbox from '../../ui/Checkbox';
import InputCustom from '../../ui/InputCustom';
import { useState } from 'react';
import CartItem from '../../components/cart/CartItem';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

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
      <header className="h-[72px] bg-gray-200">header</header>
      <div className="container !max-w-[1556px] mb-10">
        <div className="min-h-[100svh] flex gap-10">
          <div className="w-[55%] pt-20">
            <h2 className="text-2xl font-semibold text-gray-700 pb-10">Billing Details</h2>
            <form action="" className="space-y-6">
              <div className="w-[calc(50%-8px)]">
                <label className="flex gap-1 text-sm font-medium mb-2">
                  받는사람<span className="text-xs text-primary-500">*</span>
                </label>
                <InputCustom type="text" name="receiverName" placeholder="받는사람" success={false} />
              </div>
              <div>
                <label className="flex gap-1 text-sm font-medium mb-2">
                  주소<span className="text-xs text-primary-500">*</span>
                </label>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <div className="w-[calc(50%-8px)]">
                      <InputCustom type="text" name="zipcode" placeholder="우편번호" success={false} />
                    </div>
                    <button
                      type="button"
                      className="py-3 px-4 h-12 rounded bg-primary-300 text-gray-500 hover:bg-primary-500 hover:text-gray-50 duration-200"
                    >
                      주소검색
                    </button>
                  </div>
                  <InputCustom type="text" name="address" placeholder="기본주소" success={false} />
                  <InputCustom
                    type="text"
                    name="addressDetail"
                    placeholder="나머지 주소(선택 입력 가능)"
                    success={false}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="flex gap-1 text-sm font-medium mb-2">
                    휴대폰번호<span className="text-xs text-primary-500">*</span>
                  </label>
                  <InputCustom type="text" name="phone" placeholder="010-1234-5678" success={false} />
                </div>
                <div className="w-1/2">
                  <label className="flex gap-1 text-sm font-medium mb-2">
                    이메일<span className="text-xs text-primary-500">*</span>
                  </label>
                  <InputCustom type="email" name="email" placeholder="abc@email.com" success={false} />
                </div>
              </div>
              <div>
                <textarea
                  name="orderMemo"
                  value={orderMemo}
                  onChange={handleMemoChange}
                  placeholder="Order Memo"
                  className="w-full px-4 py-3 font-korean rounded border border-gray-300 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)] resize-none"
                  rows={3}
                ></textarea>
                <div className="text-right text-gray-500 text-sm mt-1">{orderMemo.length}/100</div>
              </div>
              <div>
                <div className="flex gap-4">
                  <Buttons
                    state={paymentMethod === 'creditCard' ? 'active' : 'default'}
                    className="flex-1"
                    onClick={() => handlePaymentMethodChange('creditCard')}
                  >
                    신용카드
                  </Buttons>
                  <Buttons
                    state={paymentMethod === 'bankTransfer' ? 'active' : 'default'}
                    className="flex-1"
                    onClick={() => handlePaymentMethodChange('bankTransfer')}
                  >
                    무통장입금
                  </Buttons>
                  <Buttons
                    state={paymentMethod === 'naverPay' ? 'active' : 'default'}
                    className="flex-1"
                    onClick={() => handlePaymentMethodChange('naverPay')}
                  >
                    네이버페이
                  </Buttons>
                </div>
                <div className="flex gap-4 mt-4">
                  <Buttons
                    state={paymentMethod === 'kakaoPay' ? 'active' : 'default'}
                    className="flex-1"
                    onClick={() => handlePaymentMethodChange('kakaoPay')}
                  >
                    카카오페이
                  </Buttons>
                  <Buttons
                    state={paymentMethod === 'easyPay' ? 'active' : 'default'}
                    className="flex-1"
                    onClick={() => handlePaymentMethodChange('easyPay')}
                  >
                    간편결제
                  </Buttons>
                  <Buttons
                    state={paymentMethod === 'phonePay' ? 'active' : 'default'}
                    className="flex-1"
                    onClick={() => handlePaymentMethodChange('phonePay')}
                  >
                    휴대폰결제
                  </Buttons>
                </div>
              </div>

              {/* 신용카드 선택 시 추가 필드 */}
              {paymentMethod === 'creditCard' && (
                <div className="space-y-3">
                  <div className="relative w-[calc(67%-8px)] flex items-center gap-2">
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
                  <div className="relative w-[calc(67%-8px)] flex items-center gap-2">
                    <label className="flex gap-1 text-sm font-medium flex-shrink-0">
                      할부기간<span className="text-xs text-primary-500">*</span>
                    </label>
                    <select
                      name="installmentPeriod"
                      disabled={!selectedCard} // 카드가 선택되지 않으면 비활성화
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

              {/* 무통장입금 선택 시 추가 필드 */}
              {paymentMethod === 'bankTransfer' && (
                <div className="space-y-3">
                  <div className="w-[calc(67%-8px)] flex items-center gap-2">
                    <label className="flex gap-1 text-sm font-medium flex-shrink-0">
                      입금자명<span className="text-xs text-primary-500">*</span>
                    </label>
                    <div className="w-full">
                      <InputCustom
                        type="text"
                        name="depositorName"
                        placeholder="입금자명을 입력해주세요"
                        success={false}
                      />
                    </div>
                  </div>
                  <div className="relative w-[calc(67%-8px)] flex items-center gap-2">
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

              {/* 네이버페이 선택 시 안내 */}
              {paymentMethod === 'naverPay' && (
                <div className="text-xs text-gray-500 space-y-0.5">
                  <p className="font-korean">- 네이버페이 결제를 이용하려면 네이버 아이디가 필요합니다.</p>
                  <p className="font-korean">
                    - 네이버페이 포인트를 사용하여 결제할 수 있으며, 일부 결제 방식에서는 포인트 적립이 제한될 수
                    있습니다.
                  </p>
                  <p className="font-korean">
                    - 네이버페이로 결제 시, 현금영수증은 네이버페이 시스템에서 발급 가능합니다.
                  </p>
                </div>
              )}

              {/* 카카오페이 선택 시 안내 */}
              {paymentMethod === 'kakaoPay' && (
                <div className="text-xs text-gray-500 space-y-0.5">
                  <p className="font-korean">
                    - 카카오톡 앱을 설치한 후, 최초 1회 카드정보를 등록하셔야 사용 가능합니다.
                  </p>
                  <p className="font-korean">- 인터넷 익스플로러는 8 이상에서만 결제 가능합니다.</p>
                  <p className="font-korean">
                    - 카카오머니로 결제 시, 현금영수증 발급은 ㈜카카오페이에서 발급가능합니다.
                  </p>
                </div>
              )}

              {/* 간편결제 선택 시 */}
              {paymentMethod === 'easyPay' && (
                <div className="text-xs text-gray-500 space-y-0.5">
                  <p className="font-korean">- 결제 서비스별로 회원 가입 및 결제 수단 등록이 필요할 수 있습니다.</p>
                  <p className="font-korean">- 일부 결제 수단은 가맹점 정책에 따라 사용이 제한될 수 있습니다.</p>
                  <p className="font-korean">
                    - 간편결제 서비스의 결제 취소 및 환불 정책은 해당 결제 서비스 제공사의 정책을 따릅니다.
                  </p>
                </div>
              )}

              {/* 휴대폰 결제 선택 시 */}
              {paymentMethod === 'phonePay' && (
                <div className="text-xs text-gray-500 space-y-0.5">
                  <p className="font-korean">- 소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.</p>
                </div>
              )}
              <Checkbox id="all-agreements" label="결제수단과 입력정보를 다음에도 사용" />
            </form>
          </div>
          <div className="w-[45%] pt-20">
            <div className="border border-black rounded-lg p-10">
              <h2 className="text-2xl text-center font-semibold text-gray-700 pb-10">Order Details</h2>
              <div className=" flex items-center gap-4">
                <div className="relative w-[20%] max-w-24 bg-gray-100 rounded-lg border border-gray-200">
                  <Link to={'#'}>
                    <img src="/images/RTBTANKROCK.png" alt="" />
                  </Link>
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-gray-800/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    1
                  </div>
                </div>
                <div className="flex-1 flex justify-between items-baseline">
                  <div>
                    <strong className="block text-sm font-normal mb-2">SHIRT HOODED ZIP-UP</strong>
                    <span className="block text-xs text-gray-400">BEIGE</span>
                    <span className="block text-xs text-gray-400">XS</span>
                  </div>
                  <div>
                    <span className="text-sm">KRW 198,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
