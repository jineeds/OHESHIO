import { createSlice } from '@reduxjs/toolkit';

const initialState = (() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const authed = localStorage.getItem('authed') === 'true';

  if (authed && currentUser && currentUser.cart) {
    const items = currentUser.cart.map((item) => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      color: item.color || 'DEFAULT',
      size: item.size || 'DEFAULT',
    }));

    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      totalQuantity,
      subtotal,
      shipping: 0,
      discount: 0,
      total: subtotal,
    };
  }

  return {
    items: [],
    totalQuantity: 0,
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  };
})();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 상품 수량 설정
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (quantity <= 0) {
          state.totalQuantity -= existingItem.quantity;
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          state.totalQuantity = state.totalQuantity - existingItem.quantity + quantity;

          existingItem.quantity = quantity;
        }

        state.subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.total = state.subtotal + state.shipping - state.discount;
      }
    },

    // 상품 삭제
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);

        state.subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.total = state.subtotal + state.shipping - state.discount;
      }
    },

    // 상품 추가
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
        state.totalQuantity++;
      } else {
        existingItem.quantity++;
        state.totalQuantity++;
      }

      state.subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.total = state.subtotal + state.shipping - state.discount;
    },

    // 배송비 설정
    setShipping: (state, action) => {
      state.shipping = action.payload;
      state.total = state.subtotal + state.shipping - state.discount;
    },

    // 할인 금액 설정
    setDiscount: (state, action) => {
      const { type, value, subtotal } = action.payload;

      if (type === 'fixed') {
        state.discount = value;
      } else if (type === 'percentage') {
        state.discount = Math.round((subtotal * value) / 100);
      } else {
        state.discount = 0;
      }

      state.total = state.subtotal + state.shipping - state.discount;
    },

    replaceCart: (state, action) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
      state.subtotal = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.discount = action.payload.discount || 0;
      state.total = state.subtotal + state.shipping - state.discount;
    },

    // auth 로컬스토리지 저장
    updateUserCart: (state, action) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const users = JSON.parse(localStorage.getItem('users')) || [];

      if (!currentUser) return;

      const userIndex = users.findIndex((user) => user.id === currentUser.id);
      if (userIndex !== -1) {
        const userCartItems = state.items.map((item) => ({
          id: item.id,
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          color: item.color || 'DEFAULT',
          size: item.size || 'DEFAULT',
        }));

        users[userIndex].cart = userCartItems;
        currentUser.cart = userCartItems;

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
