import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../assets/data/products';

const initialState = {
  products: products,
  commonDetails: {
    description: 'A dot pattern knit featuring a glitter yarn combination...',
    material: 'COTTON 100%',
    care: 'DRY CLEANING ONLY',
    size_info: 'LENGTH 68  SHOULDER 54  CHEST 59  SLEEVE LENGTH 57  AMHOLE 26.5  HEM 55 (cm)',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    model_info: {
      height: '166cm',
      wearing_size: 'S',
    },
  },
  filteredProducts: products,
  selectedProduct: null,
  selectedColor: null,
  colorProducts: {},
  isLoading: false,
  error: null,
};

const colorProductsInit = () => {
  const colorGroups = {};
  const colors = ['gray', 'black', 'blue', 'white', 'beige'];

  colors.forEach((color) => {
    const colorKey = `${color}_products`;
    colorGroups[colorKey] = products.filter((product) => product.color === color);
  });
  return colorGroups;
};

initialState.colorProducts = colorProductsInit();

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // 상품 목록 필터링 (카테고리별)
    filterByCategory: (state, action) => {
      const category = action.payload;
      if (!category || category === 'all') {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter((product) => product.category === category);
      }
    },

    // 상품 상세 정보 선택
    selectProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find((product) => product.id === productId);

      // 선택된 상품의 색상 설정
      if (state.selectedProduct) {
        state.selectedColor = state.selectedProduct.color;
      }
    },

    // 색상 선택
    selectColor: (state, action) => {
      state.selectedColor = action.payload;

      // 선택된 색상에 맞는 상품들로 필터링
      if (action.payload) {
        state.filteredProducts = state.products.filter((product) => product.color === action.payload);
      } else {
        state.filteredProducts = state.products;
      }
    },

    // 색상별 상품 필터링
    getProductsByColor: (state, action) => {
      const color = action.payload;
      if (!color || color === 'all') {
        state.filteredProducts = state.products;
      } else {
        const colorKey = `${color}_products`;
        state.filteredProducts = state.colorProducts[colorKey] || [];
      }
    },

    // 관련 상품 가져오기 (같은 카테고리의 다른 상품)
    getRelatedProducts: (state, action) => {
      const { productId, limit = 4 } = action.payload;
      const currentProduct = state.products.find((product) => product.id === productId);

      if (currentProduct) {
        const category = currentProduct.category;
        const relatedProducts = state.products
          .filter((product) => product.category === category && product.id !== productId)
          .slice(0, limit);

        return relatedProducts;
      }

      return [];
    },

    // 스타일링 상품 가져오기 (다른 카테고리의 상품들)
    getStylingProducts: (state, action) => {
      const { productId, limit = 4 } = action.payload;
      const currentProduct = state.products.find((product) => product.id === productId);

      if (currentProduct) {
        const category = currentProduct.category;
        const stylingProducts = state.products.filter((product) => product.category !== category).slice(0, limit);

        return stylingProducts;
      }

      return [];
    },

    // 현재 선택된 상품과 같은 상품의 다른 색상 가져오기
    getColorVariants: (state, action) => {
      const productId = action.payload;
      const currentProduct = state.products.find((product) => product.id === productId);

      if (currentProduct) {
        const name = currentProduct.name;
        // 같은 이름을 가진 다른 색상의 상품들 찾기
        const colorVariants = state.products.filter((product) => product.name === name && product.id !== productId);

        return colorVariants;
      }

      return [];
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
