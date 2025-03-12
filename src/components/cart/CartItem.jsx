import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/modules/cartSlice';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useState, useEffect } from 'react';

const CartItem = ({ id, isLast }) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cartR.items.find((item) => item.id === id));
  const [inputValue, setInputValue] = useState(item?.quantity?.toString() || '1');
  const productId = item.id.split('_')[0];

  useEffect(() => {
    if (item && item.quantity) {
      setInputValue(item.quantity.toString());
    }
  }, [item]);

  if (!item) return null;
  const { name, color, price, quantity, image, size } = item;

  const handleQuantityChange = (e) => {
    const newValue = e.target.value;
    // 빈 문자열이거나 숫자만 허용
    if (newValue === '' || /^\d+$/.test(newValue)) {
      setInputValue(newValue);
      // 숫자인 경우에만 Redux 상태 업데이트
      if (newValue !== '' && parseInt(newValue, 10) > 0) {
        dispatch(cartActions.setQuantity({ id: id, quantity: parseInt(newValue, 10) }));
      }
    }
  };
  // 포커스를 잃었을 때 처리
  const handleBlur = () => {
    // 빈 값이거나 0 이하인 경우 1로 설정
    if (inputValue === '' || parseInt(inputValue, 10) <= 0) {
      setInputValue('1');
      dispatch(cartActions.setQuantity({ id: id, quantity: 1 }));
    }
  };

  return (
    <>
      <div className="flex items-center py-5 md:py-0 md:block border-b border-secondary-300">
        {/* 모바일용 이미지 */}
        <div className="w-1/3 max-w-[120px] md:hidden">
          <Link to={`/product/${productId}`}>
            <img src={image} alt={name} className="" />
          </Link>
        </div>
        <div className="relative flex flex-col flex-1 pl-[4%] md:flex-row md:items-center md:p-5 ">
          {/* 데스크탑용 이미지 */}
          <div className="hidden md:block w-1/6 pr-10">
            <Link to={`/product/${productId}`}>
              <img src={image} alt={name} className="" />
            </Link>
          </div>
          <div className="w-full md:w-2/6 pr-6 flex flex-col md:gap-2">
            <Link to={`/product/${productId}`}>
              <strong className="text-sm xl:text-base line-clamp-2 overflow-hidden text-ellipsis font-normal md:mb-1 xl:mb-2">
                {name}
              </strong>
              <div className="text-xs lg:text-sm text-gray-400">
                <span>{color}</span>
                <span className="px-1">/</span>
                <span>{size}</span>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/6 pr-6 text-xs md:text-sm xl:text-base font-light md:font-normal">
            <span className="pr-1 md:sr-only">price:</span>KRW {price.toLocaleString()}
          </div>
          <div className="w-full md:w-1/6 pr-6">
            {/* 모바일용 수량버튼 */}
            <div className="flex items-center text-xs md:hidden font-light md:font-normal">
              <span className="pr-1">quantity:</span>
              <div className="flex items-center">
                <button
                  onClick={() => dispatch(cartActions.setQuantity({ id, quantity: quantity - 1 }))}
                  className="px-1"
                >
                  -
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleQuantityChange}
                  onBlur={handleBlur}
                  className="w-6 text-center bg-transparent outline-none"
                />
                <button
                  onClick={() => dispatch(cartActions.setQuantity({ id, quantity: quantity + 1 }))}
                  className="px-1"
                >
                  +
                </button>
              </div>
            </div>
            {/* 데스크탑용 수량버튼 */}
            <div className="hidden md:flex items-center justify-between w-full max-w-24 px-2 py-1 bg-slate-200/20 rounded-full border border-slate-400 text-sm">
              <button
                onClick={() => dispatch(cartActions.setQuantity({ id, quantity: quantity - 1 }))}
                className="w-5 flex items-center justify-center"
              >
                -
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="w-10 bg-transparent text-center outline-none"
              />
              <button
                onClick={() => dispatch(cartActions.setQuantity({ id, quantity: quantity + 1 }))}
                className="w-5 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/6 text-xs md:text-sm xl:text-base flex items-center md:justify-between mt-3 md:mt-0 font-light md:font-normal">
            <span>
              <span className="pr-1 md:sr-only">total:</span>KRW {(price * quantity).toLocaleString()}
            </span>
            <button
              onClick={() => dispatch(cartActions.removeItem(id))}
              className="absolute top-0 right-0 md:static w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary-300 flex items-center justify-center"
            >
              <IoClose />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
