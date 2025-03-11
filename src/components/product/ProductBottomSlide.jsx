import React, { useState, useEffect } from 'react';
import { ProductBottomSlideContainer } from './style/style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';

const ProductBottomSlide = ({ products }) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const navigate = useNavigate();

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
    <ProductBottomSlideContainer>
      <div className={`slide_inner w-[400vw] flex ${isPaused ? 'paused' : ''}`} onMouseOut={handleMouseOut}>
        {selectedProducts.map((product, index) => {
          const displayImageUrl = getImageForProduct(product);

          return (
            <div
              key={`${product.id}-${index}`}
              className='slide_img_1 w-[16.66%] m-0 relative z-10 '
              onMouseOver={() => handleMouseOver(product.id)}
              onClick={(e) => onGo(product.id, e)}
            >
              <a
                href={`#/product/${product.id}`}
                className='-ml-10'
                style={{ width: '100%', height: '100%', display: 'block' }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <img
                    src={displayImageUrl}
                    alt={`${product.name} 이미지`}
                    style={{
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.3s ease-in-out',
                    }}
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
                    <div>{product.price?.toLocaleString?.() || ''}원</div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </ProductBottomSlideContainer>
  );
};

export default ProductBottomSlide;
