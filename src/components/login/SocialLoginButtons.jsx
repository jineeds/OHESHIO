import { useDispatch } from 'react-redux';
import Buttons from '../../ui/Buttons';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/modules/authSlice';
import { useEffect } from 'react';

const SocialLoginButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = `${window.location.origin}/login/callback/naver`;
    const state = Math.random().toString(36).substring(2, 12);

    sessionStorage.setItem('naverState', state);

    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}&auth_type=reprompt`;

    const width = 450;
    const height = 550;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(naverLoginUrl, 'naverLogin', `width=${width},height=${height},left=${left},top=${top}`);

    const handleNaverLoginMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data.type === 'naver-login-success') {
        if (event.data.data) {
          dispatch(authActions.socialLogin(event.data.data));
        } else {
          const savedData = localStorage.getItem('naverLoginSuccess');
          if (savedData) {
            try {
              const userData = JSON.parse(savedData);
              dispatch(authActions.socialLogin(userData));
            } catch (e) {
              console.error('Saved login data parsing error', e);
            }
          }
        }
        window.removeEventListener('message', handleNaverLoginMessage);
      }
    };

    window.addEventListener('message', handleNaverLoginMessage);
  };

  return (
    <div className='flex space-x-2 my-6 '>
      <Buttons className='small flex-1' state={'default'} onClick={handleGoogleLogin}>
        Google
      </Buttons>
      <Buttons className='small flex-1' state={'default'} onClick={handleNaverLogin}>
        Naver
      </Buttons>
      <Buttons className='small flex-1' state={'default'} onClick={handleKakaoLogin}>
        KaKao
      </Buttons>
    </div>
  );
};

export default SocialLoginButtons;
