import BarLoader from 'react-spinners/BarLoader';

const CustomLoader = ({ textColor = 'text-white' }) => {
  const loaderStyle = {
    display: 'block',
    width: '100%',
    height: '4px',
    boxShadow: '0 0 10px rgba(0,0,0,0.4)',
    borderRadius: '2px',
  };

  return (
    <div className="text-center relative top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] max-w-[280px]">
      <p className={`font-mono text-xs mb-3 ${textColor}`}>loading...</p>
      <BarLoader color="#fff" cssOverride={loaderStyle} />
    </div>
  );
};

export default CustomLoader;
