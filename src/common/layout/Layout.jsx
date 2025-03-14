import { Outlet } from 'react-router-dom';
import Header from '../header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { cartActions } from '../../store/modules/cartSlice';
import { authActions } from '../../store/modules/authSlice';
import { checkoutActions } from '../../store/modules/checkoutSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cartR);
  const { authed, currentUser } = useSelector((state) => state.authR);
  const prevCartItemsRef = useRef(null);
  const prevAuthedRef = useRef(authed);

  // 로그인 상태 변경 시 장바구니/결제 처리
  useEffect(() => {
    if (prevAuthedRef.current && !authed) {
      dispatch(cartActions.replaceCart([]));
      dispatch(checkoutActions.resetCheckout());
    } else if (!prevAuthedRef.current && authed && currentUser) {
      if (currentUser.cart && currentUser.cart.length > 0) {
        const cartItems = currentUser.cart.map((item) => ({
          id: item.id,
          productID: item.productID,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          color: item.color || 'DEFAULT',
          size: item.size || 'DEFAULT',
        }));
        dispatch(cartActions.replaceCart(cartItems));
      }
    }
    prevAuthedRef.current = authed;
  }, [authed, currentUser, dispatch]);

  // 장바구니 변경 시 정보 동기화
  useEffect(() => {
    const cartItemsChanged = JSON.stringify(prevCartItemsRef.current) !== JSON.stringify(cartItems);

    if (authed && currentUser && cartItemsChanged) {
      dispatch(authActions.updateUserCart(cartItems));
      prevCartItemsRef.current = [...cartItems];
    }
  }, [cartItems, authed, currentUser, dispatch]);

  return (
    <>
      <Header />
      <main className="bg-secondary-50">
        <Outlet />
      </main>
      <footer>{/* 푸터 콘텐츠 */}</footer>
    </>
  );
};

export default Layout;
