import { useState, useEffect } from 'react';
import MyPageOrderHistory from '../../components/mypage/MyPageOrderHistory';
import MyPageCoupons from '../../components/mypage/MyPageCoupons';
import MyPageWishlist from '../../components/mypage/MyPageWishlist';
import MyPageRecentViewed from '../../components/mypage/MyPageRecentViewed';
import MyPageUserInfo from '../../components/mypage/MyPageUserInfo';
import MyPageNavigation from '../../components/mypage/MyPageNavigation';
import MyPageHome from '../../components/mypage/MyPageHome';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('홈');

  useEffect(() => {
    console.log('현재 activeTab:', activeTab);
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto py-10 text-center">
      <h1 className="text-2xl font-bold my-6">My Page</h1>
      <MyPageNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-6">
        {activeTab === '홈' && <MyPageHome />}
        {activeTab === '주문내역' && <MyPageOrderHistory />}
        {activeTab === '쿠폰/적립금' && <MyPageCoupons />}
        {activeTab === '관심상품' && <MyPageWishlist />}
        {activeTab === '최근 본 상품' && <MyPageRecentViewed />}
        {activeTab === '회원정보' && <MyPageUserInfo />}
      </div>
    </div>
  );
};

export default MyPage;
