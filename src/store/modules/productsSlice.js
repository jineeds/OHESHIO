import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../assets/data/products';
import { productDetails } from '../../assets/data/productDetails';
import { colorProducts } from '../../assets/data/colorProducts';

const initialState = {
  products: products,
  productDetails: productDetails,
  colorProducts: colorProducts,
  filteredProducts: [],
  selectedProduct: null,
  selectedColor: null,
  isLoading: false,
  error: null,
};

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
      state.selectedProduct = state.productDetails.find((product) => product.id === productId);
      // 기본 색상 설정 (첫 번째 색상)
      if (state.selectedProduct && state.selectedProduct.images) {
        state.selectedColor = Object.keys(state.selectedProduct.images)[0];
      }
    },

    // 색상 선택
    selectColor: (state, action) => {
      state.selectedColor = action.payload;
    },

    // 색상별 상품 필터링
    getProductsByColor: (state, action) => {
      const color = action.payload;
      const colorKey = `${color}_products`;
      state.filteredProducts = state.colorProducts[colorKey] || [];
    },

    // 관련 상품 가져오기
    getRelatedProducts: (state, action) => {
      const relatedIds = action.payload;
      return state.products.filter((product) => relatedIds.includes(product.id));
    },

    // 스타일링 상품 가져오기
    getStylingProducts: (state, action) => {
      const stylingIds = action.payload;
      return state.products.filter((product) => stylingIds.includes(product.id));
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
