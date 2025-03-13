import { Link, useParams } from 'react-router-dom';
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
    return (
      <div className='flex flex-col gap-5 w-full h-screen justify-center items-center'>
        <p>해당 상품은 없는 상품입니다.</p>
        <Link to={'/main'} className='bg-primary-500 py-2 px-4 rounded-lg text-gray-200'>
          메인으로
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className=' flex flex-col'>
        <ProductContain className=' flex-col-reverse xl:flex-row-reverse xl:items-start items-center '>
          <ProductDetail product={selectedProduct} commonDetails={commonDetails} />
          <ProductCharacter product={selectedProduct} commonDetails={commonDetails} />
        </ProductContain>
        <ProductBottomSlide products={products} />
      </div>
    </>
  );
};

export default Product;
