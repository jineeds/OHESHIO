import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        {/* 여기에 네비게이션 메뉴 등 공통 요소를 배치 */}
        <nav>{/* 네비게이션 링크 */}</nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>{/* 푸터 콘텐츠 */}</footer>
    </>
  );
};

export default Layout;
