import styled from 'styled-components';

export const ProductContain = styled.div`
    padding: 14.5px 0 20px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    overflow: visible;
    flex-direction: row-reverse;

    .product_detail_contain {
        div {
            margin-top: 20px;
            margin-bottom: 20px;
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
    }
    .sizing_chart_toggle {
        span:after {
            content: '+';
            display: inline;
            padding-left: 5px;
        }
    }
`;
