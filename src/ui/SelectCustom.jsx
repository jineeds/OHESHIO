import { IoIosArrowDown } from 'react-icons/io';

const SelectCustom = ({ name, value, onChange, options, error = false, disabled = false, className = '' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`appearance-none w-full px-4 py-3 font-korean rounded border-0 transition-all duration-200 focus:outline-primary-600 hover:shadow-[0px_2px_4px_0_rgba(0,0,0,0.25)] ${
          error
            ? 'bg-red-50 !border !border-red-300'
            : disabled
            ? 'bg-gray-100 text-gray-400 pointer-events-none'
            : '!bg-primary-100 !border-none'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <IoIosArrowDown className={disabled ? 'text-gray-400' : 'text-black'} />
      </div>
    </div>
  );
};

export default SelectCustom;
