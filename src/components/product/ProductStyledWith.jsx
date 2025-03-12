import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';
import { products } from '../../assets/data/products';

const ProductStyledWith = ({ currentProduct }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const normalizeProductData = (product) => {
    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price, // 숫자 형식 유지
      color: product.color,
      imageUrl: product.image, // 일관된 이미지 필드명 사용
    };
  };
  const DEFAULT_IMAGE = '/oheshio/outer/gray/p001_round_collar_semi-crop_jacket/p001_1.png';
  useEffect(() => {
    if (currentProduct && currentProduct.category) {
      const otherCategoryProducts = products.filter(
        (product) => product.category !== currentProduct.category && product.id !== currentProduct.id
      );

      const shuffled = [...otherCategoryProducts].sort(() => 0.5 - Math.random());

      const count = Math.min(Math.floor(Math.random() * 3) + 2, otherCategoryProducts.length);

      setRecommendedProducts(shuffled.slice(0, count));
    }
  }, [currentProduct]);

  const handleProductClick = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct) {
      // 정규화 함수 사용하여 일관된 데이터 형식 유지
      const normalizedProduct = normalizeProductData(selectedProduct);
      dispatch(authActions.addRecentlyViewed(normalizedProduct));
    }

    window.scrollTo(0, 0);
    navigate(`/product/${productId}`);
  };

  if (recommendedProducts.length === 0) return null;

  return (
    <div className='mt-6'>
      <div className='flex gap-3 mt-2'>
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 cursor-pointer detail_small_img'
            onClick={() => handleProductClick(product.id)}
          >
            <div className='aspect-square overflow-hidden'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = product.model_images?.[0] || DEFAULT_IMAGE;
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStyledWith;
