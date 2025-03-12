import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLoginButtons from './SocialLoginButtons';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';
import Checkbox from '../../ui/Checkbox';
import InputCustom from '../../ui/InputCustom';
import Buttons from '../../ui/Buttons';
import { cartActions } from '../../store/modules/cartSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefId = useRef();
  const inputRefPw = useRef();
  const { error, authed, currentUser } = useSelector((state) => state.authR);

  const [loginData, setLoginData] = useState({
    userId: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);
  const [validFields, setValidFields] = useState({
    userId: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });
  const [errors, setErrors] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    verificationCode: '',
  });
  useEffect(() => {
    const isValid = loginData.userId.trim() !== '' && loginData.password.trim() !== '';
    setIsFormValid(isValid);
  }, [loginData]);

  useEffect(() => {
    if (authed) {
      if (currentUser && currentUser.cart && currentUser.cart.length > 0) {
        const cartItems = currentUser.cart.map((item) => ({
          id: item.productId,
          name: item.name,
          color: item.color || 'DEFAULT',
          size: item.size || 'DEFAULT',
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }));

        dispatch(cartActions.replaceCart(cartItems));
      }
      navigate('/');
    }
  }, [authed]);

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
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (error) dispatch(authActions.clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginData.userId.trim()) {
      setErrors((prev) => ({ ...prev, userId: '아이디를입력해주세요' }));
      setValidFields((prev) => ({ ...prev, userId: false }));
      inputRefId.current?.focus();
      return;
    }
    if (!loginData.password.trim()) {
      setErrors((prev) => ({ ...prev, password: '비밀번호를 입력해주세요.' }));
      setValidFields((prev) => ({ ...prev, password: false }));
      inputRefPw.current?.focus();
      return;
    }

    dispatch(
      authActions.login({
        userId: loginData.userId,
        password: loginData.password,
        rememberMe,
      })
    );
  };
  return (
    <div className="flex justify-center min-h-screen w-full  mx-auto transition-all duration-500 ease-in-out">
      <div className="hidden md:flex md:w-1/2 h-screen  transition-all duration-500 ease-in-out">
        <img
          src="/images/login-bg.jpg"
          alt="login 배경이미지"
          className="w-full object-cover mt-[-120px] object-top transition-transform duration-500 ease-in-out"
        />
      </div>

      <div className="w-full md:w-1/2 px-6 flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="w-full max-w-lg transition-all duration-300">
          <div className="text-center mb-8 flex items-center justify-center transition-all duration-300">
            <h1 className="w-64 transition-all duration-300">
              <img src="/images/logo.svg" className="object-cover transition-opacity duration-300" alt="로고" />
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm p-12 border w-full transition-all duration-300"
            style={{ boxShadow: '5px 5px 7px 0 rgba(0, 0, 0, 0.25)' }}
          >
            <div className="mb-4">
              <InputCustom
                ref={inputRefId}
                type="text"
                name="userId"
                value={loginData.userId}
                onChange={handleChange}
                placeholder="ID"
                className="font-korean"
                error={error}
                success={validFields.userId}
              />
            </div>

            <div className="mb-4">
              <InputCustom
                ref={inputRefPw}
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                className="font-korean"
                error={error}
                success={validFields.password}
              />
              <p className="text-xs font-korean select-none py-2 text-gray-600 text-right ">
                영어 대/소문자 6-10, 특수문자 조합
              </p>
            </div>

            <div className="flex justify-between items-center mb-6 transition-all duration-200">
              <div className="flex items-center font-korean">
                <Checkbox
                  label={'아이디 저장'}
                  checked={rememberMe}
                  id={'remember'}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </div>
              <div>
                <Link
                  to=""
                  className="text-sm font-korean text-gray-500 hover:text-gray-600 transition-colors duration-200"
                >
                  아이디 / 패스워드 찾기
                </Link>
              </div>
            </div>

            <Buttons type="submit" className="w-full mb-4" state={isFormValid ? 'active' : 'disabled'}>
              Login
            </Buttons>
            <SocialLoginButtons />

            <div className="border-t border-gray-700 my-8 transition-all duration-300"></div>

            <Link to="/signup">
              <Buttons className="w-full flex-1" state={'default'}>
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
