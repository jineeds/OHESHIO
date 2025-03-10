import ProductBottomSlide from "../../components/product/ProductBottomSlide";
import ProductCharacter from "../../components/product/ProductCharacter";
import ProductDetail from "../../components/product/ProductDetail";
import { ProductContain } from "../../components/product/style/style";

const Product = () => {
  return (
    <>
      <ProductContain>
        <ProductDetail />
        <ProductCharacter />
      </ProductContain>
      <ProductBottomSlide />
    </>
  );
};

export default Product;
