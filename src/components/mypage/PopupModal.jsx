// ✅ PopupModal.js (모달 내부 저장 로직 포함)
import React, { useState, useEffect } from 'react';
import Buttons from '../../ui/Buttons';

const PopupModal = ({ type, onClose, onSave, currentName, currentEmail, currentAddress }) => {
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
          {type === 'password' && '비밀번호 변경'}
          {type === 'address' && '배송지 관리'}
          {type === 'profile' && '내 정보 수정'}
          {type === 'email' && '이메일 수신 설정'}
          {type === 'confirmDelete' && '회원 탈퇴'}
        </h2>

        {type === 'profile' && (
          <div className="flex flex-col gap-4 text-left">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">이메일</label>
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
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="현재 비밀번호"
              className="border p-2 rounded"
              value={passwordInfo.current}
              onChange={(e) => setPasswordInfo({ ...passwordInfo, current: e.target.value })}
            />
            <input
              type="password"
              placeholder="새 비밀번호"
              className="border p-2 rounded"
              onChange={(e) => setPasswordInfo({ ...passwordInfo, new: e.target.value })}
            />
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              className="border p-2 rounded"
              onChange={(e) => setPasswordInfo({ ...passwordInfo, confirm: e.target.value })}
            />
          </div>
        )}

        {type === 'address' && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="받는 사람"
              className="border p-2 rounded"
              value={addressInfo.receiver}
              onChange={(e) => setAddressInfo({ ...addressInfo, receiver: e.target.value })}
            />
            <input
              type="text"
              placeholder="주소"
              className="border p-2 rounded"
              value={addressInfo.address}
              onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="연락처"
              className="border p-2 rounded"
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
          <p className="text-gray-600 text-sm mb-2 text-center">
            정말로 회원 탈퇴하시겠습니까?
            <br />
            회원가 및 이벤트 혜택을 놓치지 마세요.
          </p>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Buttons size="small" state="default" onClick={onClose}>
            취소
          </Buttons>
          {type === 'confirmDelete' ? (
            <Buttons
              size="small"
              state="danger"
              onClick={() => {
                alert('탈퇴 처리 완료');
                onClose();
              }}
            >
              확인
            </Buttons>
          ) : (
            <Buttons size="small" state="primary" onClick={handleSave}>
              저장
            </Buttons>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
