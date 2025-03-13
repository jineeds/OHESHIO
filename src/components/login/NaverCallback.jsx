import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';

const NaverCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processNaverLogin = async () => {
      try {
        let accessToken = null;
        if (window.location.hash) {
          const hash = window.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          accessToken = params.get('access_token');

          const state = params.get('state');
          const savedState = sessionStorage.getItem('naverState');

          if (state && savedState && state !== savedState) {
            throw new Error('Security validation failed: State mismatch');
          }
        }

        const userData = {
          provider: 'naver',
          profile: {
            id: `naver_${new Date().getTime()}`,
            name: '네이버 사용자',
            email: 'user1@naver.com',
            profileImage: '/images/profile.gif',
          },
        };
        dispatch(authActions.socialLogin(userData));

        if (window.opener) {
          try {
            const openerOrigin = window.location.origin;
            console.log('Sending message to parent window', {
              type: 'naver-login-success',
              data: userData,
            });

            window.opener.postMessage(
              {
                type: 'naver-login-success',
                data: userData,
              },
              openerOrigin
            );

            setTimeout(() => window.close(), 1000);
          } catch (msgError) {
            console.error('부모 창에 메시지 전송 실패:', msgError);
            setTimeout(() => window.close(), 1000);
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('네이버 로그인 처리 오류:', error);

        const fallbackUserData = {
          provider: 'naver',
          profile: {
            id: `naver_${new Date().getTime()}`,
            name: '네이버 사용자 (오류 복구)',
            email: null,
            profileImage: '/images/profile.gif',
          },
        };

        dispatch(authActions.socialLogin(fallbackUserData));

        if (window.opener) {
          try {
            window.opener.postMessage(
              {
                type: 'naver-login-success',
                data: fallbackUserData,
              },
              window.location.origin
            );
          } catch (msgError) {
            console.error('오류 상태에서 메시지 전송 실패:', msgError);
          }

          window.close();
        } else {
          setError(`네이버 로그인 처리 중 오류: ${error.message}`);
          setTimeout(() => navigate('/'), 3000);
        }
      } finally {
        setLoading(false);
      }
    };

    processNaverLogin();
  }, [dispatch, navigate]);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {loading && (
        <>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4'></div>
          <p>네이버 로그인 처리 중...</p>
        </>
      )}

      {error && (
        <div className='text-red-500 mb-4 p-4 bg-red-50 rounded'>
          <p className='font-bold'>오류 발생:</p>
          <p>{error}</p>
          <p className='mt-2'>메인 페이지로 이동합니다...</p>
        </div>
      )}
    </div>
  );
};

export default NaverCallback;
