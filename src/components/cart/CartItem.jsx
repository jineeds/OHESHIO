import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/modules/cartSlice';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const CartItem = ({ id, isLast }) => {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.cartR.items.find((item) => item.id === id));

  if (!item) return null;

  const { name, color, price, quantity, image } = item;

  return (
    <div className={`flex items-center py-5 md:py-0 md:block ${isLast ? '' : 'border-b border-secondary-500'}`}>
      {/* 모바일용 이미지 */}
      <div className="w-1/3 max-w-[120px] md:hidden">
        <Link to={'#'}>
          <img src={image} alt={name} className="" />
        </Link>
      </div>
      <div className="relative flex flex-col flex-1 pl-[4%] md:flex-row md:items-center md:p-5">
        {/* 데스크탑용 이미지 */}
        <div className="hidden md:block w-1/6 pr-10">
          <Link to={'#'}>
            <img src={image} alt={name} className="max-h-40" />
          </Link>
        </div>

        <div className="w-full md:w-2/6 pr-6 flex flex-col md:gap-2">
          <Link to={'#'}>
            <span className="text-sm line-clamp-2 overflow-hidden text-ellipsis">{name}</span>
            <span className="text-xs text-gray-400">{color}</span>
          </Link>
        </div>
        <div className="w-full md:w-1/6 pr-6 text-xs md:text-sm font-light md:font-normal">
          <span className="pr-1 md:sr-only">price:</span>KRW {price.toLocaleString()}
        </div>
        <div className="w-full md:w-1/6 pr-6">
          <div className="flex items-center text-xs md:hidden font-light md:font-normal">
            <span className="pr-1">quantity:</span>
            <div className="flex items-center">
              <button onClick={() => dispatch(cartActions.decreaseQuantity(id))} className="px-1">
                -
              </button>
              <span className="mx-2">{quantity}</span>
              <button onClick={() => dispatch(cartActions.increaseQuantity(id))} className="px-1">
                +
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-between w-full max-w-24 px-2 py-1 bg-slate-200/20 rounded-full border border-slate-400 text-sm">
            <button
              onClick={() => dispatch(cartActions.decreaseQuantity(id))}
              className="w-5 flex items-center justify-center"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => dispatch(cartActions.increaseQuantity(id))}
              className="w-5 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/6 text-xs md:text-sm flex items-center md:justify-between mt-3 md:mt-0 font-light md:font-normal">
          <span className="pr-1 md:sr-only">total:</span>KRW {(price * quantity).toLocaleString()}
          <button
            onClick={() => dispatch(cartActions.removeItem(id))}
            className="absolute top-0 right-0 md:static w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary-300 flex items-center justify-center"
          >
            <IoClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
