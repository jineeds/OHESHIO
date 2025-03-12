import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      name: 'TRENCH COLLAR JUMPER',
      color: 'BEIGE',
      size: 'XS',
      price: 215000,
      quantity: 1,
      image: '/images/RTBTANKROCK.png',
    },
    {
      id: 2,
      name: 'SHIRT HOODED ZIP-UP',
      color: 'BLACK',
      size: 'S',
      price: 189000,
      quantity: 2,
      image: '/images/RTBTANKROCK.png',
    },
    {
      id: 3,
      name: 'ROUND COLLAR BLOUSON JACKET',
      color: 'BLUE',
      size: 'M',
      price: 189000,
      quantity: 1,
      image: '/images/RTBTANKROCK.png',
    },
    {
      id: 4,
      name: 'TRENCH COLLAR JUMPER2',
      color: 'BLUE',
      size: 'L',
      price: 189000,
      quantity: 1,
      image: '/images/RTBTANKROCK.png',
    },
    {
      id: 5,
      name: 'TRENCH COLLAR JUMPER2',
      color: 'BLUE',
      size: 'XL',
      price: 189000,
      quantity: 1,
      image: '/images/RTBTANKROCK.png',
    },
  ],
  totalQuantity: 6,
  subtotal: 971000,
  shipping: 0,
  discount: 0,
  total: 971000,
};

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
      state.total = state.subtotal + state.shipping - state.discount;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
