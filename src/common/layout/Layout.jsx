import { Outlet } from 'react-router-dom';
import Header from '../header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { cartActions } from '../../store/modules/cartSlice';
import { authActions } from '../../store/modules/authSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cartR);
  const { authed, currentUser } = useSelector((state) => state.authR);
  const prevCartItemsRef = useRef(null);
  const prevAuthedRef = useRef(authed);

  // 로그인/로그아웃 상태 변화 감지
  useEffect(() => {
    // 로그아웃 감지
    if (prevAuthedRef.current && !authed) {
      // 로그아웃 시 장바구니 비우기
      dispatch(cartActions.replaceCart([]));
    }
    // 로그인 감지
    else if (!prevAuthedRef.current && authed && currentUser) {
      // 로그인 시 현재 사용자의 장바구니로 초기화
      if (currentUser.cart && currentUser.cart.length > 0) {
        const cartItems = currentUser.cart.map((item) => ({
          id: item.productId,
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

  // 장바구니 변경 시 로컬스토리지와 authSlice 모두 업데이트
  useEffect(() => {
    const cartItemsChanged = JSON.stringify(prevCartItemsRef.current) !== JSON.stringify(cartItems);
    if (authed && currentUser && cartItemsChanged) {
      // cartSlice 액션으로 로컬스토리지 업데이트
      dispatch(cartActions.updateUserCart(cartItems));

      // authSlice 상태도 업데이트
      const userCartItems = cartItems.map((item) => ({
        id: item.id,
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        color: item.color || 'DEFAULT',
        size: item.size || 'DEFAULT',
      }));

      // 현재 사용자의 cart 필드만 업데이트
      dispatch(
        authActions.updateUserInfo({
          id: currentUser.id,
          cart: userCartItems,
        })
      );

      prevCartItemsRef.current = [...cartItems];
    }
  }, [cartItems, authed, currentUser, dispatch]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>{/* 푸터 콘텐츠 */}</footer>
    </>
  );
};

export default Layout;
