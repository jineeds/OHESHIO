import { useDispatch } from 'react-redux';
import { authActins } from '../../store/modules/authSlice';
import Buttons from '../../ui/Buttons';
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SocialLoginButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    window.Kakao.Auth.loginForm({
      success: (authObj) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log('카카오 사용자 정보:', res);
            dispatch(
              authActins.socialLogin({
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
        // 액세스 토큰을 사용하여 사용자 정보 가져오기
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userInfo = await userInfoResponse.json();
        console.log('구글 사용자 정보:', userInfo);

        // Redux 디스패치로 로그인 처리
        dispatch(
          authActins.socialLogin({
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
    const clientId = 'oUvWladVsftf_aRbFAFf';
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
  };
  useEffect(() => {
    const handleNaverLoginMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      console.log('메시지 수신:', event.data);

      if (event.data.type === 'naver-login-success') {
        console.log('네이버 로그인 성공 메시지 수신');

        navigate('/main');
      }
    };

    window.addEventListener('message', handleNaverLoginMessage);

    return () => {
      window.removeEventListener('message', handleNaverLoginMessage);
    };
  }, [navigate]);
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
