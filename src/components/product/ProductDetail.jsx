import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Buttons from '../../ui/Buttons';
import { products } from '../../assets/data/products';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';
import ProductSizing from './ProductSizing';
import { cartActions } from '../../store/modules/cartSlice';
const ProductDetail = ({ product, commonDetails }) => {
  const { id, name, category, price, color, image, model_images } = product;
  const { description, material, care, size_info, model_info } = commonDetails;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(false);
  const [size, setSize] = useState('');
  const [colorsProduct, setColorsProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const allColor = products.filter((item) => item.name === product.name);

      setColorsProduct(allColor);
    } catch (error) {
      console.error('관련 제품을 불러오는 중 오류가 발생했습니다:', error);
    }
  }, [product.name]);

  const handleSizeSelect = (sizeOption) => {
    setSelectedSize(sizeOption);
    setSize(sizeOption);
  };
  const toggleDetails = () => {
    setIsVisible((prev) => !prev);
  };

  const doc = useRef(null);
  const doc2 = useRef(null);
  const product_detail1 = useRef(null);
  const product_detail2 = useRef(null);
  const product_detail3 = useRef(null);
  const product_detail4 = useRef(null);

  const typed = useRef(null);
  const typed2 = useRef(null);
  const product_typed1 = useRef(null);
  const product_typed2 = useRef(null);
  const product_typed3 = useRef(null);
  const product_typed4 = useRef(null);

  useEffect(() => {
    typed.current = new Typed(doc.current, {
      strings: [name],
      typeSpeed: 50,
    });

    typed2.current = new Typed(doc2.current, {
      strings: [`KRW  ${price.toString()}`],
      typeSpeed: 50,
    });
  }, []);

  useEffect(() => {
    if (isVisible) {
      if (product_detail1.current && !product_typed1.current) {
        product_typed1.current = new Typed(product_detail1.current, {
          strings: [`${description.toString()}`],
          typeSpeed: 20,
        });
      }
      if (product_detail2.current && !product_typed2.current) {
        product_typed2.current = new Typed(product_detail2.current, {
          strings: [`${material.toString()}`],
          typeSpeed: 50,
        });
      }
      if (product_detail3.current && !product_typed3.current) {
        product_typed3.current = new Typed(product_detail3.current, {
          strings: [`${care.toString()}`],
          typeSpeed: 50,
        });
      }
      if (product_detail4.current && !product_typed4.current) {
        product_typed4.current = new Typed(product_detail4.current, {
          strings: [`${size_info.toString()}`],
          typeSpeed: 50,
        });
      }
    } else {
      if (product_typed1.current) {
        product_typed1.current.destroy();
        product_typed1.current = null;
      }
      if (product_typed2.current) {
        product_typed2.current.destroy();
        product_typed2.current = null;
      }
      if (product_typed3.current) {
        product_typed3.current.destroy();
        product_typed3.current = null;
      }
      if (product_typed4.current) {
        product_typed4.current.destroy();
        product_typed4.current = null;
      }
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
      if (typed2.current) {
        typed2.current.destroy();
      }
      if (product_typed1.current) {
        product_typed1.current.destroy();
      }
      if (product_typed2.current) {
        product_typed2.current.destroy();
      }
      if (product_typed3.current) {
        product_typed3.current.destroy();
      }
      if (product_typed4.current) {
        product_typed4.current.destroy();
      }
    };
  }, []);
  const onGo = (item) => {
    const selectedProduct = products.find((product) => product.id === item);

    if (selectedProduct) {
      dispatch(authActions.addRecentlyViewed(selectedProduct));
    }
    window.scrollTo(0, 0);
    navigate(`/product/${item}`);
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      id: `${id}_${size}`,
      productId: id,
      name: name,
      price: price,
      size: size,
      color: color,
      image: image,
    };
    dispatch(cartActions.addItemToCart(itemToAdd));
    navigate('/cart');
  };
  return (
    <div className="product_detail_contain xl:w-1/3 max-w-[550px]  text-black  z-[99] xl:sticky xl:top-[100px] xl:pr-20 ">
      <div className="top_product_info">
        <div className="detail_title">
          <span ref={doc} />
        </div>
        <div className="detail_price">
          <span ref={doc2} />
        </div>
      </div>
      <div className="w-[calc(100%-20px)] flex flex-wrap ">
        {colorsProduct.length > 0 && (
          <div className="w-full mb-3">
            <div className="flex flex-wrap gap-2">
              {colorsProduct.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => onGo(item.id, e)}
                  className={`w-28 h-28 cursor-pointer overflow-hidden rounded detail_small_img 
                  }`}
                  title={item.color}
                >
                  <img src={item.image} alt={`${item.name} - ${item.color}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="lower_product_info flex flex-col gap-5">
        <div className="w-full flex mt-5 flex-wrap relative">
          {['XS', 'S', 'M', 'L', 'XL'].map((sizeOption) => (
            <button
              key={sizeOption}
              className={`w-[50px] h-[50px] rounded-full mr-[10px] text-center flex items-center justify-center uppercase relative mb-[10px] bg-[#F1F5F9] text-[#A3A3A3] text-sm ${
                selectedSize === sizeOption ? 'border-2 border-[#94A3B8] shadow-[0_1px_6px_0_rgba(32,33,36,0.6)]' : ''
              }`}
              onClick={() => handleSizeSelect(sizeOption)}
            >
              {sizeOption}
            </button>
          ))}
        </div>
        <div>
          {selectedSize ? (
            <button
              onClick={handleAddToCart}
              className=" shadow-[0_1px_6px_0_rgba(32,33,36,0.6)] px-5 py-[15px] w-[60%] flex justify-between items-center rounded-[2.5em] bg-[#CBD5E1] my-[10px]"
            >
              <span></span>
              <span>add to bag</span>
              <span>→</span>
            </button>
          ) : (
            <div className="shadow-[0_1px_6px_0_rgba(32,33,36,0.6)] px-5 py-[15px] w-[60%] flex justify-between items-center opacity-70 rounded-[2.5em] bg-[#F8FAFC] text-[#9CA3AF]">
              <span></span>
              <span>select your size</span>
              <span>→</span>
            </div>
          )}
        </div>

        <div className={`product_details_toggle ${isVisible ? 'clicked' : ''}`}>
          <span className="details_toggle_description cursor-pointer text-gray-700" onClick={toggleDetails}>
            product details
          </span>

          {isVisible && (
            <div className="product_details_document select-none text-gray-700">
              <p ref={product_detail1}></p>
              <p ref={product_detail2}></p>
              <p ref={product_detail3}></p>
              <p ref={product_detail4}></p>
            </div>
          )}
        </div>
        <div className="sizing_chart_toggle text-gray-700">
          <>
            <button onClick={() => setIsModalOpen(true)} className="sizing_toggle_description">
              sizing chart +
            </button>

            <ProductSizing isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} category={category} name={name} />
          </>
        </div>
        <div className="text-gray-700">
          <span>styled with ↓</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
