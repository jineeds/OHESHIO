import { useDispatch } from 'react-redux';
import { authActins } from '../../store/modules/authSlice';
import Buttons from '../../ui/Buttons';

const SocialLoginButtons = () => {
  const dispatch = useDispatch();
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
  return (
    <div className='flex space-x-2 my-6 '>
      <Buttons className='small flex-1' state={'default'}>
        Google
      </Buttons>
      <Buttons className='small flex-1' state={'default'}>
        Naver
      </Buttons>
      <Buttons className='small flex-1' state={'default'} onClick={handleKakaoLogin}>
        KaKao
      </Buttons>
    </div>
  );
};

export default SocialLoginButtons;
