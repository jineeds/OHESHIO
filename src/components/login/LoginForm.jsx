import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLoginButtons from './SocialLoginButtons';
import { useDispatch, useSelector } from 'react-redux';
import { authActins } from '../../store/modules/authSlice';

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
      <div className='hidden md:flex md:w-1/2 md:justify-center md:items-center transition-all duration-500 ease-in-out'>
        <img
          src='/images/login-bg.jpg'
          alt='login 배경이미지'
          className='w-[480px] object-contain transition-transform duration-500 ease-in-out'
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
            style={{ boxShadow: '10px 10px 4px 0 rgba(0, 0, 0, 0.25)' }}
          >
            <div className='mb-4'>
              <input
                ref={inputRefId}
                type='text'
                name='userId'
                value={loginData.userId}
                onChange={handleChange}
                placeholder='아이디'
                className='w-full px-4 py-3 rounded bg-primary-100 border-0 transition-all duration-200'
              />
            </div>

            <div className='mb-4'>
              <input
                ref={inputRefPw}
                type='password'
                name='password'
                value={loginData.password}
                onChange={handleChange}
                placeholder='비밀번호'
                className='w-full px-4 py-3 rounded bg-primary-100 border-0 transition-all duration-200'
              />
            </div>

            <div className='flex justify-between items-center mb-6 transition-all duration-200'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='remember'
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className='rounded text-blue-500 mr-2 transition-colors duration-200'
                />
                <label htmlFor='remember' className='text-sm font-korean'>
                  아이디 저장
                </label>
              </div>
              <div>
                <Link
                  to='/find-account'
                  className='text-sm font-korean text-gray-600 hover:text-gray-900 transition-colors duration-200'
                >
                  아이디 / 비밀번호 찾기
                </Link>
              </div>
            </div>

            <button
              type='submit'
              className='w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-full transition-all duration-300 mb-4'
            >
              Login
            </button>

            <div className='border-t border-gray-300 my-6 transition-all duration-300'></div>

            <Link to='/signup'>
              <button className='w-full border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-50 transition-all duration-300'>
                Sign Up
              </button>
            </Link>
          </form>
          <SocialLoginButtons />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
