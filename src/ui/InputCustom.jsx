import React, { forwardRef, useState } from 'react';

const InputCustom = forwardRef(
  (
    {
      type = 'text',
      name,
      value,
      error = '',
      success = 'false',
      onChange,
      placeholder,
      className = '',
      autoComplete,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const getAutoComplete = () => {
      if (autoComplete) return autoComplete;
      if (type === 'password') return 'current-password';
      return 'off';
    };
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;
    return (
      <>
        <div className=''>
          <div className='relative'>
            <input
              ref={ref}
              type={inputType}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              autoComplete={getAutoComplete()}
              className={`w-full px-4 py-3 font-korean rounded bg-primary-100 ${
                error ? 'bg-red-50 border border-red-300' : 'bg-primary-100 border-0'
              } transition-all duration-200 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)] ${className}`}
              {...props}
            />
            {type === 'password' && (
              <div
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-700 focus:outline-none'
                onClick={(e) => {
                  e.preventDefault();
                  togglePasswordVisibility();
                  if (ref && ref.current) {
                    ref.current.focus();
                  }
                }}
                tabIndex='-1'
              >
                {showPassword ? (
                  <img src='/icon/eye.svg' alt='비빌번호 보이기' />
                ) : (
                  <img src='/icon/eye-close.svg' alt='비밀번호 가리기' />
                )}
              </div>
            )}
          </div>
        </div>
        {error && (
          <div className='mt-1 font-korean select-none text-red-500 text-sm flex gap-2 items-center'>
            <img src='/icon/error.svg' alt='에러아이콘' />
            {error}
          </div>
        )}
        {success && !error && (
          <div className='mt-1 text-gray-500/40 text-sm flex gap-2 items-center'>
            <img src='/icon/success.svg' alt='성공 아이콘' />
            Success
          </div>
        )}
      </>
    );
  }
);

export default InputCustom;
