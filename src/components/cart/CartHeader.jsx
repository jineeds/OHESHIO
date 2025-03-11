const CartHeader = () => {
  return (
    <div className="hidden md:flex p-5 border-b border-secondary-500">
      <div className="w-1/6">Product</div>
      <div className="w-2/6"></div>
      <div className="w-1/6">Price</div>
      <div className="w-1/6">Quantity</div>
      <div className="w-1/6">Total</div>
    </div>
  );
};

export default CartHeader;
