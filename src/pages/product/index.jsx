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
      const id = productId;
      dispatch(productsActions.selectProduct(id));

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
    return <div className='text-center py-20'>데이터를 불러 오고 있습니다...</div>;
  }
  return (
    <>
      <div className=' flex flex-col gap-56 '>
        <ProductContain className='flex-col-reverse xl:flex-row-reverse xl:items-start '>
          <ProductDetail product={selectedProduct} commonDetails={commonDetails} />
          <ProductCharacter product={selectedProduct} commonDetails={commonDetails} />
        </ProductContain>
        <ProductBottomSlide products={products} />
      </div>
    </>
  );
};

export default Product;
