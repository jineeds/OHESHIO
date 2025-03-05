import Buttons from '../../ui/Buttons';

const SocialSignupButton = ({ handleSubmit }) => {
  return (
    <>
      <div className='w-full flex flex-col justify-center items-center max-w-md px-2 sm:px-4'>
        <h1 className='text-4xl md:text-5xl font-bold mb-8 md:mb-10  md:text-left whitespace-nowrap'>CREATE ACCOUNT</h1>
        <div className='w-full flex flex-col gap-5'>
          <Buttons className='w-full flex-1' state={'active'} onClick={handleSubmit}>
            본인인증 가입
          </Buttons>
          <Buttons className='w-full flex-1' state={'default'}>
            네이버 간편 가입
          </Buttons>
          <Buttons className='w-full flex-1' state={'default'}>
            카카오 1초 간편가입
          </Buttons>
          <Buttons className='w-full flex-1' state={'default'}>
            구글 간편가입
          </Buttons>
        </div>
      </div>
    </>
  );
};

export default SocialSignupButton;
