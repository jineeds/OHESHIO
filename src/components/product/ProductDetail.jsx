import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Buttons from '../../ui/Buttons';

const ProductDetail = ({ product, commonDetails }) => {
  const { id, name, category, price, color, image, model_images } = product;
  const { description, material, care, size_info, model_info } = commonDetails;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(false);
  const [size, setSize] = useState('');

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
          strings: ['- 100% faux fur'],
          typeSpeed: 50,
        });
      }
      if (product_detail2.current && !product_typed2.current) {
        product_typed2.current = new Typed(product_detail2.current, {
          strings: ['- 100% faux fur'],
          typeSpeed: 50,
        });
      }
      if (product_detail3.current && !product_typed3.current) {
        product_typed3.current = new Typed(product_detail3.current, {
          strings: ['- 100% faux fur'],
          typeSpeed: 50,
        });
      }
      if (product_detail4.current && !product_typed4.current) {
        product_typed4.current = new Typed(product_detail4.current, {
          strings: ['- 100% faux fur'],
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
  return (
    <div className='product_detail_contain w-1/3 text-black z-[99] sticky top-[100px]'>
      <div className='top_product_info'>
        <div className='detail_title'>
          <span ref={doc} />
        </div>
        <div className='detail_price'>
          <span ref={doc2} />
        </div>
      </div>
      <div className='w-[calc(100%-20px)] flex flex-wrap my-[20px]'>
        <span className='detail_small_img'>
          <img src='public/images/small_product.png' alt='' />
        </span>
        <span className='detail_small_img'>
          <img src='public/images/small_product2.png' alt='' />
        </span>
        <span className='detail_small_img'>
          <img src='public/images/small_product3.png' alt='' />
        </span>
      </div>
      <div className='lower_product_info'>
        <div></div>
        <div className='w-full flex mt-5 flex-wrap relative'>
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
            <div className='shadow-[0_1px_6px_0_rgba(32,33,36,0.6)] px-5 py-[15px] w-[60%] flex justify-between items-center rounded-[2.5em] bg-[#CBD5E1]'>
              <span></span>
              <span>add to bag</span>
              <span>→</span>
            </div>
          ) : (
            <div className='shadow-[0_1px_6px_0_rgba(32,33,36,0.6)] px-5 py-[15px] w-[60%] flex justify-between items-center opacity-70 rounded-[2.5em] bg-[#F8FAFC] text-[#9CA3AF]'>
              <span></span>
              <span>select your size</span>
              <span>→</span>
            </div>
          )}
        </div>

        <div className={`product_details_toggle ${isVisible ? 'clicked' : ''}`}>
          <span className='details_toggle_description cursor-pointer' onClick={toggleDetails}>
            product details
          </span>

          {isVisible && (
            <div className='product_details_document'>
              <p ref={product_detail1}></p>
              <p ref={product_detail2}></p>
              <p ref={product_detail3}></p>
              <p ref={product_detail4}></p>
            </div>
          )}
        </div>
        <div className='sizing_chart_toggle'>
          <span className='sizing_toggle_description'>sizing chart</span>
        </div>
        <div>
          <span>styled with ↓</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
