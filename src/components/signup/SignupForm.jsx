import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SocialSignupButton from './SocialSignupButton';
import InputCustom from '../../ui/InputCustom';
import { authActins } from '../../store/modules/authSlice';
import Checkbox from '../../ui/Checkbox';
import Buttons from '../../ui/Buttons';
import SocialMobile from './SocialMobile';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, authed } = useSelector((state) => state.authR);
  const [formData, setFormData] = useState({
    username: '',
    userId: '',
    password: '',
    confirmPassword: '',
    email: '',
    emailDomain: '',
    phone: '',
    verificationCode: '',
  });

  const [errors, setErrors] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    verificationCode: '',
  });

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [validFields, setValidFields] = useState({
    userId: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });
  const emailDomains = [
    { value: '', label: '@ 직접입력' },
    { value: 'gmail.com', label: 'gmail.com' },
    { value: 'naver.com', label: 'naver.com' },
    { value: 'daum.net', label: 'daum.net' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 에러 상태 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // 리덕스 에러 초기화
    if (error) {
      dispatch(authActins.clearError());
    }

    // 유효성 검사
    validateField(name, value);
  };

  // 개별 필드 유효성 검사
  const validateField = (name, value) => {
    switch (name) {
      case 'userId':
        // 아이디가 이미 존재하는지 확인하는 로직 (예시)
        if (value === 'semin') {
          setErrors((prev) => ({ ...prev, userId: '이미 사용하고 있는 아이디입니다.' }));
          setValidFields((prev) => ({ ...prev, userId: false }));
        } else if (value.length < 4) {
          setErrors((prev) => ({ ...prev, userId: '아이디는 4자 이상이어야 합니다.' }));
          setValidFields((prev) => ({ ...prev, userId: false }));
        } else {
          setErrors((prev) => ({ ...prev, userId: '' }));
          setValidFields((prev) => ({ ...prev, userId: true }));
        }
        break;

      case 'password':
        // 비밀번호 조건 검사
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const conditionsMet = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

        if (value.length < 6 || value.length > 20) {
          setErrors((prev) => ({ ...prev, password: '비밀번호는 6-20자 사이여야 합니다.' }));
          setValidFields((prev) => ({ ...prev, password: false }));
        } else if (conditionsMet < 2) {
          setErrors((prev) => ({
            ...prev,
            password: '영문, 숫자, 특수문자 중 2가지 이상 조합해야 합니다.',
          }));
          setValidFields((prev) => ({ ...prev, password: false }));
        } else {
          setErrors((prev) => ({ ...prev, password: '' }));
          setValidFields((prev) => ({ ...prev, password: true }));
        }

        // 비밀번호 확인과의 일치 여부 검사
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: '비밀번호가 일치하지 않습니다.',
          }));
        } else if (formData.confirmPassword) {
          setErrors((prev) => ({ ...prev, confirmPassword: '' }));
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          setErrors((prev) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
        }
        break;

      case 'phone':
        // 전화번호 형식 검사
        const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        if (!phoneRegex.test(value.replace(/-/g, ''))) {
          setErrors((prev) => ({ ...prev, phone: '유효한 휴대폰 번호가 아닙니다.' }));
        } else {
          setValidFields((prev) => ({ ...prev, phone: true }));
        }
        break;

      default:
        break;
    }
  };

  // 전체 폼 유효성 검사
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // 아이디 검사
    if (!formData.userId) {
      newErrors.userId = '아이디를 입력해주세요.';
      isValid = false;
    }

    // 비밀번호 검사
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    }

    // 비밀번호 확인 검사
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    // 이메일 검사
    if (!formData.email || !formData.emailDomain) {
      newErrors.email = '이메일을 입력해주세요.';
      isValid = false;
    }

    // 휴대폰 번호 검사
    if (!formData.phone) {
      newErrors.phone = '휴대폰 번호를 입력해주세요.';
      isValid = false;
    }

    // 휴대폰 인증 검사
    if (!verificationSuccess) {
      newErrors.verificationCode = '휴대폰 인증이 필요합니다.';
      isValid = false;
    }

    // 약관 동의 검사
    if (!agreements.terms || !agreements.privacy) {
      isValid = false;
      // 약관 동의 관련 에러 표시 (화면에 표시할 방법이 필요함)
    }

    setErrors(newErrors);
    return isValid;
  };

  // 약관 동의 처리
  const handleAgreementChange = (agreement) => {
    if (agreement === 'all') {
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        terms: newValue,
        privacy: newValue,
        marketing: newValue,
      });
    } else {
      setAgreements((prev) => {
        const newAgreements = {
          ...prev,
          [agreement]: !prev[agreement],
        };

        // 전체 동의 상태 업데이트
        const allChecked = ['terms', 'privacy', 'marketing'].every((key) => newAgreements[key]);

        return {
          ...newAgreements,
          all: allChecked,
        };
      });
    }
  };

  // 인증번호 전송 처리
  const handleSendVerification = () => {
    if (!formData.phone || errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '유효한 휴대폰 번호를 입력해주세요.' }));
      return;
    }

    // 인증번호 전송 로직 (실제로는 API 호출)
    setVerificationSent(true);

    // 실제 구현에서는 서버에서 인증번호를 받아와야 함
    alert('인증번호가 발송되었습니다.');
  };

  const handleVerifyCode = () => {
    if (formData.verificationCode === '1234') {
      setVerificationSuccess(true);
      setErrors((prev) => ({ ...prev, verificationCode: '' }));
    } else {
      setErrors((prev) => ({ ...prev, verificationCode: '인증번호가 일치하지 않습니다.' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 회원가입 정보 구성
    const signupData = {
      username: formData.username || formData.userId,
      userId: formData.userId,
      userEmail: `${formData.email}@${formData.emailDomain}`,
      password: formData.password,
      phone: formData.phone,
      address: '',
    };

    dispatch(authActins.signup(signupData));
  };

  useEffect(() => {
    if (authed) {
      navigate('/');
    }
  }, [authed, navigate]);

  return (
    <div className='flex flex-col md:flex-row justify-center items-center min-h-screen w-full  mx-auto px-4'>
      <h1 className='text-2xl font-bold text-center mb-6 mt-14 md:hidden'>Create Account</h1>
      <div className='hidden md:flex md:w-1/2 flex-col justify-center items-center mb-8 md:mb-0'>
        <h1 className='text-4xl md:text-5xl font-bold mb-8 md:mb-10  md:text-left whitespace-nowrap'>CREATE ACCOUNT</h1>
        <SocialSignupButton handleSubmit={handleSubmit} />
      </div>
      {/* bg-[url(/images/signup-bg.png)]  bg-right-bottom bg-cover bg-no-repeat */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center  '>
        <div className='w-full max-w-xl'>
          <form
            onSubmit={handleSubmit}
            className='bg-white rounded-lg px-4 sm:px-8 md:px-14 py-6 sm:py-8 md:py-8 w-full md:shadow-[5px_5px_7px_0_rgba(0,0,0,0.25)]'
          >
            {error && <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>{error}</div>}

            {/* 아이디 입력 */}
            <div className='mb-4'>
              <label className='block text-sm font-normal text-gray-600 mb-2'>아이디</label>
              <InputCustom
                name='userId'
                value={formData.userId}
                onChange={handleChange}
                placeholder='아이디'
                error={errors.userId}
                success={validFields.userId}
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className='mb-4'>
              <label className='block text-sm font-normal text-gray-600 mb-2'>패스워드</label>
              <InputCustom
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='패스워드'
                error={errors.password}
                success={validFields.password}
              />
              <p className='text-caption text-right text-gray-600 py-2 font-korean select-none'>
                영어 대/소문자 6~10, 특수문자 조합
              </p>
              <InputCustom
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='패스워드 확인'
                error={errors.confirmPassword}
                success={validFields.confirmPassword}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-normal text-gray-600 mb-2'>이메일</label>
              <div className='flex gap-2'>
                <div className='flex-1'>
                  <InputCustom
                    type='text'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='이메일'
                    error={errors.email ? errors.email : ''}
                    success={''}
                    className='mb-0'
                  />
                </div>
                <div className='flex-3'>
                  <select
                    name='emailDomain'
                    value={formData.emailDomain}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded font-korean ${
                      errors.email ? 'bg-red-50 border border-red-300' : 'bg-primary-100 border-0'
                    } transition-all duration-200 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)] appearance-none`}
                  >
                    {emailDomains.map((domain) => (
                      <option key={domain.value} value={domain.value}>
                        {domain.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-normal text-gray-600 mb-2'>휴대폰 인증</label>
              <div className='flex gap-2 mb-2 '>
                <div className='flex-1 '>
                  <InputCustom
                    type='text'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='휴대폰 번호 (예: 010-1234-5678)'
                    error={errors.phone ? errors.phone : ''}
                    success={validFields.phone}
                    className='mb-0'
                  />
                </div>
                <Buttons className='' onClick={handleSendVerification} state={'default'}>
                  인증번호 받기
                </Buttons>
              </div>

              {verificationSent && (
                <div className='mt-2'>
                  <div className='flex gap-2'>
                    <div className='flex-1'>
                      <InputCustom
                        type='text'
                        name='verificationCode'
                        value={formData.verificationCode}
                        onChange={handleChange}
                        placeholder='인증번호 입력'
                        error={errors.verificationCode ? errors.verificationCode : ''}
                        className='mb-0'
                        disabled={verificationSuccess}
                        success={''}
                      />
                    </div>
                    <button
                      type='button'
                      onClick={handleVerifyCode}
                      disabled={verificationSuccess}
                      className={`px-4 py-3 rounded ${
                        verificationSuccess ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      } transition-all duration-200 whitespace-nowrap`}
                    >
                      {verificationSuccess ? '인증완료' : '인증확인'}
                    </button>
                  </div>

                  {verificationSuccess && (
                    <div className='mt-1 text-green-500 text-sm flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-1'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                      휴대폰 인증이 완료되었습니다.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 약관 동의 */}
            <div className='mb-8 mt-8'>
              <div className='flex items-center mb-3 pb-2 border-b border-gray-200'>
                <Checkbox
                  id='all-agreements'
                  checked={agreements.all}
                  onChange={() => handleAgreementChange('all')}
                  label='본인 인증을 위한 약관 모두 동의'
                />
              </div>

              <div className='flex items-center mb-2'>
                <Checkbox
                  id='terms'
                  checked={agreements.terms}
                  onChange={() => handleAgreementChange('terms')}
                  label={
                    <span>
                      개인정보이용 동의 <span className='text-red-500'>(필수)</span>
                    </span>
                  }
                />
                <button
                  type='button'
                  className='ml-auto text-xs text-gray-500 underline'
                  onClick={() => alert('이용약관 내용')}
                >
                  보기
                </button>
              </div>

              <div className='flex items-center mb-2'>
                <Checkbox
                  id='privacy'
                  checked={agreements.privacy}
                  onChange={() => handleAgreementChange('privacy')}
                  label={
                    <span>
                      고유식별정보처리동의 <span className='text-red-500'>(필수)</span>
                    </span>
                  }
                />
                <button
                  type='button'
                  className='ml-auto text-xs text-gray-500 underline'
                  onClick={() => alert('개인정보 수집 및 이용 내용')}
                >
                  보기
                </button>
              </div>

              <div className='flex items-center'>
                <Checkbox
                  id='marketing'
                  checked={agreements.marketing}
                  onChange={() => handleAgreementChange('marketing')}
                  label={
                    <span>
                      개인정보보이용 등의 <span className='text-gray-500'>(선택)</span>
                    </span>
                  }
                />
              </div>
            </div>
            <div className='w-full block md:hidden'>
              <Buttons className='w-full' state={'active'} onClick={handleSubmit}>
                본인인증 가입
              </Buttons>
            </div>
          </form>
          <div className='block md:hidden w-full mb-8 '>
            <SocialMobile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
