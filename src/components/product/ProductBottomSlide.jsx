import React, { useState, useEffect, useRef } from 'react';
import { ProductBottomSlideContainer } from './style/style';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';

const ProductBottomSlide = ({ products }) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  useEffect(() => {
    const uniqueProducts = Array.from(new Map(products.map((product) => [product.id, product])).values());
    const shuffled = [...uniqueProducts].sort(() => 0.5 - Math.random());
    setSelectedProducts(shuffled.slice(0, 20));
  }, [products]);

  const handleMouseOver = (productId) => {
    setIsPaused(true);
    setHoveredProductId(productId);
  };

  const handleMouseOut = () => {
    setIsPaused(false);
    setHoveredProductId(null);
  };

  const onGo = (productId, e) => {
    e.preventDefault();
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct) {
      dispatch(authActions.addRecentlyViewed(selectedProduct));
    }

    window.scrollTo(0, 0);
    navigate(`/product/${productId}`);
  };

  const getImageForProduct = (product) => {
    if (!product || !product.model_images || product.model_images.length === 0) {
      return '/oheshio/outer/gray/p001_round_collar_semi-crop_jacket/p001_1.png';
    }

    if (hoveredProductId === product.id) {
      return product.model_images[0];
    } else {
      return product.model_images.length > 1 ? product.model_images[1] : product.model_images[0];
    }
  };

  return (
    <div className='w-full  py-8 md:py-12 lg:py-16 md:mt-[-100px]'>
      <ProductBottomSlideContainer className='relative'>
        <div
          className={`slide_inner flex ${
            isPaused ? 'paused' : ''
          } w-[800vw] sm:w-[600vw] md:w-[400vw] lg:w-[300vw] xl:w-[600vw]`}
          onMouseOut={handleMouseOut}
        >
          {selectedProducts.map((product, index) => {
            const displayImageUrl = getImageForProduct(product);

            return (
              <div
                key={`${product.id}-${index}`}
                className='slide_item w-[400px]  relative cursor-pointer '
                onMouseOver={() => handleMouseOver(product.id)}
                onClick={(e) => onGo(product.id, e)}
              >
                <div className=''>
                  <img
                    src={displayImageUrl}
                    alt={`${product.name}`}
                    className='w-full h-full object-cover transition-transform duration-300'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/oheshio/outer/gray/p001_round_collar_semi-crop_jacket/p001_1.png';
                    }}
                  />

                  <div
                    className='product-info'
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      padding: '5px 10px',
                      fontSize: '12px',
                      borderRadius: '3px',
                      opacity: hoveredProductId === product.id ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <div>{product.name}</div>
                    <div> KRW {product.price?.toLocaleString?.() || ''}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ProductBottomSlideContainer>
    </div>
  );
};

export default ProductBottomSlide;
