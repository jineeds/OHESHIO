import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/layout/Layout';
import { About, Cart, Home, Login, Main, MyPage, Product, Signup } from './pages';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('f7aadc98e379d0346b134b21cb45c732');
      console.log('Kakao SDK initialized');
    }
  }, []);
  return (
    <>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
