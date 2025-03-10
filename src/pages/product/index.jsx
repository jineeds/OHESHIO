import { useParams } from 'react-router-dom';
import ProductBottomSlide from '../../components/product/ProductBottomSlide';
import ProductCharacter from '../../components/product/ProductCharacter';
import ProductDetail from '../../components/product/ProductDetail';
import { ProductContain } from '../../components/product/style/style';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from '../../store/modules/authSlice';
import { productsActions } from '../../store/modules/productsSlice';

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, products, commonDetails } = useSelector((state) => state.productR);
  const { authed } = useSelector((state) => state.authR);

  useEffect(() => {
    if (productId) {
      // 상품 ID를 숫자로 변환 (URL 파라미터는 문자열)
      const id = productId;

      // 상품 선택 액션 디스패치
      dispatch(productsActions.selectProduct(id));

      // 로그인한 사용자일 경우 최근 본 상품에 추가
      if (authed && products.length > 0) {
        const product = products.find((p) => p.id === id);

        if (product) {
          dispatch(
            authActions.addRecentlyViewed({
              id: product.id,
              name: product.name,
              color: product.color,
              price: `KRW ${product.price.toLocaleString()}`,
              quantity: 1,
              imageUrl: product.image,
            })
          );
        }
      }
    }
  }, [productId, dispatch, authed, products]);
  if (!selectedProduct) {
    return <div className='text-center py-20'>로딩 중...</div>;
  }
  return (
    <>
      <ProductContain>
        <ProductDetail product={selectedProduct} commonDetails={commonDetails} />
        <ProductCharacter product={selectedProduct} commonDetails={commonDetails} />
      </ProductContain>
      <ProductBottomSlide />
    </>
  );
};

export default Product;
