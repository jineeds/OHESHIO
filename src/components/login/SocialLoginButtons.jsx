import { useDispatch } from 'react-redux';
import { authActins } from '../../store/modules/authSlice';

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
    <div className='flex space-x-2 mb-8'>
      <button className='flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition-colors duration-300'>
        Google
      </button>
      <button className='flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition-colors duration-300'>
        Naver
      </button>
      <button
        onClick={handleKakaoLogin}
        className='flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition-colors duration-300'
      >
        Kakao
      </button>
    </div>
  );
};

export default SocialLoginButtons;
