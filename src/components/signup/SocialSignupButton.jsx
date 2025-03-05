import Buttons from '../../ui/Buttons';
const SocialSignupButton = ({ handleSubmit }) => {
  return (
    <>
      <div className='w-full flex flex-col justify-center items-center max-w-md px-2 sm:px-4'>
        <div className='w-full flex flex-col gap-5'>
          <Buttons className='w-full flex-1' state={'active'} onClick={handleSubmit}>
            <span className=''>본인인증 가입</span>
          </Buttons>
          <Buttons className='w-full flex-1' state={'default'}>
            <span className=''>네이버 간편 가입</span>
          </Buttons>
          <Buttons className='w-full flex-1' state={'default'}>
            <span className=''>카카오 1초 간편가입</span>
          </Buttons>
          <Buttons className='w-full flex-1' state={'default'}>
            <span className=''>구글 간편가입</span>
          </Buttons>
        </div>
      </div>
    </>
  );
};

export default SocialSignupButton;
