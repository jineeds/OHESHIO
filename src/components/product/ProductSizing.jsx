import React, { useRef, useEffect } from 'react';

const ProductSizing = ({ isOpen, onClose, category = 'top', name }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getImagePath = () => {
    switch (category) {
      case 'top':
        return '/images/sizing_top.png';
      case 'bottom':
        return '/images/sizing_bottom.png';
      case 'outer':
        return '/images/sizing_outer.png';
      default:
        return '/images/sizing_top.png';
    }
  };

  return (
    <div className='fixed inset-0 bg-white/30 flex z-50 p-4 flex-col h-screen justify-center ml-0 sm:ml-5'>
      <div
        ref={modalRef}
        className='bg-white rounded-lg shadow-lg w-full max-w-full sm:w-[65%] sm:min-w-[600px] md:min-w-[800px] max-h-[90vh] overflow-hidden'
      >
        <div className='flex justify-between items-center p-4 sm:p-6'>
          <h2 className='text-md font-normal'>{name}</h2>
          <button className='text-gray-500 hover:text-gray-700 focus:outline-none' onClick={onClose}>
            close
          </button>
        </div>

        <div className='p-4 overflow-y-auto max-h-[calc(90vh-64px)]'>
          <div className='mb-8 text-center'>
            <img src={getImagePath()} alt={`${name} sizing chart`} className='w-40 sm:w-56 h-auto' />
          </div>

          <div className='mb-8'>
            <div className='flex flex-col md:flex-row'>
              <div className='w-full md:w-1/2'>
                <div className='es-sizing-chart-col w-full'>
                  <div className='text-sm font-semibold mb-2'>measurement (cm)</div>
                  <div className='flex flex-col space-y-2'>
                    <div className='text-sm'>underarm to underarm</div>
                    <div className='text-sm'>full length - shoulder to hem</div>
                    <div className='text-sm'>sleeve length</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto mb-8'>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr>
                  <th className='py-2 px-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    Ref
                  </th>
                  <th className='py-2 px-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    measurement (cm)
                  </th>
                  <th className='py-2 px-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    XXS
                  </th>
                  <th className='py-2 px-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    XS
                  </th>
                  <th className='py-2 px-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    S
                  </th>
                  <th className='py-2 px-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    M
                  </th>
                  <th className='py-2 px-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    L
                  </th>
                  <th className='py-2 px-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    XL
                  </th>
                  <th className='py-2 px-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    XXL
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                <tr>
                  <td className='py-2 px-3 text-sm font-medium text-gray-900'>A</td>
                  <td className='py-2 px-3 text-sm text-gray-700'>underarm to underarm</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>60</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>68.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>71</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>73.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>76.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>79.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>82.5</td>
                </tr>
                <tr>
                  <td className='py-2 px-3 text-sm font-medium text-gray-900'>B</td>
                  <td className='py-2 px-3 text-sm text-gray-700'>full length - shoulder to hem</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>60.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>65.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>64.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>66.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>69</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>72</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>75</td>
                </tr>
                <tr>
                  <td className='py-2 px-3 text-sm font-medium text-gray-900'>C</td>
                  <td className='py-2 px-3 text-sm text-gray-700'>sleeve length</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>43</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>44.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>46</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>47.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>48.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>49.5</td>
                  <td className='py-2 px-3 text-sm text-gray-700 text-center'>50.5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='mt-6'>
            <div className='text-sm text-gray-600'>
              <div>모델 착용 정보: 키 175cm, 체중 65kg, 착용 사이즈 M</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSizing;
