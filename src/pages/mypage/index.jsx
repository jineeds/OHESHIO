import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyPageOrderHistory from '../../components/mypage/MyPageOrderHistory';
import MyPageCoupons from '../../components/mypage/MyPageCoupons';
import MyPageWishlist from '../../components/mypage/MyPageWishlist';
import MyPageRecentViewed from '../../components/mypage/MyPageRecentViewed';
import MyPageUserInfo from '../../components/mypage/MyPageUserInfo';
import MyPageNavigation from '../../components/mypage/MyPageNavigation';
import MyPageHome from '../../components/mypage/MyPageHome';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [cancelledOrders, setCancelledOrders] = useState(
    () => JSON.parse(localStorage.getItem('cancelledOrders')) || []
  );
  const [exchangeOrders, setExchangeOrders] = useState(() => JSON.parse(localStorage.getItem('exchangeOrders')) || []);
  const [refundOrders, setRefundOrders] = useState(() => JSON.parse(localStorage.getItem('refundOrders')) || []);

  const currentUser = useSelector((state) => state.authR.currentUser);
  const isAuthed = useSelector((state) => state.authR.authed);

  const updatedOrders =
    currentUser?.orders?.map((order) => {
      const displayStatus = [];
      const now = new Date();
      const createdAt = new Date(order.createdAt);
      const diffMinutes = (now - createdAt) / (1000 * 60);
      // 주문 시간으로 배송 과정 처리함
      if (cancelledOrders.includes(order.id)) {
        displayStatus.push('주문취소');
      } else {
        if (order.status === 'paid') {
          displayStatus.push('결제완료');
          if (diffMinutes < 1) displayStatus.push('배송준비중');
          else if (diffMinutes < 3) displayStatus.push('배송중');
          else displayStatus.push('배송완료');
        }
        if (order.status === 'pending' && order.paymentMethod === 'bankTransfer') {
          displayStatus.push('입금대기');
        }
      }

      return { ...order, displayStatus };
    }) || [];

  if (!isAuthed) {
    return (
      <div className="max-w-7xl mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold my-6">로그인이 필요합니다</h1>
        <p>마이페이지를 이용하려면 로그인해 주세요.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 text-center mt-8">
      <h1 className="text-2xl font-bold my-6">My Page</h1>
      <MyPageNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-6">
        {activeTab === 'Home' && (
          <MyPageHome
            orders={updatedOrders}
            exchangeOrders={exchangeOrders}
            refundOrders={refundOrders}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'Order' && (
          <MyPageOrderHistory
            orders={updatedOrders}
            cancelledOrders={cancelledOrders}
            setCancelledOrders={setCancelledOrders}
            exchangeOrders={exchangeOrders}
            setExchangeOrders={setExchangeOrders}
            refundOrders={refundOrders}
            setRefundOrders={setRefundOrders}
          />
        )}
        {activeTab === 'Coupon' && <MyPageCoupons points={currentUser.points} coupons={currentUser.coupons} />}
        {activeTab === 'Wishlist' && <MyPageWishlist wishlist={currentUser.wishlist} />}
        {activeTab === 'History' && (
          <MyPageRecentViewed recentlyViewed={currentUser.recentlyViewed || []} wishlist={currentUser.wishlist} />
        )}
        {activeTab === 'Info' && <MyPageUserInfo userInfo={currentUser} />}
      </div>
    </div>
  );
};

export default MyPage;
