import React, { useState } from "react";
import { ProductBottomSlideContainer } from "./style/style";

const ProductBottomSlide = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseOver = () => {
    setIsPaused(true);
  };

  const handleMouseOut = () => {
    setIsPaused(false);
  };
  return (
    <ProductBottomSlideContainer>
      <div className={`slide_inner w-[300vw] flex ${isPaused ? "paused" : ""}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>{" "}
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>{" "}
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>{" "}
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>{" "}
        <div className="slide_img_1 w-[16.66%] m-0 relative z-10">
          <a href="#/">
            <div>
              <img src="public/images/model_thumbnail.png" alt="" />
              {/* <img src="public/images/model_thumbnail.png" alt="" /> */}
            </div>
          </a>
        </div>
      </div>
    </ProductBottomSlideContainer>
  );
};

export default ProductBottomSlide;
