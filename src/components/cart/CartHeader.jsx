const CartHeader = () => {
  return (
    <div className="hidden md:flex p-5 border-b border-secondary-500">
      <div className="w-1/6">product</div>
      <div className="w-2/6"></div>
      <div className="w-1/6">price</div>
      <div className="w-1/6">quantity</div>
      <div className="w-1/6">total</div>
    </div>
  );
};

export default CartHeader;
