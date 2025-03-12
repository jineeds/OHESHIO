import { useSelector } from 'react-redux';
import CartHeader from '../../components/cart/CartHeader';
import CartItem from '../../components/cart/CartItem';
import OrderSummary from '../../components/cart/OrderSummary';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartR.items);
  const { subtotal, shipping, discount, total } = useSelector((state) => state.cartR);

  return (
    <>
      <div className="container !max-w-[1536px] pt-20 flex flex-col xl:flex-row gap-10 text-gray-800">
        <div className="basis-3/4">
          <h2 className="text-2xl font-semibold text-gray-700 pb-10">Your bag</h2>
          <CartHeader />
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <CartItem key={item.id} id={item.id} isLast={index === cartItems.length - 1} />
            ))
          ) : (
            <div className="py-20 text-center text-gray-500">
              <p>There is nothing in your bag.</p>
              <Link to={'/'} className="block mt-3 underline underline-offset-2">
                return to shop
              </Link>
            </div>
          )}
        </div>

        <div className="basis-1/4">
          <div className="xl:sticky xl:top-[80px]">
            <OrderSummary subtotal={subtotal} shipping={shipping} discount={discount} total={total} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
