import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [
    {
      id: 1,
      username: '셈',
      userId: 'semin',
      userEmail: 'test@gmail.com',
      password: '123456',
      phone: '010-1234-5678',
      address: '강남역 이젠 아카데미',
      cart: [],
      wishlist: [],
      orders: [],
      reviews: [],
      points: 1000,
      coupons: [
        {
          id: 1,
          name: '[자주배송 전용] 가입 축하 할인 쿠폰',
          amount: '10,000원',
          discount: '70% 할인',
          validity: '2025-03-09 - 2025-03-16',
        },
        {
          id: 2,
          name: '회원 가입 축하 할인 쿠폰',
          amount: '50,000원',
          discount: '15% 할인',
          validity: '2025-03-09 - 2025-03-16',
        },
        {
          id: 3,
          name: '회원 가입 축하 할인 쿠폰',
          amount: '300,000원',
          discount: '10% 할인',
          validity: '2025-03-09 - 2025-03-16',
        },
      ],
      createdAt: '2025-03-05',
    },
  ],

  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,

  authed: localStorage.getItem('authed') === 'true',

  error: null,

  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { username, userId, userEmail, password, phone, address } = action.payload;

      const existingUser = state.users.find((user) => user.userId === userId || user.userEmail === userEmail);

      if (existingUser) {
        state.error = '이미 사용 중인 아이디 또는 이메일입니다.';
        return;
      }
      const currentDate = new Date();

      const validityEndDate = new Date(currentDate);
      validityEndDate.setDate(validityEndDate.getDate() + 7);

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const validityPeriod = `${formatDate(currentDate)} - ${formatDate(validityEndDate)}`;

      const newUser = {
        id: state.users.length > 0 ? Math.max(...state.users.map((user) => user.id)) + 1 : 1,
        username,
        userId,
        userEmail,
        password,
        phone,
        address: address || '',
        cart: [],
        wishlist: [],
        orders: [],
        reviews: [],
        points: 1000,
        coupons: [
          {
            id: 1,
            name: '[자주배송 전용] 가입 축하 할인 쿠폰',
            amount: '10,000원',
            discount: '70% 할인',
            validity: validityPeriod,
          },
          {
            id: 2,
            name: '회원 가입 축하 할인 쿠폰',
            amount: '50,000원',
            discount: '15% 할인',
            validity: validityPeriod,
          },
          {
            id: 3,
            name: '회원 가입 축하 할인 쿠폰',
            amount: '300,000원',
            discount: '10% 할인',
            validity: validityPeriod,
          },
        ],
        createdAt: new Date().toISOString(),
      };

      state.users.push(newUser);
      state.currentUser = newUser;
      state.authed = true;
      state.error = null;

      localStorage.setItem('users', JSON.stringify(state.users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('authed', 'true');
    },

    login: (state, action) => {
      const { userId, password, rememberMe } = action.payload;

      const user = state.users.find(
        (user) => (user.userId === userId || user.userEmail === userId) && user.password === password
      );

      if (user) {
        const updatedUser = {
          ...user,
          cart: user.cart || [],
          wishlist: user.wishlist || [],
          orders: user.orders || [],
          reviews: user.reviews || [],
          points: user.points || 0,
          coupons: user.coupons || [],
        };

        state.currentUser = updatedUser;
        state.authed = true;
        state.error = null;

        const userIndex = state.users.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('authed', 'true');

        if (rememberMe) {
          localStorage.setItem('rememberedId', userId);
        } else {
          localStorage.removeItem('rememberedId');
        }
      } else {
        state.error = '아이디 또는 비밀번호가 일치하지 않습니다.';
      }
    },

    logout: (state) => {
      state.currentUser = null;
      state.authed = false;

      localStorage.removeItem('currentUser');
      localStorage.setItem('authed', 'false');
    },
    socialLogin: (state, action) => {
      const { provider, profile } = action.payload;

      const existingUser = state.users.find((user) => user.socialId === profile.id && user.socialProvider === provider);

      if (existingUser) {
        state.currentUser = existingUser;
        state.authed = true;
        state.error = null;

        localStorage.setItem('currentUser', JSON.stringify(existingUser));
        localStorage.setItem('authed', 'true');
      } else {
        const currentDate = new Date();
        const validityEndDate = new Date(currentDate);
        validityEndDate.setDate(validityEndDate.getDate() + 7);
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        // 쿠폰 유효기간 설정
        const validityPeriod = `${formatDate(currentDate)} - ${formatDate(validityEndDate)}`;

        const newUser = {
          id: state.users.length > 0 ? Math.max(...state.users.map((user) => user.id)) + 1 : 1,
          username: profile.name || `${provider}User`,
          userId: `${provider}_${profile.id}`,
          userEmail: profile.email || '',
          socialId: profile.id,
          socialProvider: provider,
          profileImg: profile.profileImage || 'images/defaultImg1.png',
          cart: [],
          wishlist: [],
          orders: [],
          coupons: [
            {
              id: 1,
              name: '[자주배송 전용] 가입 축하 할인 쿠폰',
              amount: '10,000원',
              discount: '70% 할인',
              validity: validityPeriod,
            },
            {
              id: 2,
              name: '회원 가입 축하 할인 쿠폰',
              amount: '50,000원',
              discount: '15% 할인',
              validity: validityPeriod,
            },
            {
              id: 3,
              name: '회원 가입 축하 할인 쿠폰',
              amount: '300,000원',
              discount: '10% 할인',
              validity: validityPeriod,
            },
          ],
          points: 1000,
          createdAt: new Date().toISOString(),
        };

        state.users.push(newUser);
        state.currentUser = newUser;
        state.authed = true;
        state.error = null;

        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('authed', 'true');
      }
    },
    updateUserInfo: (state, action) => {
      const { id, ...updatedInfo } = action.payload;

      state.users = state.users.map((user) => (user.id === id ? { ...user, ...updatedInfo } : user));

      if (state.currentUser && state.currentUser.id === id) {
        state.currentUser = { ...state.currentUser, ...updatedInfo };
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      }

      localStorage.setItem('users', JSON.stringify(state.users));
    },
    deleteAccount: (state, action) => {
      const userId = action.payload;

      state.users = state.users.filter((user) => user.id !== userId);

      state.currentUser = null;
      state.authed = false;

      localStorage.setItem('users', JSON.stringify(state.users));
      localStorage.removeItem('currentUser');
      localStorage.setItem('authed', 'false');
    },
    updateUserCart: (state, action) => {
      if (!state.currentUser) return;

      const userIndex = state.users.findIndex((user) => user.id === state.currentUser.id);

      if (userIndex !== -1) {
        const userCartItems = action.payload.map((item) => ({
          id:
            state.users[userIndex].cart.length > 0
              ? Math.max(...state.users[userIndex].cart.map((cartItem) => cartItem.id)) + 1
              : 1,
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          color: item.color || 'DEFAULT',
        }));

        state.users[userIndex].cart = userCartItems;
        state.currentUser.cart = userCartItems;

        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      }
    },
    addWishlist: (state, action) => {
      if (!state.currentUser) return;

      const item = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === state.currentUser.id);

      if (userIndex !== -1) {
        const existingItemIndex = state.users[userIndex].wishlist.findIndex((wishItem) => wishItem.id === item.id);

        if (existingItemIndex === -1) {
          state.users[userIndex].wishlist.push(item);
          state.currentUser.wishlist.push(item);

          localStorage.setItem('users', JSON.stringify(state.users));
          localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        }
      }
    },
    removeWishlist: (state, action) => {
      if (!state.currentUser) return;

      const itemId = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === state.currentUser.id);

      if (userIndex !== -1) {
        state.users[userIndex].wishlist = state.users[userIndex].wishlist.filter((item) => item.id !== itemId);
        state.currentUser.wishlist = state.currentUser.wishlist.filter((item) => item.id !== itemId);

        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      }
    },
    addRecentlyViewed: (state, action) => {
      if (!state.currentUser) return;

      const item = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === state.currentUser.id);

      if (userIndex !== -1) {
        if (!state.users[userIndex].recentlyViewed) {
          state.users[userIndex].recentlyViewed = [];
          state.currentUser.recentlyViewed = [];
        }

        state.users[userIndex].recentlyViewed = state.users[userIndex].recentlyViewed.filter(
          (viewedItem) => viewedItem.id !== item.id
        );

        state.users[userIndex].recentlyViewed.unshift(item);

        if (state.users[userIndex].recentlyViewed.length > 20) {
          state.users[userIndex].recentlyViewed = state.users[userIndex].recentlyViewed.slice(0, 20);
        }

        state.currentUser.recentlyViewed = [...state.users[userIndex].recentlyViewed];

        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      }
    },
    removeRecentlyViewed: (state, action) => {
      if (!state.currentUser || !state.currentUser.recentlyViewed) return;

      const itemId = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === state.currentUser.id);

      if (userIndex !== -1 && state.users[userIndex].recentlyViewed) {
        state.users[userIndex].recentlyViewed = state.users[userIndex].recentlyViewed.filter(
          (item) => item.id !== itemId
        );
        state.currentUser.recentlyViewed = state.currentUser.recentlyViewed.filter((item) => item.id !== itemId);

        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
