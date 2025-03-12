import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';

const NaverCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const accessToken = params.get('access_token');
    const state = params.get('state');

    const savedState = sessionStorage.getItem('naverState');
    sessionStorage.removeItem('naverState');

    if (!accessToken || state !== savedState) {
      navigate('/login');
      return;
    }

    // 사용자 데이터
    const userData = {
      provider: 'naver',
      profile: {
        id: 'naver_' + new Date().getTime(),
        name: '네이버 user1',
        email: 'naver_user@example.com',
        profileImage: 'https://via.placeholder.com/150',
      },
    };

    dispatch(authActions.socialLogin(userData));

    localStorage.setItem('naverLoginSuccess', JSON.stringify(userData));

    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'naver-login-success',
          data: userData,
        },
        window.location.origin
      );
      window.close();
    } else {
      console.log('리다이렉트 시도: /main');
      navigate('/main');
      console.log('리다이렉트 후');
    }
  }, [dispatch, navigate]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
      <p className='ml-2'>네이버 로그인 처리 중...</p>
    </div>
  );
};

export default NaverCallback;
