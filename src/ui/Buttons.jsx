const Buttons = ({
  children,
  type = 'button',
  size = 'normal',
  state = 'default',
  className = '',
  onClick,
  ...props
}) => {
  const sizeStyles = {
    none: 'p-0',
    large: 'py-3 px-6 text-lg',
    normal: 'py-2.5 px-5 text-base',
    medium: 'py-2 px-4 text-base',
    small: 'py-1.5 px-3 text-sm',
    extraSmall: 'py-1 px-2.5 text-xs',
  };

  const stateStyles = {
    default:
      'bg-primary-200/20 text-gray-400 border border-primary-400 hover:bg-gray-200 hover:bg-primary-500 hover:text-gray-50',
    active: 'bg-primary-300 text-gray-500 hover:bg-primary-500 hover:text-gray-50',
    disabled: 'bg-primary-100 text-gray-400  cursor-not-allowed',
    none: 'h-0 block ',
  };

  const baseStyle = 'rounded-full transition-all h-12 flex-shrink-0 duration-200 flex items-center justify-center  ';

  // 최종 클래스명 조합
  const buttonClasses = `
    ${baseStyle}
    ${sizeStyles[size] || sizeStyles.normal}
    ${stateStyles[state] || stateStyles.default}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  const isDisabled = state === 'disabled';

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Buttons;
