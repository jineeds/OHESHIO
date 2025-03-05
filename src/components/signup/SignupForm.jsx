import { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialSignupButton from './SocialSignupButton';

const SignupForm = () => {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleAgreementChange = (agreement) => {
    setAgreements((prev) => ({
      ...prev,
      [agreement]: !prev[agreement],
    }));
  };

  return (
    <div className='flex flex-col md:flex-row justify-center items-center min-h-screen w-full max-w-[1222px] mx-auto px-4'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center mb-8 md:mb-0'>
        <SocialSignupButton />
      </div>

      <div className='w-full md:w-1/2 flex flex-col justify-center items-center'>
        <div className='w-full max-w-md'>
          <div className='bg-white rounded-lg p-6 w-full border border-gray-300'>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>아이디</label>
              <input
                type='text'
                placeholder='Text'
                className='w-full px-4 py-3 rounded bg-gray-100 border-0 transition-all duration-200'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>패스워드</label>
              <input
                type='password'
                placeholder='비밀번호'
                className='w-full px-4 py-3 rounded bg-gray-100 border-0 transition-all duration-200 mb-2'
              />
              <input
                type='password'
                placeholder='비밀번호 확인'
                className='w-full px-4 py-3 rounded bg-gray-100 border-0 transition-all duration-200'
              />
              <p className='text-xs text-gray-500 mt-1'>6-20자 / 영문 대소자, 숫자, 특수문자 중 2가지 이상 조합</p>
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>이메일</label>
              <div className='flex gap-2 '>
                <input
                  type='email'
                  placeholder='이메일'
                  className='flex-1 px-4 py-3 rounded bg-gray-100 border-0 transition-all duration-200'
                />
                <div className='flex items-center'>
                  <span className=''>@</span>
                </div>
                <select className='flex-1 px-4 py-3 rounded bg-gray-100 border-0 transition-all duration-200 appearance-none'>
                  <option>직접입력</option>
                  <option>gmail.com</option>
                  <option>naver.com</option>
                  <option>daum.net</option>
                </select>
              </div>
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>휴대폰 인증</label>
              <div className='flex gap-2 mb-2'>
                <input
                  type='text'
                  placeholder='휴대폰 번호'
                  className='flex-1 px-4 py-3 rounded bg-gray-100 border-0 transition-all duration-200'
                />
                <button className='px-4 py-3 rounded bg-gray-200 text-gray-600 transition-all duration-200 whitespace-nowrap'>
                  인증번호 받기
                </button>
              </div>
            </div>

            <div className='mb-8'>
              <div className='flex items-center mb-2'>
                <input
                  type='checkbox'
                  id='terms'
                  checked={agreements.terms}
                  onChange={() => handleAgreementChange('terms')}
                  className='rounded text-blue-500 mr-2 transition-colors duration-200'
                />
                <label htmlFor='terms' className='text-sm'>
                  본인 인증을 위한 약관 모두 동의
                </label>
              </div>

              <div className='flex items-center mb-2'>
                <input
                  type='checkbox'
                  id='privacy'
                  checked={agreements.privacy}
                  onChange={() => handleAgreementChange('privacy')}
                  className='rounded text-blue-500 mr-2 transition-colors duration-200'
                />
                <label htmlFor='privacy' className='text-sm'>
                  개인정보이용 동의
                </label>
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='marketing'
                  checked={agreements.marketing}
                  onChange={() => handleAgreementChange('marketing')}
                  className='rounded text-blue-500 mr-2 transition-colors duration-200'
                />
                <label htmlFor='marketing' className='text-sm font-korean'>
                  고유식별정보처리동의
                </label>
              </div>
            </div>

            <button className='w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-full transition-all duration-300'>
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
