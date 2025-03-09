import React from 'react';
import Typed from 'typed.js';
import Buttons from '../../ui/Buttons';

const ProductDetail = () => {
    const doc = React.useRef(null);
    const doc2 = React.useRef(null);
    const product_detail1 = React.useRef(null);
    const product_detail2 = React.useRef(null);
    const product_detail3 = React.useRef(null);
    const product_detail4 = React.useRef(null);
    
    React.useEffect(() => {
        const typed = new Typed(doc.current, {
            strings: [`Wares PANT SEAL`],
            typeSpeed: 50,
        });
        const typed2 = new Typed(doc2.current, {
            strings: [`239.00 USD`],
            typeSpeed: 50,
        });
        const product_typed = new Typed(product_detail1.current, {
            strings: [`- 100% faux fur`],
            typeSpeed: 50,
        });
        const product_typed2 = new Typed(product_detail2.current, {
            strings: [`- 100% faux fur`],
            typeSpeed: 50,
        });
        const product_typed3 = new Typed(product_detail3.current, {
            strings: [`- 100% faux fur`],
            typeSpeed: 50,
        });
        const product_typed4 = new Typed(product_detail4.current, {
            strings: [`- 100% faux fur`],
            typeSpeed: 50,
        });

        return () => {
            
            typed.destroy();
            typed2.destroy();
            product_typed.destroy();
            product_typed2.destroy();
            product_typed3.destroy();
            product_typed4.destroy();
        };
    }, []);
    return (
        <div className="product_detail_contain w-1/3 text-black z-[99] sticky top-[100px]">
            <div className="top_product_info">
                <div className="detail_title">
                    <span ref={doc} />
                </div>
                <div className="detail_price">
                    <span ref={doc2} />
                </div>
            </div>
            <div className="w-[calc(100%-20px)] flex flex-wrap my-[20px]">
                <span className="detail_small_img">
                    <img src="public/images/small_product.png" alt="" />
                </span>
                <span className="detail_small_img">
                    <img src="public/images/small_product2.png" alt="" />
                </span>
                <span className="detail_small_img">
                    <img src="public/images/small_product3.png" alt="" />
                </span>
            </div>
            <div className="lower_product_info">
                <div></div>
                <div className="w-full flex mt-5 flex-wrap relative">
                <span className="w-[50px] h-[50px] rounded-full mr-[10px] text-center flex items-center justify-center uppercase relative mb-[10px]">
                        <input className="absolute opacity-0 cursor-pointer h-full w-full top-0 left-0" type="text" />{' '}
                        <span className="absolute top-0 left-0 h-full w-full bg-[#F1F5F9] rounded-full border-transprant -z-10"></span>    XS
                    </span>
                    <span className="w-[50px] h-[50px] rounded-full mr-[10px] text-center flex items-center justify-center uppercase relative mb-[10px]">
                        <input className="absolute opacity-0 cursor-pointer h-full w-full top-0 left-0" type="text" />{' '}
                        <span className="absolute top-0 left-0 h-full w-full bg-[#F1F5F9] rounded-full border-transprant -z-10"></span>    S
                    </span> 
                    <span className="w-[50px] h-[50px] rounded-full mr-[10px] text-center flex items-center justify-center uppercase relative mb-[10px]">
                        <input className="absolute opacity-0 cursor-pointer h-full w-full top-0 left-0" type="text" />{' '}
                        <span className="absolute top-0 left-0 h-full w-full bg-[#F1F5F9] rounded-full border-transprant -z-10"></span>
                        
                        M
                    </span>
                    <span className="w-[50px] h-[50px] rounded-full mr-[10px] text-center flex items-center justify-center uppercase relative mb-[10px]">
                        <input className="absolute opacity-0 cursor-pointer h-full w-full top-0 left-0" type="text" />{' '}
                        <span className="absolute top-0 left-0 h-full w-full bg-[#F1F5F9] rounded-full border-transprant -z-10"></span>
                        L
                    </span>
                    <span className="w-[50px] h-[50px] rounded-full mr-[10px] text-center flex items-center justify-center uppercase relative mb-[10px]">
                        <input className="absolute opacity-0 cursor-pointer h-full w-full top-0 left-0" type="text" />{' '}
                        <span className="absolute top-0 left-0 h-full w-full bg-[#F1F5F9] rounded-full border-transprant -z-10"></span>    XL
                    </span>
                </div>
                <div>
                    <div className="shadow-[0_1px_6px_0_rgba(32,33,36,0.6)] px-5 py-[15px] w-[60%] flex justify-between items-center opacity-70 rounded-[2.5em]">
                        <span></span>
                        <span>select your size</span>
                        <span>→</span>
                    </div>
                    <div className="shadow-[0_1px_6px_0_rgba(32,33,36,0.6)] px-5 py-[15px] w-[60%] flex justify-between items-center rounded-[2.5em]">
                        <span></span>
                        <span>add to bag</span>
                        <span>→</span>
                    </div>
                </div>

                <div className="product_details_toggle">
                    <span className="details_toggle_description">product details</span>
                    <div className="product_details_document">
                        <p ref={product_detail1}></p>
                        <p ref={product_detail2}></p>
                        <p ref={product_detail3}></p>
                        <p ref={product_detail4}></p>
                    </div>
                </div>
                <div className="sizing_chart_toggle">
                    <span className="sizing_toggle_description">sizing chart</span>
                </div>
                <div>
                    <span>styled with ↓</span>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
