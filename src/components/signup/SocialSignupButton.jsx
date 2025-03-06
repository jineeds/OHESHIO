const SocialSignupButton = () => {
  return (
    <>
      <div className='w-full max-w-md px-2 sm:px-4'>
        <h1 className='text-4xl md:text-5xl font-bold mb-8 md:mb-10 text-center md:text-left whitespace-nowrap'>
          CREATE ACCOUNT
        </h1>

        <button className='w-full py-3 px-4 rounded-full border border-gray-300 mb-4 transition-all duration-300'>
          카카오 1초 간편가입
        </button>

        <button className='w-full py-3 px-4 rounded-full border border-gray-300 mb-4 transition-all duration-300'>
          네이버 간편가입
        </button>

        <button className='w-full py-3 px-4 rounded-full bg-gray-500 hover:bg-gray-600 text-white mb-4 transition-all duration-300'>
          본인인증 가입
        </button>
      </div>
    </>
  );
};

export default SocialSignupButton;
