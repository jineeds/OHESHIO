import React, { useState, useEffect } from 'react';
import Buttons from '../../ui/Buttons';

const PopupModal = ({ type, onClose, onSave, currentName, currentEmail, currentAddress, onDelete }) => {
  const [name, setName] = useState(currentName || '홍길동');
  const [email, setEmail] = useState(currentEmail || 'gildong@example.com');
  const [emailConsent, setEmailConsent] = useState(true);
  const [passwordInfo, setPasswordInfo] = useState({ current: 'default1234', new: '', confirm: '' });
  const [addressInfo, setAddressInfo] = useState(
    currentAddress || { receiver: '홍길동', address: '서울특별시 강남구 테헤란로', phone: '010-1234-5678' }
  );

  useEffect(() => {
    setName(currentName || '홍길동');
    setEmail(currentEmail || 'gildong@example.com');
    setAddressInfo(
      currentAddress || { receiver: '홍길동', address: '서울특별시 강남구 테헤란로', phone: '010-1234-5678' }
    );
  }, [currentName, currentEmail, currentAddress]);

  const handleSave = () => {
    if (type === 'profile') {
      onSave({ name, email });
    } else if (type === 'password') {
      onSave(passwordInfo);
    } else if (type === 'address') {
      onSave(addressInfo);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h2 className="text-lg font-semibold mb-4">
          {/* 비밀번호, 배송지, 내정보 변경 네임 영문으로 변경 */}
          {type === 'password' && 'Change Password'}
          {type === 'address' && 'Delivery Management'}
          {type === 'profile' && 'Change My Information'}
          {type === 'email' && '이메일 수신 설정'}
          {type === 'confirmDelete' && 'Withdrawal of membership'}
        </h2>

        {type === 'profile' && (
          <div className="flex flex-col gap-4 text-left">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded font-korean"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">e-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </div>
        )}

        {type === 'password' && (
          <div className="flex flex-col gap-4 ">
            <input
              type="password"
              placeholder="현재 비밀번호"
              className="border p-2 rounded font-korean"
              value={passwordInfo.current}
              onChange={(e) => setPasswordInfo({ ...passwordInfo, current: e.target.value })}
            />
            <input
              type="password"
              placeholder="새 비밀번호"
              className="border p-2 rounded font-korean"
              onChange={(e) => setPasswordInfo({ ...passwordInfo, new: e.target.value })}
            />
            <input
              type="password"
              placeholder="새 비밀번호 확인 "
              className="border p-2 rounded font-korean"
              onChange={(e) => setPasswordInfo({ ...passwordInfo, confirm: e.target.value })}
            />
          </div>
        )}

        {type === 'address' && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="받는 사람"
              className="border p-2 rounded font-korean"
              value={addressInfo.receiver}
              onChange={(e) => setAddressInfo({ ...addressInfo, receiver: e.target.value })}
            />
            <input
              type="text"
              placeholder="주소"
              className="border p-2 rounded font-korean"
              value={addressInfo.address}
              onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="연락처"
              className="border p-2 rounded font-korean"
              value={addressInfo.phone}
              onChange={(e) => setAddressInfo({ ...addressInfo, phone: e.target.value })}
            />
          </div>
        )}

        {type === 'email' && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={emailConsent}
              onChange={() => setEmailConsent(!emailConsent)}
              className="w-5 h-5"
            />
            <span className="text-gray-500 text-sm">이메일 수신 동의</span>
          </label>
        )}

        {type === 'confirmDelete' && (
          <div className="text-center">
            <p className="text-gray-700 mb-2 font-korean">정말로 회원 탈퇴하시겠습니까?</p>
            <p className="text-gray-400 text-sm mt-3 mb-3 font-korean">
              회원가입 혜택 및 이벤트 혜택을 놓치지 마세요.
              <br />
              탈퇴 후에는 데이터를 복구할 수 없습니다.
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Buttons size="small" state="default" onClick={onClose} className="font-korean">
            취소
          </Buttons>
          {type === 'confirmDelete' ? (
            <Buttons size="small" state="danger" onClick={onDelete} className="font-korean">
              탈퇴하기
            </Buttons>
          ) : (
            <Buttons size="small" state="primary" onClick={handleSave} className="font-korean">
              저장
            </Buttons>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
