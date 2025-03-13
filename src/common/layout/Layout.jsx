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

  useEffect(() => {
    if (prevAuthedRef.current && !authed) {
      dispatch(cartActions.replaceCart([]));
      dispatch(checkoutActions.resetCheckout());
    } else if (!prevAuthedRef.current && authed && currentUser) {
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

  useEffect(() => {
    const cartItemsChanged = JSON.stringify(prevCartItemsRef.current) !== JSON.stringify(cartItems);
    if (authed && currentUser && cartItemsChanged) {
      dispatch(cartActions.updateUserCart(cartItems));

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
