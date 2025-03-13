import { useDispatch } from 'react-redux';
import Buttons from '../../ui/Buttons';
import { useGoogleLogin } from '@react-oauth/google';
import { authActions } from '../../store/modules/authSlice';
import { useEffect } from 'react';

const SocialLoginButtons = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_CLIENT_ID);
    }
  }, []);
  useEffect(() => {
    const naverUserData = localStorage.getItem('naverUserData');
    if (naverUserData) {
      try {
        const userData = JSON.parse(naverUserData);

        dispatch(
          authActions.socialLogin({
            provider: 'naver',
            profile: {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              profileImage: userData.profileImage,
            },
          })
        );
        localStorage.removeItem('naverUserData');
      } catch (e) {
        console.error('네이버 로그인 데이터 파싱 오류', e);
      }
    }
  }, [dispatch]);
  const handleKakaoLogin = () => {
    window.Kakao.Auth.loginForm({
      success: (authObj) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            dispatch(
              authActions.socialLogin({
                provider: 'kakao',
                profile: {
                  id: res.id,
                  name: res.properties.nickname,
                  email: res.kakao_account?.email,
                  profileImage: res.properties.profile_image,
                },
              })
            );
          },
          fail: (error) => {
            console.error('카카오 사용자 정보 요청 실패', error);
          },
        });
      },
      fail: (error) => {
        console.error('카카오 로그인 실패', error);
      },
    });
  };
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userInfo = await userInfoResponse.json();

        dispatch(
          authActions.socialLogin({
            provider: 'google',
            profile: {
              id: userInfo.sub,
              name: userInfo.name,
              email: userInfo.email,
              profileImage: userInfo.picture,
            },
          })
        );
      } catch (error) {
        console.error('구글 사용자 정보 요청 실패', error);
      }
    },
    onError: (error) => {
      console.error('구글 로그인 실패', error);
    },
  });

  const handleNaverLogin = () => {
    try {
      const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
      if (!clientId) {
        console.error('네이버 클라이언트 ID가 설정되지 않았습니다');
        return;
      }

      // 리다이렉트 URI 설정
      const redirectUri = `${window.location.origin}/login/callback/naver`;

      // 고유한 상태값 생성 (CSRF 방지)
      const state = Math.random().toString(36).substring(2, 12);
      sessionStorage.setItem('naverState', state);

      // 인증 URL 구성
      const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&state=${state}&auth_type=reprompt`;

      // 팝업 창 크기 및 위치 설정
      const width = 450;
      const height = 550;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      // 팝업 창 열기
      const popup = window.open(naverLoginUrl, 'naverLogin', `width=${width},height=${height},left=${left},top=${top}`);

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        console.error('팝업 창이 차단되었습니다. 브라우저 설정을 확인하세요.');
        return;
      }

      // 팝업 창에서 메시지 수신
      const handleNaverLoginMessage = (event) => {
        // 출처 확인 (보안)
        if (event.origin !== window.location.origin) {
          return;
        }

        // 로그인 성공 메시지 처리
        if (event.data && event.data.type === 'naver-login-success') {
          if (event.data.data) {
            dispatch(authActions.socialLogin(event.data.data));
            window.removeEventListener('message', handleNaverLoginMessage);
          }
        }
      };

      // 메시지 리스너 등록
      window.addEventListener('message', handleNaverLoginMessage);

      // 60초 후 이벤트 리스너 자동 제거 (메모리 누수 방지)
      setTimeout(() => {
        window.removeEventListener('message', handleNaverLoginMessage);
      }, 60000);
    } catch (error) {
      console.error('네이버 로그인 실행 오류:', error);
    }
  };

  return (
    <div className='flex space-x-2 my-6 '>
      <Buttons className='small flex-1' size={'none'} state={'default'} onClick={handleGoogleLogin}>
        Google
      </Buttons>
      <Buttons className='small flex-1' size={'none'} state={'default'} onClick={handleNaverLogin}>
        Naver
      </Buttons>
      <Buttons className='small flex-1' size={'none'} state={'default'} onClick={handleKakaoLogin}>
        KaKao
      </Buttons>
    </div>
  );
};

export default SocialLoginButtons;
