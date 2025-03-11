import { Outlet } from 'react-router-dom';
import Header from '../header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { authActions } from '../../store/modules/authSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cartR);
  const { authed, currentUser } = useSelector((state) => state.authR);
  const prevCartItemsRef = useRef(null);

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

      <main>
        <Outlet />
      </main>

      <footer>{/* 푸터 콘텐츠 */}</footer>
    </>
  );
};

export default Layout;
