import { useState } from 'react';
import MyPageOrderHistory from '../../components/mypage/MyPageOrderHistory';
import MyPageCoupons from '../../components/mypage/MyPageCoupons';
import MyPageWishlist from '../../components/mypage/MyPageWishlist';
import MyPageRecentViewed from '../../components/mypage/MyPageRecentViewed';
import MyPageUserInfo from '../../components/mypage/MyPageUserInfo';
import MyPageNavigation from '../../components/mypage/MyPageNavigation';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('주문내역');

  return (
    <div className="max-w-4xl mx-auto py-10 text-center">
      <h1 className="text-2xl font-bold my-6">My Page</h1>
      <MyPageNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-6">
        {activeTab === '주문내역' && <MyPageOrderHistory />}
        {activeTab === '쿠폰/적립금' && <MyPageCoupons />}
        {activeTab === '관심상품' && <MyPageWishlist />}
        {activeTab === '최근 본 상품' && <MyPageRecentViewed />}
        {activeTab === '회원정보' && <MyPageUserInfo />}
      </div>
      <div className="mt-6 text-gray-600 text-sm cursor-pointer hover:underline">로그아웃</div>
    </div>
  );
};

export default MyPage;
