import { Outlet } from 'react-router-dom';
import Header from '../header';

const Layout = () => {
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
