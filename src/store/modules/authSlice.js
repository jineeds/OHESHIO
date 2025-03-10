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
      coupons: [],
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
        coupons: [],
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

      // 소셜 ID로 기존 사용자 찾기
      const existingUser = state.users.find((user) => user.socialId === profile.id && user.socialProvider === provider);

      if (existingUser) {
        // 기존 사용자면 로그인 처리
        state.currentUser = existingUser;
        state.authed = true;
        state.error = null;

        localStorage.setItem('currentUser', JSON.stringify(existingUser));
        localStorage.setItem('authed', 'true');
      } else {
        // 새 사용자면 가입 처리
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
          points: 1000, // 신규 가입 포인트
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
    // updateUserInfo: (state, action) => {
    //   const { id, ...updatedInfo } = action.payload;

    //   state.users = state.users.map((user) => (user.id === id ? { ...user, ...updatedInfo } : user));

    //   if (state.currentUser && state.currentUser.id === id) {
    //     state.currentUser = { ...state.currentUser, ...updatedInfo };
    //     localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    //   }

    //   localStorage.setItem('users', JSON.stringify(state.users));
    // },

    // addToCart: (state, action) => {
    //   const { productId, name, price, quantity, image } = action.payload;

    //   if (!state.currentUser) {
    //     state.error = '로그인이 필요합니다.';
    //     return;
    //   }

    //   const userId = state.currentUser.id;

    //   const userIndex = state.users.findIndex((user) => user.id === userId);

    //   if (userIndex === -1) {
    //     state.error = '사용자를 찾을 수 없습니다.';
    //     return;
    //   }

    //   const existingItemIndex = state.users[userIndex].cart.findIndex((item) => item.productId === productId);

    //   if (existingItemIndex !== -1) {
    //     state.users[userIndex].cart[existingItemIndex].quantity += quantity;
    //   } else {
    //     const newItem = {
    //       id:
    //         state.users[userIndex].cart.length > 0
    //           ? Math.max(...state.users[userIndex].cart.map((item) => item.id)) + 1
    //           : 1,
    //       productId,
    //       name,
    //       price,
    //       quantity,
    //       image,
    //     };

    //     state.users[userIndex].cart.push(newItem);
    //   }

    //   if (state.currentUser) {
    //     state.currentUser = state.users[userIndex];
    //   }

    //   localStorage.setItem('users', JSON.stringify(state.users));
    //   localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    // },

    // updateCartItemQuantity: (state, action) => {
    //   const { productId, quantity } = action.payload;

    //   if (!state.currentUser) return;

    //   const userId = state.currentUser.id;
    //   const userIndex = state.users.findIndex((user) => user.id === userId);

    //   if (userIndex !== -1) {
    //     const cartItemIndex = state.users[userIndex].cart.findIndex((item) => item.productId === productId);

    //     if (cartItemIndex !== -1) {
    //       if (quantity <= 0) {
    //         state.users[userIndex].cart = state.users[userIndex].cart.filter((item) => item.productId !== productId);
    //       } else {
    //         state.users[userIndex].cart[cartItemIndex].quantity = quantity;
    //       }

    //       state.currentUser = state.users[userIndex];

    //       localStorage.setItem('users', JSON.stringify(state.users));
    //       localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    //     }
    //   }
    // },

    // removeFromCart: (state, action) => {
    //   const { productId } = action.payload;

    //   if (!state.currentUser) return;

    //   const userId = state.currentUser.id;
    //   const userIndex = state.users.findIndex((user) => user.id === userId);

    //   if (userIndex !== -1) {
    //     state.users[userIndex].cart = state.users[userIndex].cart.filter((item) => item.productId !== productId);

    //     state.currentUser = state.users[userIndex];

    //     localStorage.setItem('users', JSON.stringify(state.users));
    //     localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    //   }
    // },

    // clearCart: (state) => {
    //   if (!state.currentUser) return;

    //   const userId = state.currentUser.id;
    //   const userIndex = state.users.findIndex((user) => user.id === userId);

    //   if (userIndex !== -1) {
    //     state.users[userIndex].cart = [];

    //     state.currentUser = state.users[userIndex];

    //     localStorage.setItem('users', JSON.stringify(state.users));
    //     localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    //   }
    // },

    // clearError: (state) => {
    //   state.error = null;
    // },
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
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
