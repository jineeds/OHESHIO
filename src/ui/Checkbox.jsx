import React from 'react';

const Checkbox = ({ label, checked, onChange, id }) => {
  return (
    <div className='flex items-center cursor-pointer'>
      <label htmlFor={id} className='flex items-center select-none cursor-pointer'>
        <div className='relative'>
          <input type='checkbox' id={id} checked={checked} onChange={onChange} className='sr-only' />
          <div>
            {checked ? (
              <img src='/icon/CheckboxT.png' alt='체크가 된 체크박스' />
            ) : (
              <img src='/icon/Checkbox.png' alt='체크가 안된 체크박스' />
            )}
          </div>
        </div>

        <span className='ml-2 font-korean text-gray-500 text-sm'>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
