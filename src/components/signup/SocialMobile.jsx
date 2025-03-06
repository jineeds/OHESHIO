import { Link } from 'react-router-dom';
import Buttons from '../../ui/Buttons';
const NaverIcon = () => <img src='/icon/naver.svg' alt='' />;

const KakaoIcon = () => <img src='/icon/kakao.svg' alt='' />;

const GoogleIcon = () => <img src='/icon/google.svg' alt='' />;

const SocialMobile = () => {
  return (
    <>
      <div className='w-full flex flex-col justify-center items-center   px-2'>
        <div className='w-full flex items-center justify-center gap-16  my-9'>
          <Buttons size={'none'} state={'none'}>
            <span>
              <NaverIcon />
            </span>
          </Buttons>
          <Buttons size={'none'} state={'none'}>
            <span>
              <KakaoIcon />
            </span>
          </Buttons>
          <Buttons size={'none'} state={'none'}>
            <span>
              <GoogleIcon />
            </span>
          </Buttons>
        </div>
        <Link to={'/'}>
          <img src='/images/logo-m.svg' alt='오헤시오 로고' />
        </Link>
      </div>
    </>
  );
};

export default SocialMobile;
