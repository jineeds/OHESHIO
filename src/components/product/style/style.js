import styled from 'styled-components';

export const ProductContain = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  overflow: visible;

  .product_detail_contain {
    div {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .detail_small_img {
      display: block;
      animation: shake 13s infinite;
    }
    @keyframes shake {
      0% {
        transform: translateY(0px) rotate(-5deg);
      }
      45% {
        transform: translateY(0px) rotate(5deg);
      }
      100% {
        transform: translateY(0px) rotate(-5deg);
      }
    }
  }

  .typed-cursor {
    opacity: 0;
  }
  .product_details_toggle {
    span:after {
      content: '+';
      display: inline;
      padding-left: 5px;
    }
    &.clicked {
      span:after {
        content: '-';
        display: inline;
        padding-left: 5px;
      }
    }
  }

  .sizing_chart_toggle {
    span:after {
      content: '+';
      display: inline;
      padding-left: 5px;
    }
  }
`;

export const ProductBottomSlideContainer = styled.div`
  margin: 40px 0 10vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: block;
  .slide_inner {
    animation: bottom-slider 20s forwards linear infinite;
    &.paused {
      animation-play-state: paused;
    }

    @keyframes bottom-slider {
      0% {
        transform: translateX(0vw);
      }
      100% {
        transform: translateX(-150vw);
      }
    }
  }
`;
