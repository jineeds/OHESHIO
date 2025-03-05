import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLoginButtons from './SocialLoginButtons';
import { useDispatch, useSelector } from 'react-redux';
import { authActins } from '../../store/modules/authSlice';
import Checkbox from '../../ui/Checkbox';
import InputCustom from '../../ui/InputCustom';
import Buttons from '../../ui/Buttons';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefId = useRef();
  const inputRefPw = useRef();
  const { error, authed } = useSelector((state) => state.authR);

  const [loginData, setLoginData] = useState({
    userId: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = loginData.userId.trim() !== '' && loginData.password.trim() !== '';
    setIsFormValid(isValid);
  }, [loginData]);
  useEffect(() => {
    if (authed) {
      navigate('/');
    }
  }, [authed, navigate]);

  useEffect(() => {
    const savedId = localStorage.getItem('rememberedId');
    if (savedId) {
      setLoginData((prev) => ({ ...prev, userId: savedId }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
    if (error) dispatch(authActins.clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginData.userId.trim()) {
      setFormError('아이디를 입력해주세요.');
      inputRefId.current?.focus();
      return;
    }
    if (!loginData.password.trim()) {
      setFormError('비밀번호를 입력해주세요.');
      inputRefPw.current?.focus();
      return;
    }

    dispatch(
      authActins.login({
        userId: loginData.userId,
        password: loginData.password,
        rememberMe,
      })
    );
  };
  return (
    <div className='flex justify-center min-h-screen w-full  mx-auto transition-all duration-500 ease-in-out'>
      <div className='hidden md:flex md:w-1/2 h-screen  transition-all duration-500 ease-in-out'>
        <img
          src='/images/login-bg.jpg'
          alt='login 배경이미지'
          className='w-full object-cover mt-[-120px] object-top transition-transform duration-500 ease-in-out'
        />
      </div>

      <div className='w-full md:w-1/2 px-6 flex flex-col justify-center items-center transition-all duration-500 ease-in-out'>
        <div className='w-full max-w-lg transition-all duration-300'>
          <div className='text-center mb-8 flex items-center justify-center transition-all duration-300'>
            <h1 className='w-64 transition-all duration-300'>
              <img src='/images/logo.png' className='object-cover transition-opacity duration-300' alt='로고' />
            </h1>
          </div>

          {(error || formError) && (
            <div className='bg-red-100 border font-korean border-red-400 text-red-700 px-4 py-3 rounded mb-4 transition-all duration-300'>
              {formError || error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className='bg-white rounded-lg shadow-sm p-12 border w-full transition-all duration-300'
            style={{ boxShadow: '5px 5px 7px 0 rgba(0, 0, 0, 0.25)' }}
          >
            <div className='mb-4'>
              <InputCustom
                ref={inputRefId}
                type='text'
                name='userId'
                value={loginData.userId}
                onChange={handleChange}
                placeholder='ID'
                className='font-korean'
              />
            </div>

            <div className='mb-4'>
              <InputCustom
                ref={inputRefPw}
                type='password'
                name='password'
                value={loginData.password}
                onChange={handleChange}
                placeholder='비밀번호'
                className='font-korean'
              />
              <p className='text-xs font-korean select-none text-gray-600 text-right -mt-2 mb-4'>
                영어 대/소문자 6-10, 특수문자 조합
              </p>
            </div>

            <div className='flex justify-between items-center mb-6 transition-all duration-200'>
              <div className='flex items-center font-korean'>
                <Checkbox
                  label={'아이디 저장'}
                  checked={rememberMe}
                  id={'remember'}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </div>
              <div>
                <Link
                  to=''
                  className='text-sm font-korean text-gray-500 hover:text-gray-600 transition-colors duration-200'
                >
                  아이디 / 패스워드 찾기
                </Link>
              </div>
            </div>

            <Buttons className='w-full mb-4' state={isFormValid ? 'active' : 'disabled'}>
              Login
            </Buttons>
            <SocialLoginButtons />

            <div className='border-t border-gray-700 my-8 transition-all duration-300'></div>

            <Link to='/signup'>
              <Buttons className='w-full flex-1' state={'default'}>
                Sign Up
              </Buttons>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
