import { useState } from 'react';
import InputCustom from '../../ui/InputCustom';
import PostcodeModal from './PostcodeModal';

const BillingDetails = ({ orderMemo, handleMemoChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');

  const handleComplete = (data) => {
    setZipcode(data.zonecode);
    setAddress(data.address);
    setIsOpen(false);
  };
  return (
    <>
      <div className="md:w-[calc(50%-8px)]">
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
          <div className="flex gap-2 md:gap-4">
            <div className="w-full lg:w-[calc(50%-8px)]">
              <InputCustom
                type="text"
                name="zipcode"
                placeholder="우편번호"
                value={zipcode}
                readOnly
                success={false}
                style={{
                  cursor: 'not-allowed',
                  backgroundColor: '#f3f4f6',
                  color: zipcode ? '#000' : '#9ca3af',
                }}
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
            value={address}
            readOnly
            success={false}
            style={{
              cursor: 'not-allowed',
              backgroundColor: '#f3f4f6',
              color: address ? '#000' : '#9ca3af',
            }}
          />
          <InputCustom type="text" name="addressDetail" placeholder="나머지 주소(선택 입력 가능)" success={false} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <label className="flex gap-1 text-sm font-medium mb-2">
            휴대폰번호<span className="text-xs text-primary-500">*</span>
          </label>
          <InputCustom type="text" name="phone" placeholder="010-1234-5678" success={false} />
        </div>
        <div className="md:w-1/2">
          <label className="flex gap-1 text-sm font-medium mb-2">
            이메일<span className="text-xs text-primary-500">*</span>
          </label>
          <InputCustom type="email" name="email" placeholder="abc@email.com" success={false} />
        </div>
      </div>
      <div>
        <label className="flex gap-1 text-sm font-medium mb-2">주문메모</label>
        <textarea
          name="orderMemo"
          value={orderMemo}
          onChange={handleMemoChange}
          placeholder="요청 사항 입력"
          className="w-full px-4 py-3 font-korean rounded border border-gray-300 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)] resize-none"
          rows={3}
        ></textarea>
        <div className="text-right text-gray-500 text-sm mt-1">{orderMemo.length}/100</div>
      </div>

      {isOpen && <PostcodeModal onClose={() => setIsOpen(false)} onComplete={handleComplete} />}
    </>
  );
};

export default BillingDetails;
