import Buttons from '../../ui/Buttons';

const OrderSummary = ({ subtotal, shipping, discount, total }) => {
  const hasItems = total > 0;

  return (
    <div className="basis-1/4 xl:pt-[137px] min-w-[282px] space-y-10">
      <div
        className="border border-secondary-500 rounded-lg px-6 py-10"
        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <h2 className="h-[72px] text-center text-2xl font-semibold">Order Summary</h2>
        <dl className="space-y-4 py-8 px-1 border-y border-secondary-300">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>KRW {subtotal.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>+ KRW {shipping.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Discount</dt>
            <dd>- KRW {discount.toLocaleString()}</dd>
          </div>
        </dl>
        <div className="flex justify-between pt-10 text-xl">
          <span>Total</span>
          <span>KRW {total.toLocaleString()}</span>
        </div>
      </div>
      <Buttons className="w-full h-[60px] flex-1 !text-2xl !font-semibold" state={hasItems ? 'active' : 'disabled'}>
        CHECK OUT
      </Buttons>
    </div>
  );
};

export default OrderSummary;
