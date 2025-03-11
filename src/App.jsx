import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/layout/Layout';
import { About, Cart, Checkout, Home, Login, Main, MyPage, Product, Signup } from './pages';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NaverCallback from './components/login/NaverCallback';
import { ToastContainer } from 'react-toastify';

function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('f7aadc98e379d0346b134b21cb45c732');
    }
  }, []);
  return (
    <>
      <GoogleOAuthProvider clientId='61932039197-uvv3mbu0bs9j03idqgtgorgo8gtlvr84.apps.googleusercontent.com'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/' element={<Layout />}>
              <Route path='/about' element={<About />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/product' element={<Product />} />
              <Route path='/product/:productId' element={<Product />} />
              <Route path='/main' element={<Main />} />
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/checkout' element={<Checkout />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login/callback/naver' element={<NaverCallback />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
