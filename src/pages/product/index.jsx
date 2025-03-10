import ProductCharacter from '../../components/product/ProductCharacter';
import ProductDetail from '../../components/product/ProductDetail';
import { ProductContain } from '../../components/product/style/style';

const Product = () => {
  return (
    <ProductContain>
      <ProductDetail />
      <ProductCharacter />
    </ProductContain>
  );
};

export default Product;
