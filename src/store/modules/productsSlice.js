import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { products } from '../../assets/data/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await products();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  products: products,
  commonDetails: {
    description:
      '- A standard-fit round neck cardigan with a polka dot pattern, brand logo engraved buttons, and a back neck Ohesio silver label detail.',
    material: '- COTTON 100%',
    care: '- DRY CLEANING ONLY',
    size_info: '- LENGTH 68  SHOULDER 54  CHEST 59  SLEEVE LENGTH 57  AMHOLE 26.5  HEM 55 (cm)',
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
  loading: false, // 이름 변경: isLoading -> loading
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

    selectProduct: (state, action) => {
      state.selectedProduct = state.products.find((product) => product.id === action.payload);
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
  // extraReducers를 리듀서 객체 밖으로 이동
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        // 필터링된 상품도 업데이트
        state.filteredProducts = action.payload;
        // 초기 선택 상품이 있으면 다시 설정
        if (state.selectedProduct) {
          const id = state.selectedProduct.id;
          state.selectedProduct = action.payload.find((product) => product.id === id) || null;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productsActions = {
  ...productsSlice.actions,
  fetchProducts,
};

export default productsSlice.reducer;
