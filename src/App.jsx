import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/layout/Layout';
import { About, Cart, Home, Login, Main, MyPage, Product, Signup } from './pages';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NaverCallback from './components/login/NaverCallback';

function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('f7aadc98e379d0346b134b21cb45c732');
      console.log('Kakao SDK initialized');
    }
  }, []);
  return (
    <GoogleOAuthProvider clientId='61932039197-uvv3mbu0bs9j03idqgtgorgo8gtlvr84.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product' element={<Product />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/main' element={<Main />} />
            <Route path='/mypage' element={<MyPage />} />
          </Route>
          <Route path='/login/callback/naver' element={<NaverCallback />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
