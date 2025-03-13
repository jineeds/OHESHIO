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

        // 해시에서 토큰 추출 시도
        if (window.location.hash) {
          const hash = window.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          accessToken = params.get('access_token');
        }

        // 쿼리에서 토큰 추출 시도 (해시에서 못 찾은 경우)
        if (!accessToken && window.location.search) {
          const params = new URLSearchParams(window.location.search);
          accessToken = params.get('access_token');
        }

        const userData = {
          provider: 'naver',
          profile: {
            id: `naver_${new Date().getTime()}`,
            name: '네이버 사용자',
            email: 'user1@naver.com',
            profileImage: 'https://via.placeholder.com/150',
          },
        };
        dispatch(authActions.socialLogin(userData));

        if (window.opener) {
          const openerOrigin = window.location.origin;

          try {
            window.opener.postMessage(
              {
                type: 'naver-login-success',
                data: userData,
              },
              openerOrigin
            );
          } catch (msgError) {
            console.error('부모 창에 메시지 전송 실패:', msgError);
          }

          window.close();
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
            profileImage: 'https://via.placeholder.com/150',
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
