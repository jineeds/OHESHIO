import React, { useState } from 'react';
import Buttons from '../../ui/Buttons';

const PopupModal = ({ type, onClose }) => {
  const [name, setName] = useState('홍길동');
  const [email, setEmail] = useState('gildong@example.com');
  const [emailConsent, setEmailConsent] = useState(true);

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
          <div className="flex flex-col gap-4 w-full text-left">
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-600">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-600">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        )}

        {type === 'password' && (
          <div className="flex flex-col gap-4">
            <input type="password" placeholder="현재 비밀번호" className="border p-2 rounded" />
            <input type="password" placeholder="새 비밀번호" className="border p-2 rounded" />
            <input type="password" placeholder="새 비밀번호 확인" className="border p-2 rounded" />
          </div>
        )}

        {type === 'address' && (
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="받는 사람" className="border p-2 rounded" />
            <input type="text" placeholder="주소" className="border p-2 rounded" />
            <input type="text" placeholder="연락처" className="border p-2 rounded" />
          </div>
        )}

        {type === 'email' && (
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailConsent}
                onChange={() => setEmailConsent(!emailConsent)}
                className="w-5 h-5"
              />
              <span className="text-gray-500 text-sm">이메일 수신 동의</span>
            </label>
          </div>
        )}

        {type === 'confirmDelete' && (
          <p className="text-gray-600 text-sm mb-2 text-center">
            정말로 회원 탈퇴하시겠습니까?
            <br />
            회원가 및 이벤트를 놓치지 마세요.
          </p>
        )}

        {/* 버튼 */}
        <div className="flex justify-end gap-2 mt-4">
          <Buttons size="small" state="default" onClick={onClose}>
            취소
          </Buttons>
          {type === 'confirmDelete' ? (
            <Buttons
              size="small"
              state="danger"
              onClick={() => {
                alert('탈퇴 처리되었습니다.');
                onClose();
              }}
            >
              탈퇴
            </Buttons>
          ) : (
            <Buttons size="small" state="primary">
              저장
            </Buttons>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
