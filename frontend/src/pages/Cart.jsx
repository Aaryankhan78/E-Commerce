import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import CartItem from "../components/CartItem";
import PageWrapper from "../components/PageWrapper";

const Cart = () => {
  const { cart, clearCart } = useCartStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:underline"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default Cart;
