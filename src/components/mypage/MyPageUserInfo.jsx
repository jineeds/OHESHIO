import React, { useState } from 'react';
import Buttons from '../../ui/Buttons';
import PopupModal from './PopupModal';

const MyPageUserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="border-t border-gray-300">
      <div className="w-full min-h-screen bg-white flex flex-col items-center pt-10">
        <div className="w-full max-w-[800px] mx-auto">
          <div className="bg-gray-100 rounded-lg shadow-md p-6 flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">👤</div>
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold cursor-pointer" onClick={() => openModal('profile')}>
                  홍길동
                </h3>
                <p className="text-gray-500 text-sm cursor-pointer" onClick={() => openModal('profile')}>
                  gildong@example.com
                </p>
              </div>
            </div>
            <Buttons size="small" state="default" onClick={() => openModal('profile')}>
              수정
            </Buttons>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">비밀번호 변경</span>
              <Buttons size="small" state="default" onClick={() => openModal('password')}>
                변경
              </Buttons>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">배송지 관리</span>
              <Buttons size="small" state="default" onClick={() => openModal('address')}>
                관리
              </Buttons>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">이메일 수신 설정</span>
              <Buttons size="small" state="default" onClick={() => openModal('email')}>
                설정
              </Buttons>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Buttons size="medium" state="default">
              로그아웃
            </Buttons>
            <Buttons size="medium" state="danger" onClick={() => openModal('confirmDelete')}>
              회원탈퇴
            </Buttons>
          </div>
        </div>

        {isModalOpen && <PopupModal type={modalType} onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

export default MyPageUserInfo;
