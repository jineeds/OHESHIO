import React, { forwardRef, useState } from 'react';

const InputCustom = forwardRef(
  ({ type = 'text', name, value, error = '', onChange, placeholder, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;
    return (
      <div className='mb-4'>
        <div className='relative'>
          <input
            ref={ref}
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 font-korean rounded bg-primary-100 border-0 transition-all duration-200 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)] ${className}`}
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
                <img src='/icon/eye.png' alt='비빌번호 보이기' />
              ) : (
                <img src='/icon/eye-close.png' alt='비밀번호 가리기' />
              )}
            </div>
          )}
        </div>
        {error && (
          <div className='mt-1 text-red-500 text-sm flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <circle cx='12' cy='12' r='10' strokeWidth='1.5' />
              <path strokeLinecap='round' strokeWidth='1.5' d='M12 7v6' />
              <path strokeLinecap='round' strokeWidth='2' d='M12 17v.01' />
            </svg>
            {error}
          </div>
        )}
      </div>
    );
  }
);

export default InputCustom;
